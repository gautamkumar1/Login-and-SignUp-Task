/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const handelInput = (e) => {
        let name = e.target.name
        let value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        
        try {
          const response = await fetch(
            "https://task-1-login-and-singup.onrender.com/api/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
              },
              body: JSON.stringify(user),
            }
          );
    
          const responseData = await response.json();
          console.log(responseData);
          if (response.ok) {
           alert("Login Successful")
           setUser({
             email: "",
             password: "",
           });
           navigate("/");
          }
          else{
            alert("Login Failed")
          }
        } catch (error) {
          console.log("Invalid Credentials  ", error);
        }
      };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            id="email"
                            className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
                            name='email'
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
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;