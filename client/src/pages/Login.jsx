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
        "http://116.202.210.102:9000/api/login",
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
        navigate("/loginPage");
      }
      else {
        alert("Login Failed")
      }
    } catch (error) {
      console.log("Invalid Credentials  ", error);
    }
  };

  return (
    // <div className="flex items-center justify-center h-screen bg-gray-100">
    //     <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
    //         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
    //         <form onSubmit={handleSubmit}>
    //             <div className="mb-4">
    //                 <label htmlFor="email" className="block text-gray-700">Email</label>
    //                 <input
    //                     type="text"
    //                     id="email"
    //                     className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
    //                     name='email'
    //                     value={user.email}
    //                     onChange={handelInput}
    //                 />
    //             </div>
    //             <div className="mb-6">
    //                 <label htmlFor="password" className="block text-gray-700">Password</label>
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     className="w-full px-3 py-2 border rounded mt-1 focus:outline-none focus:ring focus:ring-blue-200"
    //                     name='password'
    //                     value={user.password}
    //                     onChange={handelInput}
    //                 />
    //             </div>
    //             <button
    //                 type="submit"
    //                 className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
    //             >
    //                 Login
    //             </button>
    //         </form>
    //     </div>
    // </div>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div
        className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Sign in</h1>
            <p className="mt-2 text-gray-500">Sign in below to access your account</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input type="email" name="email" id="email" placeholder="Email Address" value={user.email}
                  onChange={handelInput}
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
              </div>
              <div className="relative mt-6">
                <input type="password" name="password" id="password" placeholder="Password" value={user.password}
                  onChange={handelInput}
                  className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
              </div>
              <div className="my-6">
                <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Sign in</button>
              </div>
              <p className="text-center text-sm text-gray-500">Don&#x27;t have an account yet?
                <a href="/"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
                  up
                </a>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;