const User = require('../models/user-model')
const bcryptjs = require('bcryptjs');

const register = async (req,res) =>{
    try {
        
        const {username,email,phone,password} = req.body;

        const userExists = await User.findOne({email: email});

        if(userExists){
            return res.status(400).json({ message: "Email already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const userCreated = await User.create({username,email,phone,password:hashedPassword});
        res.status(201).json({
          message:"Registeration successful",
          token: await userCreated.generateToken(),
          userId: userCreated._id.toString(),
        });
    } catch (error) {
        console.log(error);
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
      res.status(200).json({
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
module.exports = {register,login,getAllUsers};