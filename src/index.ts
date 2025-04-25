import express from "express";
import { UserModel } from "./db";

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

app.listen(3000)