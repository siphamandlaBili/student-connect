import express from 'express';

const router = express.Router();

router.post('/message',(req,res)=>{
  res.status(200).json('sent')
})

export default router