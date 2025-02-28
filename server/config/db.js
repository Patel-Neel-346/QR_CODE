import mongoose from "mongoose";

const ConnectDB = async () => {

    try {
       mongoose.connection.on("connected",()=>{
            console.log("Connected to MongoDB");
       })

       await mongoose.connect(`${process.env.MONGO_URI}/QR-Code-Generator`)
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default ConnectDB;