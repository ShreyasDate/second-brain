import express from "express";
import { UserModel } from "./db";
import  jwt  from "jsonwebtoken";


const JWT_SECRET = "ahdjfauregfgafrgayg"
const app = express();

app.use(express.json())

app.post("/signup",async (req,res)=>{
    const username : string = req.body.username;
    const password : string = req.body.password;

    try {
        await UserModel.create({
            username : username,
            password : password

        })

        res.status(200).json({
            message : "sign in successful"
        })

    } catch (error) {
        res.status(403).json({
            message : "duplicate entry or error",
            error : error
        })
    }

})

app.post("/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try {
        const userExist = await UserModel.findOne({
            username : username,
            password: password
        })
        
        if(userExist){
            const token = jwt.sign({username},JWT_SECRET)
            res.status(200).json({
                token : token
            })
        }else{
            res.status(403).json({
                message : "incorrect credentials"
            })
        }
    } catch (error) {
        res.status(403).json({
            error
        })
    }
    
})

app.listen(3000)