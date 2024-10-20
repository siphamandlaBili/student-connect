import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
//routes
import messageRoutes from './routes/messageRoues.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
// db
import connectToDb from './config/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes);
app.use('/api/messages',messageRoutes);
app.use('/api/users',userRoutes);
app.use('/api/matches',matchRoutes);


const start =async ()=>{
try {
    await connectToDb(process.env.MONGO_URI);
    console.log('connected to db ')
    await app.listen(PORT,()=>{
        console.log('listening on port' + PORT)
       })
} catch (error) {
    console.log(error)
    process.exit(1)
}
}

start();