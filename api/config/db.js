import mongoose from "mongoose";

const connectToDb = async (url) =>{
  return mongoose.connect(url)
}

export default connectToDb