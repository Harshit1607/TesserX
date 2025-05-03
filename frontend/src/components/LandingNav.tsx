import React from 'react';

interface LandingNavProps {
  hover: boolean;
  setHover: (value: boolean) => void;
}

const LandingNav: React.FC<LandingNavProps> = ({ hover, setHover }) => {
  return (
    <div className="w-full h-[100px] bg-[#121212] text-white flex items-center justify-between px-10 text-xl font-semibold z-50 sticky top-0">
      <div className="text-3xl font-bold text-white font-[Schibsted Grotesk]">SB</div>
      <a href="/" className="hover:text-green-400">Home</a>
      <a href="/create" className="hover:text-green-400">EXPLORE</a>
      <a href="/home" className="hover:text-green-400">CREATE ACCOUNT</a>
      <div
        className="cursor-pointer text-white text-lg font-medium hover:scale-105 transition-transform"
        onClick={() => setHover(!hover)}
      > Create Account
      </div>
      <div
        className="cursor-pointer text-white text-lg font-medium hover:scale-105 transition-transform"
        onClick={() => setHover(!hover)}
      > Login
      </div>
    </div>
  );
};

export default LandingNav;
