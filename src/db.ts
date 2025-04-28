import mongoose, {Schema, model} from 'mongoose';
import { MONGO_URL } from './config';

try {
    mongoose.connect(MONGO_URL);
    console.log("\n connected to DB");
    
} catch (error) {
    console.log(error + "\n cant connect to DB");
}

const UserSchema = new Schema({
    username : {type: String , unique : true},
    password : String
})

export const UserModel = model("user",UserSchema);