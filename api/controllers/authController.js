import user from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken =(id)=>{
   return jwt.sign({id},process.env.JWT_SECRET,{expiresIn:'7d'})
}
export const signup = async (req, res) => {
    const { name, email, password, age, genderPreference, gender } = req.body
    try {
        if (!name || !email || !password || !age || !genderPreference || !gender) {
            return res.status(400).json({
                success: false,
                message: 'all fields are required'
            })
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: 'can not join as you are under age'
            })
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'password must be atleast 6 characters'
            })
        }

        const newUser = await user.create({name, email, password, age, genderPreference, gender});

        const token = signToken(newUser._id);

        res.cookie('jwt',token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly:true,
            sameSite:'strict',
            secure : process.env.NODE_ENV === 'production'
        });
        res.status(200).json({
            success: true,
            message: `account for ${name} created`
        })
    } catch (error) {
        return res.status(404).json(error)
    }
}

export const login = async (req, res) => {
  const {email, password} = req.body;

  try {
    if(!email || password){
        return res.status(400).json({
            success: false,
            message: 'fill in all fields'
        })
    }

    const user = await user.findOne({email}).select('+password');
  }  catch (error) {
    return res.status(404).json(error)
}}

export const logout = async (req, res) => {

}