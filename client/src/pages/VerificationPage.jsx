import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/login'); // Redirects to the LoginPage route
    };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p className="text-2xl text-green-500 mb-4">Email is verified</p>
      <button onClick={handleLoginClick} className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
        Login
      </button>
    </div>
  );
};

export default VerificationPage;
