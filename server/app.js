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


app.use(express.json());
app.use(cors());


app.use('/api/user',userRouter);
app.use('/api/otp',OtpRouter)
app.use('/api/qrCode',QR_Code_Route);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
