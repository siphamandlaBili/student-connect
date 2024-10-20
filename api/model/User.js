import mongoose from "mongoose";
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  age:{
    type:Number,
    required:true,
  },
  gender:{
    type:String,
    required:true,
    enum:['male','female']
  },
 genderPreference:{
    type:String,
    required:true,
    enum:['male','female','other']
  },
  bio:{
    type:String,
    default:''
  },
  images:{
    type:String,
    default:''
  },
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
  ],
  dislikes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
  ],
  matches:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
  ]
});

userSchema.pre('save',async function(next){
this.password = await bcrypt.hash(this.password,10);
next();
})

userSchema.methods.matchPassword = async function (inputPassword) {
 return bcrypt.compare(inputPassword,this.password);
}
const user = mongoose.model('User',userSchema);

export default user;