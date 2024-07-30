const User = require('../models/user-model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer');

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'gautamraaz936@gmail.com',
    pass: 'crfkzvmtvszctovq',
  },
});
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create the user
    const userCreated = await User.create({ username, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ email: userCreated.email }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    const url = `http://localhost:3000/verify/${token}`;
    console.log(`Verification URL: ${url}`); // Log the URL for testing
    const emailResponse = await transporter.sendMail({
      to: email,
      subject: 'Verify Email',
      html: `<a href="${url}">Verify your email</a>`,
    });

    console.log("Email sent: ", emailResponse);

    // Options for the cookie
    const options = {
      httpOnly: true,
      secure: true, // This should be true in production (HTTPS)
    };

    // Respond with the token and user details
    res.status(201).cookie("JwtToken", token, options).json({
      message: "Registration successful",
      token: token,
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.params;
    const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);
    await User.updateOne({ email }, { isVerified: true });
    res.redirect('http://localhost:5173/verifyPage');
    
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists in the database
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await userExists.comparePassword(password);
    if (isMatch) {
      // If the password is correct, generate a JWT token
      const token = await userExists.generateToken();
      console.log(token);
      const options = {
        httpOnly: true,
        secure: true
      }

      res.status(200).cookie("JwtToken", token, options).json({
        message: "Login successful",
        email: userExists.email, // Include the user's email in the response
        token: token,
        userId: userExists._id.toString(),
      });
    } else {
      // If the password is incorrect, return an error message
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
  }
};

const getAllUsers = async (req, res) => {
  try {

    const users = await User.find({});

    return res.json({
      message: "Users fetched successfully",
      data: users
    });
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = { register, login, getAllUsers,verifyToken };



