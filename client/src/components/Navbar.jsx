import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center px-4 py-3 bg-purple-600 text-white">
      <h2 className="font-bold text-2xl text-center mb-4 lg:mb-0">
        Task 1 - Login and SignUp
      </h2>
      <div className="flex gap-5">
        <Link to="/" className="text-xl hover:underline">
          Home
        </Link>
        <Link to="/login" className="text-xl hover:underline">
          Login
        </Link>
        <Link to="/register" className="text-xl hover:underline">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
