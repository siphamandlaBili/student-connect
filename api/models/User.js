import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    genderPreference: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    bio: {
        type: String,
        default: ''
    },
    Images: {
        type: String,
        default: ''
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    dislikes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    matches: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]

})

//hash password before sending to database
userSchema.pre('save',async function(next){
 this.password = await bcryptjs.hash(this.password,10);
 next();
})


//check if password is correct when logging in
userSchema.methods.matchPassword = async function(enteredPassword){
 return await bcryptjs.compare(enteredPassword,this.password)
}
const user =mongoose.model('User',userSchema);

export default user;