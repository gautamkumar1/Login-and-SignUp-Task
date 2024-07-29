const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// compare password
userSchema.methods.comparePassword = function(password){
    return bcrypt.compare(password, this.password);
}
// Json web token
userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign(
          {
            // PAYLOADS
            userId: this._id.toString(),
            email: this.email,
            username: this.username,
            password: this.password
          },
          // SIGNATURE
          process.env.JWT_SECRET_KEY,

          {
            expiresIn:"30D",
          }

        );
    } catch (error) {
        console.error(error);
    }
}
// defineing the model or collection name

const User = mongoose.model('User', userSchema);

module.exports = User;