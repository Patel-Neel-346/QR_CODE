import QR_Code from "../models/QR_CODE_model.js";

export const CreateQRCodeController = async (req, res) => {
  try {
    const { data, style, frameText } = req.body;
    const userId = req.user._id;

    if (!data || !style) {
      return res.status(400).json({
        success: false,
        message: "Please provide QR data and style"
      });
    }

    const qrCode = new QR_Code({
      data,
      style: {
        border: style.border || 'solid',
        color: style.color || '#000000'
      },
      frameText: frameText || 'SCAN ME',
      user: userId
    });

    await qrCode.save();

    res.status(201).json({
      success: true,
      qrCode
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export const GetQRCodeController = async (req, res) => {
  try {
    const userId = req.user._id;
    const qrCodes = await QR_Code.find({ user: userId });
    
    res.json({
      success: true,
      qrCodes
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching QR codes',
      error: error.message
    });
  }
};