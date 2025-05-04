import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router';

const SocietyLogin: React.FC = () => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white relative px-4 min-w-screen">
      {/* Navbar stays at the top */}
      <Navbar hover={hover} setHover={setHover} />

      {/* Centered Login Box */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)]"> {/* Adjust height if Navbar is 80px */}
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-extrabold text-center mb-8">Login</h1>

          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pinkish"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 rounded-md bg-[#1e1e1e] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pinkish"
            />

            <button
              type="submit"
              className="w-full p-3 mt-4 bg-pinkish hover:bg-pinkish text-white rounded-md font-semibold transition-colors"
            >
              Get Started
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocietyLogin;
