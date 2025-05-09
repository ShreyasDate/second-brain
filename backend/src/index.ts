import express from "express";
import { ContentModel, ShareModel, UserModel } from "./db";
import  jwt  from "jsonwebtoken";
import { usernameSchema, passwordSchema } from "./zodValidation";
import bcrypt, { hash } from "bcrypt";
import { JWT_SECRET } from "./config";
import { userMiddleware } from "./middleware";
import { generateRandomString } from "./utils";




const app = express();

app.use(express.json())

app.post("/signup",async (req,res)=>{


    

    const usernameResult = usernameSchema.safeParse(req.body.username);
    const passwordResult = passwordSchema.safeParse(req.body.password);

    if(usernameResult.success && passwordResult.success){
        const hashedPassword = await bcrypt.hash(passwordResult.data,10)
        try {
            await UserModel.create({
                username : usernameResult.data,
                password : hashedPassword
    
            })
    
            res.status(200).json({
                message : "sign up successful"
            })
    
        } catch (error) {
            res.status(403).json({
                message : "duplicate entry or error",
                error : error
            })
        }
    }else{
        res.status(403).json({
            usernameError : usernameResult.error,
            passwordError : passwordResult.error
            
        })
    }

    

})

app.post("/signin",async (req,res)=>{

    const usernameResult = usernameSchema.safeParse(req.body.username);
    const passwordResult = passwordSchema.safeParse(req.body.password);

    if(usernameResult.success && passwordResult.success){
        try {
            const userExist = await UserModel.findOne({
                username : usernameResult.data,
                
            })
            if(userExist?.password){
                let hashedPassword = userExist.password;
                const comparePassword = await bcrypt.compare(passwordResult.data ,hashedPassword );
                if(comparePassword){
                    const token = jwt.sign({id: userExist._id},JWT_SECRET)
                    res.status(200).json({
                        token : token
                    })
                }else{
                    res.status(403).json({
                        message : "incorrect credentials"
                    })
                }
            }else{
                res.status(403).json({
                    message : "User Not found credentials"
                })
            }
            

            
            
        } catch (error) {
            res.status(403).json({
                error
            })
        }
    }else{
        res.status(403).json({
            usernameError : usernameResult.error,
            passwordError : passwordResult.error
        })
    }
    
})

app.post("/content",userMiddleware, async (req,res)=>{

    const title = req.body.title;
    const link = req.body.link;

    try{
        await ContentModel.create({
            title : title,
            link : link,
            // @ts-ignore
            userId : req.userId,
            tags : []
        })

        res.json({
            message : "added Content"
        })
    }catch(error){
        res.status(403).json({
            message :"Cant add content",
            error : error
        })
    }
})

app.get("/content",userMiddleware,async (req,res)=>{
    try{
        // @ts-ignore
        const userId = req.userId;

        const content = await ContentModel.find({
            userId : userId
        }).populate("userId","username")

        res.json({
            content
        })
    }catch(error){
        res.status(403).json({
            message : "Cant get content",
            error : error
        })
    }        
})

app.delete("/content",userMiddleware,async (req,res)=>{
    try{        
        const contentId = req.body.contentId;
        // @ts-ignore
        const userId = req.userId;

        await ContentModel.deleteOne({
            _id : contentId,
            // @ts-ignore
            userId : req.userId
            
        })

        res.status(200).json({
            message : "deleted content successfully"
        })
    }catch(error){
        res.status(403).json({
            message : "cant delete content",
            error : error
        })
    }
})

app.post("/share",userMiddleware,async (req,res)=>{
    const share = req.body.share;
    
    try {
        if(share){
            const userExists = await ShareModel.findOne({
                userId : req.body.userId
            })
    
            if (userExists) {
                res.status(200).json({
                    hash : userExists.hash
                })
                return;
            }
            const hash = generateRandomString(10);
            await ShareModel.create({
                hash : hash,
                // @ts-ignore
                userId : req.userId
            })
    
            res.status(200).json({
                hash : hash 
            })
        }else{
            await ShareModel.deleteOne({
                // @ts-ignore
                userId : req.userId
            })
            res.status(200).json({
                message : "Link Deleted from DB"
            })
        }
    } catch (error) {
        res.status(403).json({
            error
        })
    }
})
app.get("/:shareLink", async (req ,res)=>{
    const hash = req.params.shareLink;
    try {
        const link = await ShareModel.findOne({
            hash : hash
        })
        if (!link) {
            res.status(403).json({
                message : "incorrect link"
            })
            return;
        }
        const content = await ContentModel.find({
            userId : link.userId
        }).populate("userId","username")
    
        res.status(200).json({
            content
        })
    } catch (error) {
        res.status(403).json({
            error
        })
    }
})
app.listen(3000)