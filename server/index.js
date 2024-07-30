require('dotenv').config();
const express = require('express');
const app = express();
const connectDb = require('./utils/Db');
const { register, login, getAllUsers, verifyToken} = require('./controllers/auth-controllers');
const cors = require('cors')


const corsOptions = {
  origin: "http://localhost:5173",
  method: "GET,POST,PUT, DELETE, PATCH,HEAD",
  Credential: true,
};
app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req,res)=>{
    res.send("Hello from server")
})
app.post('/api/register',register)
app.post('/api/login',login)
app.get('/api/users',getAllUsers)
app.get('/verify/:token',verifyToken)
const PORT = process.env.PORT || 3000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});