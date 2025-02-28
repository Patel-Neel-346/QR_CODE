import express from "express"
import { SendOTPController, verifyOTPController } from "../controller/OTP_controller.js"

const OtpRouter=express.Router()

OtpRouter.post('/send-otp',SendOTPController)
OtpRouter.post('/verify-otp',verifyOTPController)

export default OtpRouter