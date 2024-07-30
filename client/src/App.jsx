
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
// import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Verify from './pages/Verify';
import VerificationPage from './pages/VerificationPage';
import SuccessPage from './pages/SuccessPage';



function App() {
  return (
    <>
      <BrowserRouter>
        {/* <Navbar /> */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/verify/:token" element={<Verify/>} />
          <Route path="/verifyPage" element={<VerificationPage/>} />
          <Route path="/loginPage" element={<SuccessPage/>} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;