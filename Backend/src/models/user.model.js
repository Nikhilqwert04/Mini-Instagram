import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import { AvailabeUserRole,UserRolesEnum } from "../utils/constants.js";
import crypto from "crypto";
const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: AvailabeUserRole, default: UserRolesEnum.USER },
    isEmailVerified:{type:Boolean, default:false},
    isEmailVerified: { type: Boolean, default: false },
    refreshtoken:{type:String},
    isBlocked:{type:Boolean, default:false},
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiry: { type: Date },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (password) {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            role:this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateRefreshToken = function () {
        return jwt.sign({
        _id: this._id,
    },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}

userSchema.methods.generateTemporaryToken = function(){
    const unHashedToken =crypto.randomBytes(20).toString("hex")

    const HashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex")
    
    const tokenExpiry = Date.now()+(20*60*1000) 
    return{unHashedToken,HashedToken,tokenExpiry}
}

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
