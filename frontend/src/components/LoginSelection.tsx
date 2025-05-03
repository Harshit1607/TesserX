import React from 'react';

interface LoginSelectionProps {
  hover: boolean;
  setHover: (value: boolean) => void;
}

const LoginSelection: React.FC<LoginSelectionProps> = ({ hover, setHover }) => {
  return (
    <div
      className={`fixed top-[100px] right-10 z-50 flex flex-col bg-white text-black rounded-lg shadow-lg transition-opacity duration-300 ${
        hover ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      onMouseLeave={() => setHover(false)}
    >
      <button className="px-6 py-3 hover:bg-gray-100 border-b">College Society</button>
      <button className="px-6 py-3 hover:bg-gray-100">Sponsor</button>
    </div>
  );
};

export default LoginSelection;
