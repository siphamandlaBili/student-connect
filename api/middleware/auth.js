import jwt from 'jsonwebtoken';
import user from '../models/User.js';

const protectRoute = async (req,res,next)=>{
 try {
    const cookies = req.cookies.jwt;

    if(!token){
        return res.status(401).json({
            success:false,
            message:'you are not authorised - no taken provided'
        })
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(!decoded){
        return res.status(401).json({
            success:false,
            message:'you are not authorised - invalid token'
        })
    }

    const currentUser = await user.findById(decoded.id);
    req.user = currentUser;
    next();
 } catch (error) {
    return res.status(401).json({
        success:false,
        message:"Not authorised"
    })
 }
}

export default protectRoute;