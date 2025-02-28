import UserModel from '../models/user_model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/user_model.js';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}


export const register = async (req, res) => {
  try {
    const { Username, Email, Password } = req.body;
    console.log(Username,Email,Password);
    if(!Username || !Email || !Password){
        return res.status(400).json({success:false,message:"Please fill all the fields"});
    }

    const exists=await UserModel.findOne({Email});
    if(exists){
        return res.status(400).json({success:false,message:"User already exists"});
    }

    if(!validator.isEmail(Email)){
        return res.status(400).json({success:false,message:"Invalid Email"});
    }

    if(Password.length<6){
        return res.status(400).json({success:false,message:"Password must be atleast 6 characters"});
    }


    //hase password
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(Password,salt);

    const newUser=new UserModel({
        Username,
        Email,
        Password:hashedPassword
    });

    const user=await newUser.save();

    const token=generateToken(user._id);
    console.log(token);
    res.status(200).json({success:true,token,user});
  } catch (error) {
    console.error(error);
    res.status(500).json({success:false,message:"Internal Server Error"});
  }
};

export const login = async (req, res) => {
    try {
        const {Email,Password}=req.body;

        if(!Email || !Password){
            return res.status(400).json({success:false,message:"Please fill all the fields"});
        }

        const user=await UserModel.findOne({Email});
        if(!user){
            return res.status(400).json({success:false,message:"User does not exist"});
        }

        if(!validator.isEmail(Email)){
            return res.status(400).json({success:false,message:"Invalid Email"});
        }

        if(Password.length<6){
            return res.status(400).json({success:false,message:"Password must be atleast 6 characters"});
        }

        //check password

        const isMatch=await bcrypt.compare(Password,user.Password);
      

        if(isMatch){
            const token=generateToken(user._id);
            console.log(token);
            res.status(200).json({success:true,token,user});

        }else{
            return res.status(400).json({success:false,message:"Invalid Credentials"});
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
        
    }
};

export const logout = async (req, res) => {
    try {
        res.status(200).json({success:true,message:"Logged Out"});
    } catch (error) {
        console.error(error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};

export const getUserData=async(req,res)=>{
    try {
        const user=await User.find({id:req.user._id})
        console.log(user)
        if(!user){
            res.status(404).json({success:false,message:"User does not exits"})

        }

        res.status(200).json({success:true,user})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false,message:error.message})
    }
}
export const resetPassword = async (req, res) => {
    try {
        const {newPassword ,Email} = req.body;
       
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        
        // Update user password
        await User.updateOne(
          { Email },
          { $set: { password: hashedPassword } }
        );
    
        res.status(200).json({ message: 'Password reset successfully' ,success:true });
      } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error: error.message });
      }
}