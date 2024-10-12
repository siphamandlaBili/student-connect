import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
//routes
import authRoutes from "./routes/authRoutes.js";
import matchesRoutes from "./routes/matchesRoutes.js";
import messagesRoutes from "./routes/messagesRoutes.js";
import userRoutes from "./routes/usersRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())
app.use('/api/auth',authRoutes);
app.use('/api/users',userRoutes);
app.use('/api/matches',matchesRoutes);
app.use('/api/message',messagesRoutes);


const start = async () =>{
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('connected to db');
    
    await app.listen(PORT,()=>console.log(`server running on ${PORT}`));
  } catch (error) {
    console.log(error)
  }
}

start()