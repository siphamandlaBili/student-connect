import User from "../model/User.js";
import jwt from 'jsonwebtoken';

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;
    
    try {
        if (!name || !password || !gender || !genderPreference || !age) {
            return res.status(401).json({ success: false, msg: `Please provide all fields` });
        }

        if (age < 18) {
            return res.status(401).json({ success: false, msg: `User ${name} is under age` });
        }

        const user = await User.create({ name, email, password, age, gender, genderPreference });

        const token = signToken(user._id);

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,
            sameSite: 'strict', // Fix sameSite value
            secure: process.env.NODE_ENV === 'production' // Secure cookies in production only
        });

        res.status(200).json({ success: true, msg: `User ${name} created`, user });
    } catch (error) {
        return res.status(401).json({ success: false, msg: 'User not created' });
    }
};


export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(401).json({ succsess: false, msg: 'invlid all input fields required' });
        }

        const user = await User.findOne({ email }).select("+password");
        

        if(!user || ( await !user.matchPassword(password))){
           return res.status(401).json({ succsess: false, msg: 'invalid email or password' });
        }
        
        const token = signToken(user._id);

        res.cookie('jwt', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true,
            sameSite: 'strict', // Fix sameSite value
            secure: process.env.NODE_ENV === 'production' // Secure cookies in production only
        });

        res.status(200).send({success:true,user})
        console.log("here"+user,email,password);
    } catch (error) {
        return res.status(401).json({ succsess: false, msg: 'invlid credentials' });
    }
}

export const logout = (req, res) => {
    res.clearCookie('jwt')
    res.status(200).json({success:true, msg: "logged out successfully" });
}