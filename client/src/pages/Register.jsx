/* eslint-disable no-unused-vars */
// import React, { useState } from 'react';


// const Register = () => {

//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//   })
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState('');

//   const handelInput = (e) => {
//     let name = e.target.name
//     let value = e.target.value;
//     setUser({ ...user, [name]: value })
//   }
//   const validateForm = () => {
//     const errors = {};

//     if (!user.username) {
//       errors.username = 'Username is required';
//     } else if (user.username.length < 3) {
//       errors.username = 'Username must be at least 3 characters long';
//     }

//     if (!user.email) {
//       errors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(user.email)) {
//       errors.email = 'Email is invalid';
//     }

//     if (!user.password) {
//       errors.password = 'Password is required';
//     } else if (user.password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }

//     return errors;
//   };
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   // console.log(user)
//   //   const validationErrors = validateForm();
//   //   setErrors(validationErrors);
//   //   try {
//   //     const response = await fetch(
//   //       "http://116.202.210.102:9000/api/register",
//   //       {
//   //         method: "POST",
//   //         headers: {
//   //           "Content-Type": "application/json",
//   //           "Access-Control-Allow-Origin": "*",
//   //         },
//   //         body: JSON.stringify(user),
//   //       }
//   //     );
//   //     const responseData = await response.json();
//   //     console.log("responseData", responseData);
//   //     if (response.ok) {
//   //       alert("Registration Successfully");


//   //       setUser({ username: "", email: "", password: "" });
//   //       // navigate("/verify");
//   //     }
//   //     else {
//   //       console.log(responseData.message);
//   //       alert("Registration Failed");
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // }
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       try {
//         const response = await fetch(
//                 "http://116.202.210.102:9000/api/register",
//                 {
//                   method: "POST",
//                   headers: {
//                     "Content-Type": "application/json",
//                     "Access-Control-Allow-Origin": "*",
//                   },
//                   body: JSON.stringify(user),
//                 }
//               );
//         const responseData = await response.json();

//         if (response.ok) {
//           setMessage(responseData.message);
//           // Handle token and userId if needed
//         } else {
//           setMessage(responseData.message || 'Registration failed');
//         }
//       } catch (error) {
//         setMessage('An error occurred. Please try again.');
//       }
//     }
//   };
//   return (
    
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div
//         className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
//         <div className="w-full">
//           <div className="text-center">
//             <h1 className="text-3xl font-semibold text-gray-900">Register in</h1>
//             <p className="mt-2 text-gray-500">Register in below to access your account</p>
//           </div>
//           <div className="mt-5">
//             <form onSubmit={handleSubmit}>
//               <div className="relative mt-6">
//                 <input type="username" name="username" id="username" placeholder="UserName" value={user.username}
//                   onChange={handelInput}
//                   className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" /> {errors.username && <p>{errors.username}</p>}
//                 <label htmlFor="username" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">UserName</label>
//               </div>
//               <div className="relative mt-6">
//                 <input type="email" name="email" id="email" placeholder="Email Address" value={user.email}
//                   onChange={handelInput}
//                   className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" /> {errors.email && <p>{errors.email}</p>}
//                 <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Email Address</label>
//               </div>
//               <div className="relative mt-6">
//                 <input type="password" name="password" id="password" placeholder="Password" value={user.password}
//                   onChange={handelInput}
//                   className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" /> {errors.password && <p>{errors.password}</p>}
//                 <label htmlFor="password" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">Password</label>
//               </div>
//               <div className="my-6">
//                 <button type="submit" className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Register</button>
//               </div>
//               <p className="text-center text-sm text-gray-500">Already have an account?
//                 <a href="/login"
//                   className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none">Sign
//                   In
//                 </a>.
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!user.username) {
      errors.username = 'Username is required';
    } else if (user.username.length < 3) {
      errors.username = 'Username must be at least 3 characters long';
    }

    
    if (!user.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      errors.email = 'Email is invalid';
    }

    
    if (!user.password) {
      errors.password = 'Password is required';
    } else if (user.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch("http://116.202.210.102:9000/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });

        const responseData = await response.json();

        if (response.ok) {
          setMessage(responseData.message);
          setUser({ username: "", email: "", password: "" });
          alert("Registration Successfully")
        } else {
          setMessage(responseData.message || 'Registration failed');
        }
      } catch (error) {
        setMessage('An error occurred. Please try again.');
      }
    } else {
      setMessage('');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Register in</h1>
            <p className="mt-2 text-gray-500">Register below to access your account</p>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="UserName"
                  value={user.username}
                  onChange={handleInputChange}
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                {errors.username && <p className="text-red-500">{errors.username}</p>}
                <label
                  htmlFor="username"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  UserName
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  value={user.email}
                  onChange={handleInputChange}
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none"
                />
                {errors.password && <p className="text-red-500">{errors.password}</p>}
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                <button
                  type="submit"
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none"
                >
                  Register
                </button>
              </div>
              {message && <p className="text-center text-sm text-gray-500">{message}</p>}
              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <a
                  href="/login"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign In
                </a>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
