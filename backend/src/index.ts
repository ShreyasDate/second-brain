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



app.post("/content", userMiddleware, async (req, res) => {

    const title = req.body.title;
    const link = req.body.link;

    try {
        await ContentModel.create({
            title: title,
            link: link,
            // @ts-ignore
            userId: req.userId,
            tags: []
        })

        res.json({
            message: "added Content"
        })
    } catch (error) {
        res.status(403).json({
            message: "Cant add content",
            error: error
        })
    }
})

app.get("/content", userMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;

        const content = await ContentModel.find({
            userId: userId
        }).populate("userId", "username")

        res.json({
            content
        })
    } catch (error) {
        res.status(403).json({
            message: "Cant get content",
            error: error
        })
    }
})

app.delete("/content", userMiddleware, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        // @ts-ignore
        const userId = req.userId;

        await ContentModel.deleteOne({
            _id: contentId,
            // @ts-ignore
            userId: req.userId

        })

        res.status(200).json({
            message: "deleted content successfully"
        })
    } catch (error) {
        res.status(403).json({
            message: "cant delete content",
            error: error
        })
    }
})

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