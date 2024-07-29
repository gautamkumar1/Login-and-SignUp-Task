/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"

const Register = () => {

const [user,setUser] = useState({
    username:"",
    email:"",
    password:"",
  })
  const navigate = useNavigate();


const handelInput = (e) =>{
    let name = e.target.name
    let value = e.target.value;
    setUser({...user, [name]:value})
  }

const handleSubmit = async (e) =>{
    e.preventDefault();
    // console.log(user)
    try {
      const response = await fetch(
        "http://localhost:3000/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify(user),
        }
      );
    //   const responseData = await response.json();
      // console.log("responseData", responseData);
      if(response.ok){
        alert("Registration Successfully");
        

        setUser({ username: "", email: "", password: "" });
        navigate("/login");
      }
      else{
        alert("Registration Failed");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name='username'
              className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              value={user.username}
            onChange={handelInput}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="text"
              id="email"
              name='email'
              className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              value={user.email}
             onChange={handelInput}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
              name='password'
              value={user.password}
            onChange={handelInput}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;