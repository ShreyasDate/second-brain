import express from "express";
import { ContentModel, ShareModel, UserModel, connectDB } from "./db";
import jwt from "jsonwebtoken";
import { emailSchema, passwordSchema, nameSchema } from "./zodValidation";
import bcrypt, { hash } from "bcrypt";
import { JWT_SECRET, PORT } from "./config";
import { userMiddleware } from "./middleware";
import { generateRandomString } from "./utils";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

connectDB();


const app = express();

app.use(express.json())
app.use(cors());


app.post("/signup", async (req, res): Promise<void> => {
    const emailResult = emailSchema.safeParse(req.body.email);
    const passwordResult = passwordSchema.safeParse(req.body.password);
    const nameResult = nameSchema.safeParse(req.body.name);

    if (!emailResult.success || !passwordResult.success) {
        res.status(400).json({
            emailError: emailResult.success ? null : emailResult.error.errors,
            passwordError: passwordResult.success ? null : passwordResult.error.errors,
        });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(passwordResult.data, 10);

        await UserModel.create({
            name: nameResult.success ? nameResult.data : null,
            email: emailResult.data,
            password: hashedPassword,
        });

        res.status(201).json({ message: "Signup successful" });
    } catch (error: any) {
        
        if (error.code === 11000) {
            res.status(409).json({ message: "Email already registered" });
        } else {
            res.status(500).json({ message: "Server error", error });
        }
    }
});



app.post("/signin", async (req, res): Promise<void> => {
    const emailResult = emailSchema.safeParse(req.body.email);
    const passwordResult = passwordSchema.safeParse(req.body.password);

    if (!emailResult.success || !passwordResult.success) {
        res.status(400).json({
            emailError: emailResult.success ? null : emailResult.error.errors,
            passwordError: passwordResult.success ? null : passwordResult.error.errors,
        });
        return;
    }

    try {
        const user = await UserModel.findOne({ email: emailResult.data });

        if (!user) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(passwordResult.data, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign(
            { id: user._id },
            JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});



// ---------- Content Routes (Fixed TypeScript Version) ----------

app.post("/content", userMiddleware, async (req, res) => {
  try {
    const {
      title,
      link = "",
      content = "",
      type = "text",
      date,
      userNotes = "",
      isBookmarked = false,
      
    } = req.body;

    if (!title || typeof title !== "string") {
      res.status(400).json({ message: "Missing or invalid title" });
      return;
    }

    // @ts-ignore - userMiddleware sets req.userId
    const userId = req.userId;

    const created = await ContentModel.create({
      title,
      link,
      content,
      type,
      date,
      userNotes,
      isBookmarked,
      
      userId
    });

    res.status(201).json({ content: created });
  } catch (error) {
    console.error("Error creating content:", error);
    res.status(500).json({ message: "Can't add content", error });
  }
});

app.get("/content", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({ userId })
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json({ content });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ message: "Can't get content", error });
  }
});

app.patch("/content/:id", userMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    const updates: any = {};

    const allowed = [
      "title",
      "link",
      "content",
      "userNotes",
      "isBookmarked",
      "date",
      
      "type"
    ];

    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // @ts-ignore
    const userId = req.userId;
    const updated = await ContentModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true }
    ).lean();

    if (!updated) {
      res.status(404).json({ message: "Content not found or not owned by you" });
      return;
    }

    res.status(200).json({ content: updated });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ message: "Can't update content", error });
  }
});

app.delete("/content/:id", userMiddleware, async (req, res) => {
  try {
    const id = req.params.id;
    // @ts-ignore
    const userId = req.userId;

    const result = await ContentModel.deleteOne({ _id: id, userId });

    if (result.deletedCount === 0) {
      res
        .status(404)
        .json({ message: "Content not found or not owned by you" });
      return;
    }

    res.status(200).json({ message: "Deleted content successfully" });
  } catch (error) {
    console.error("Error deleting content:", error);
    res.status(500).json({ message: "Can't delete content", error });
  }
});

// ---------- End of Content Routes ----------



app.post("/share", userMiddleware, async (req, res) => {
    const share = req.body.share;

    try {
        if (share) {
            const userExists = await ShareModel.findOne({
                userId: req.body.userId
            })

            if (userExists) {
                res.status(200).json({
                    hash: userExists.hash
                })
                return;
            }
            const hash = generateRandomString(10);
            await ShareModel.create({
                hash: hash,
                // @ts-ignore
                userId: req.userId
            })

            res.status(200).json({
                hash: hash
            })
        } else {
            await ShareModel.deleteOne({
                // @ts-ignore
                userId: req.userId
            })
            res.status(200).json({
                message: "Link Deleted from DB"
            })
        }
    } catch (error) {
        res.status(403).json({
            error
        })
    }
})
app.get("/:shareLink", async (req, res) => {
    const hash = req.params.shareLink;
    try {
        const link = await ShareModel.findOne({
            hash: hash
        })
        if (!link) {
            res.status(403).json({
                message: "incorrect link"
            })
            return;
        }
        const content = await ContentModel.find({
            userId: link.userId
        }).populate("userId", "username")

        res.status(200).json({
            content
        })
    } catch (error) {
        res.status(403).json({
            error
        })
    }
})
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));