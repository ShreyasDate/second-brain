import mongoose, { Schema, model } from 'mongoose';
import { MONGO_URL } from './config';


export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("✅ connected to DB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1); // stop the process if DB can't connect
  }
}

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,       
        lowercase: true,    
        trim: true,
        index: true,        
    },
    password: {
    type: String,
    required: true,     
  },
})

export const UserModel = model("User", UserSchema);

const ContentSchema = new Schema({
  title: { type: String, required: true },
  link: { type: String, default: '' },       
  content: { type: String},     
  type: { type: String, enum: ['text','youtube','twitter'], default: 'text' },
  date: { type: String },  
  userNotes : { type: String , default : '' },                  
  
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true, index: true },
  isBookmarked: { type: Boolean, default: false }
} );

export const ContentModel = model("Content", ContentSchema);

const ShareSchema = new Schema({
    hash: { type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "User", unique: true }
})

export const ShareModel = model("Share", ShareSchema);   