import express from "express";
import { UserModel } from "./db";
import  jwt  from "jsonwebtoken";
import { usernameSchema, passwordSchema } from "./zodValidation";
import bcrypt from "bcrypt";



const JWT_SECRET = "ahdjfauregfgafrgayg"
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
                    const token = jwt.sign(usernameResult.data,JWT_SECRET)
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

app.listen(3000)