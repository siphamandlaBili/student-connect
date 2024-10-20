import express from 'express';

const router = express.Router();

router.post('/user',(req,res)=>{
  res.status(200).json('sent')
})

export default router