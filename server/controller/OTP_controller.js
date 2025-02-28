import User from "../models/user_model.js";
import OTP from "../models/otp_model.js"
import crypto from 'crypto'
import nodemailer from 'nodemailer'
const generateOTP=()=>{
    return  crypto.randomInt(100000,999999).toString();
}

const Transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }
});


export const SendOTPController=async(req,res)=>{

    try{
    const {Email}=req.body;
    console.log(req.body)    
    const user=await User.findOne({Email});
    if(!user){
        return res.status(404).json({success:false,message:"user not found!"});

    }

    //generate otp
    const otp=generateOTP()
    console.log(otp)
    await OTP.create({Email,OTP:otp});

    //send email
    await Transporter.sendMail({
        from:process.env.EMAIL_USER,
        to:Email,
        subject:"Password Reset Otp",
        text:`Your OTP is :${otp} (Valid for 10 Minutes)`
    })

    res.status(200).json({success:true,message:"OTP send SuccessFully"})
    }catch(error){
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
  
}

export const verifyOTPController=async(req,res)=>{
 try {
    const { otp } = req.body;
    const otpRecord = await OTP.findOne({ OTP: otp });

    if (!otpRecord) {
      return res.status(400).json({ success:false,message: 'Invalid OTP' });
    }


    res.status(200).json({ message: 'OTP verified successfully', otp });

  } catch (error) {
    res.status(500).json({ message: 'Error verifying OTP', error: error.message });
  }
}