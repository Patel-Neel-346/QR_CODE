import "dotenv/config";

import express from "express";
import ConnectDB from "./config/db.js";
import userRouter from "./routes/User_route.js";
import cors from "cors";
import OtpRouter from "./routes/Otp_route.js";
import QR_Code_Route from "./routes/Qr_Code_route.js";

const app = express();
const PORT=process.env.PORT || 3000;
ConnectDB();
const corsOptions = {
    origin: 'https://qr-code-frontend-zeta.vercel.app',
    optionsSuccessStatus: 200 // Some legacy browsers choke on 204
  };
  
app.use(cors(corsOptions)); 

app.use(cors({
    origin: 'https://qr-code-frontend-zeta.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

app.use(express.json());
// app.use(cors());
app.get('/',(req,res)=>{
    res.send("API Is Running!")
})

app.use('/api/user',userRouter);
app.use('/api/otp',OtpRouter)
app.use('/api/qrCode',QR_Code_Route);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
