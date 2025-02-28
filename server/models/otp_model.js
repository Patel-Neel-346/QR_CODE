import mongoose from "mongoose";

const OTPschema=new mongoose.Schema({
    "Email": {
        type: String,
        required: true
    },
    "OTP": {
        type: String,
        required:true
    }
    
})

const OTP=mongoose.model('OTP',OTPschema)

export default OTP;