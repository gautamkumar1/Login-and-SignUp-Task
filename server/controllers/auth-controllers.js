const User = require('../models/user-model')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { sendMail } = require('../utils/mail');

// const register = async (req,res) =>{
//     try {
        
//         const {username,email,phone,password} = req.body;

//         const userExists = await User.findOne({email: email});

//         if(userExists){
//             return res.status(400).json({ message: "Email already exists" });
//         }
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);
        
//         const userCreated = await User.create({username,email,phone,password:hashedPassword,token:token});
//         const token = await userCreated.generateToken();
//         const options = {
//           httpOnly: true,
//           secure: true
//       }
//         res.status(201).cookie("JwtToken", token, options).json({
//           message:"Registeration successful",
//           token: token,
//           userId: userCreated._id.toString(),
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
const register = async (req, res) => {
  try {
      const { username, email, phone, password } = req.body;

      const userExists = await User.findOne({ email: email });

      if (userExists) {
          return res.status(400).json({ message: "Email already exists" });
      }

      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(password, salt);

      // Create the user first
      const userCreated = await User.create({ username, email, phone, password: hashedPassword });

      // Now generate the token based on the created user
      const token = await userCreated.generateToken();

      const options = {
          httpOnly: true,
          secure: true
      };

      res.status(201)
          .cookie("JwtToken", token, options)
          .json({
              message: "Registration successful",
              token: token,
              userId: userCreated._id.toString(),
          });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
  }
};

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

const sendVerificationMail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
      return res.status(400).send('User not found');
  }

  const verificationToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  const verificationUrl = `http://localhost:3000/verify-email?token=${verificationToken}`;

  const emailOptions = {
      from: 'gautamkum4r@gmail.com',
      to: email,
      subject: 'Email Verification',
      text: `Click the following link to verify your email: ${verificationUrl}`,
  };

  try {
      await sendMail(emailOptions);
      res.send('Verification email sent');
  } catch (error) {
      res.status(500).send('Failed to send email');
  }
}

const verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await User.findById(decoded.id);

      if (!user) {
          return res.status(400).send('User not found');
      }

      user.isVerified = true;
      await user.save();

      res.send('Email verified successfully');
  } catch (error) {
      res.status(400).send('Invalid or expired token');
  }
}
module.exports = {register,login,getAllUsers,sendVerificationMail,verifyEmail};



