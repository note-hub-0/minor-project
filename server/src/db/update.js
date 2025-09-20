import mongoose from "mongoose";
import { Note } from "../models/note.models.js";
// import { connectDB } from "./index.js";
import dotenv from "dotenv"
dotenv.config()

const MONGODB_CONNECTION_STRING = "mongodb+srv://notehub00:Note-Hube@notehube.gydlo2y.mongodb.net/?retryWrites=true&w=majority&appName=noteHube";

const connectDB = async () => {
    try {
        await mongoose.connect(`${MONGODB_CONNECTION_STRING}`)
        console.log(`MongoDB is Connect Succesfully`);
        
    } catch (error) {
        console.log(error);
        console.log("failed to connect DB");
        process.exit(1)
    }
}


await connectDB()
  .then(async() => {
    await Note.updateMany({ status: "pending" }, { status: "approved" });
    console.log("Notes status updated successfully");
    
  })
  .catch((err) => console.log(err));

