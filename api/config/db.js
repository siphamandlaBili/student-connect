import mongoose from "mongoose";

export const connectDB = (uri)=>{
 return mongoose.connect(uri);
}