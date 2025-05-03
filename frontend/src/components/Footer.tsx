import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gray-900 text-white py-6 px-8 flex flex-col items-center md:flex-row md:justify-between">
      <div className="text-xl font-semibold mb-4 md:mb-0">
        Sponsorship Bridge
      </div>
      <div className="flex flex-col md:flex-row gap-4 text-sm">
        <a href="#" className="hover:text-teal-400 transition">Privacy Policy</a>
        <a href="#" className="hover:text-teal-400 transition">Terms of Service</a>
        <a href="#" className="hover:text-teal-400 transition">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
