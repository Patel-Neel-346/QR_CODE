import mongoose from "mongoose";

const qrCodeSchema=new mongoose.Schema({
    data:{
        type:String,
        required:true
    },

    style:{
        border:{
            type:String,
            enum:['solid','dotted','dashed','double'],
            dafult:'solid'
        },
        color:{
            type:String,
            default:'#000000'
        }
    },
   
})

const QR_Code=mongoose.model('QRCode',qrCodeSchema)

export default QR_Code