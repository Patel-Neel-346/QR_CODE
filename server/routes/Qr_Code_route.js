import express from 'express'
import { CreateQRCodeController, GetQRCodeController } from '../controller/QR_Code_controller.js';
import { authUser } from '../middleware/authUser.js';

const QR_Code_Route=express.Router()

QR_Code_Route.post('/create',authUser,CreateQRCodeController)

QR_Code_Route.get('/get',authUser,GetQRCodeController)

export default QR_Code_Route;