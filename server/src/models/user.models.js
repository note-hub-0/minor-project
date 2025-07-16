import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    notes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref : "Note"
    }],
    refreshToken :{
        type : String
    }
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10);

})
userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({_id : this._id},process.env.REFRESH_TOKEN_SECRATE_KEY,{
        expiresIn : REFRESH_TOKEN_EXPIREIN
    })
}
userSchema.methods.generateAccesToken = async function(){
    return jwt.sign(
        {
            _id : this._id,
            name : this.name,
            username : this.username,
            email : this.email
        },
        process.env.ACCESS_TOKEN_SECRATE_KEY,
        {
            expiresIn : process.env.ACCESS_TOKEN_EXPIREIN
        }

    )
}



export const User = mongoose.model("User", userSchema);
