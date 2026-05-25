const prisma = require('../prismaClient');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const getTransporter = async () => {
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  } else {
    let testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  }
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    let user = await prisma.user.findUnique({ where: { email } });
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

    if (!user) {
      user = await prisma.user.create({
        data: { email, otp, otpExpiry }
      });
    } else {
      user = await prisma.user.update({
        where: { email },
        data: { otp, otpExpiry }
      });
    }

    const transporter = await getTransporter();
    let info = await transporter.sendMail({
      from: '"Exampluss Auth" <no-reply@exampluss.com>',
      to: email,
      subject: "Your Login OTP for Exampluss",
      text: `Your OTP for login is: ${otp}. It is valid for 5 minutes.`,
      html: `<b>Your OTP for login is: ${otp}</b><br>It is valid for 5 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent successfully to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error while sending OTP.' });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: 'Email and OTP are required' });

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'User not found' });
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });
    if (new Date() > user.otpExpiry) return res.status(400).json({ message: 'OTP has expired' });

    let role = user.role;
    if ((user.email === 'vishalkumar.singh.cer21@iitbhu.ac.in' || user.email === 'exampluss0625@gmail.com') && role !== 'admin') {
      role = 'admin';
    }

    user = await prisma.user.update({
      where: { email },
      data: { otp: null, otpExpiry: null, role }
    });

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback_secret_key',
      { expiresIn: '7d' }
    );

    res.status(200).json({ message: 'Authentication successful', token, user: { email: user.email, _id: user.id, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error while verifying OTP.' });
  }
};
