import logo from "../assets/logo.png";
import logoutIcon from "../assets/Logout.png";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EventFormStep1: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-36">
        
        {/* Left Side - Text */}
        <div className="md:w-1/2 ml-40">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight relative">
            <span className="border-l-[18px] border-cyan-400 pl-4 block leading-snug h-full">
              Have an Event
            </span>
            <span className="pl-[1.5rem] block">upcoming?</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            Have an Event upcoming? Want to find Sponsors for it? dfwjiwjd frfr
            <br />
            Just fill in a few details on the sid
            <br />
            and Voila!
          </p>

          <div className="flex items-center gap-4 mt-8">
            <button className="bg-teal-500 w-12 h-12 flex items-center justify-center rounded">
              <ArrowLeft className="text-black" />
            </button>
            <button className="bg-purple-400 text-black px-6 py-3 rounded-lg font-semibold">
              Next
            </button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <img src={logo} alt="SB Logo" className="w-10 h-10 object-contain" />
            <img src={logoutIcon} alt="Logout Icon" className="w-8 h-8 object-contain" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="md:w-1/2 space-y-6">
          <input
            type="text"
            placeholder="Enter event name"
            className="w-full bg-gray-900 text-white placeholder-gray-500 p-4 rounded-md"
          />
          <input
            type="text"
            placeholder="dd/mm/yyyy"
            className="w-full bg-gray-900 text-white placeholder-gray-500 p-4 rounded-md"
          />
          <input
            type="text"
            placeholder="Time"
            className="w-full bg-gray-900 text-white placeholder-gray-500 p-4 rounded-md"
          />
        </div>
      </div>

      {/* Step Indicator */}
      <div className="absolute bottom-10 right-0 mr-6 flex gap-6 text-white text-lg">
        {[1, 2, 3, 4, 5].map((num) => (
          <div
            key={num}
            className={`flex flex-col items-center ${
              num === 1 ? "text-purple-400" : "text-white"
            }`}
          >
            <span>{num}.</span>
            <div
              className={`mt-1 rounded-full ${
                num === 1
                  ? "bg-purple-400 w-40 h-1"  // 4x longer pink
                  : "bg-white w-10 h-1"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventFormStep1;
