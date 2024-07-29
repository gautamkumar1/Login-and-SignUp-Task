
import { Link } from "react-router-dom";

const Navbar = () => {


  return (
    <div className="flex flex-col lg:flex-row justify-between px-2 py-3 bg-purple-600 text-white">
      <h2 className="font-bold text-2xl text-center">Task 1 - Login and SignUp</h2>
      <div className="flex gap-5 justify-center">
        <Link to="/" className="list-none text-xl cursor-pointer">
          Home
        </Link>
        <Link
          to="/login"
          className="list-none text-xl cursor-pointer"
        >
          Login
        </Link>
        <Link to="/register" className="list-none text-xl cursor-pointer">
          Signup
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
