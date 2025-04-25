import mongoose, {Schema, model} from 'mongoose';

try {
    mongoose.connect("mongodb+srv://admin:NNHIalSve0gIDfFK@cluster0.08oir.mongodb.net/second-brain");
    console.log("\n connected to DB");
    
} catch (error) {
    console.log(error + "\n cant connect to DB");
}

const UserSchema = new Schema({
    username : {type: String , unique : true},
    password : String
})

export const UserModel = model("user",UserSchema);