import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const EventFormStep1: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 relative">
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-24">
        
        {/* Left Side - Text */}
        <div className="md:w-1/2 ml-20">
          <div className="flex">
            <div className="border-l-4 border-cyan-400 mr-4"></div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="block">Have an Event</span>
                <span className="block">upcoming?</span>
              </h1>
            </div>
          </div>

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

          <div className="mt-12 text-4xl font-extrabold flex items-center gap-2">
            <span>SB</span>
            <span className="text-2xl">↩</span>
          </div>
        </div>

        {/* Right Side - Form + Step Indicators */}
        <div className="md:w-1/2 space-y-6 relative">
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

          {/* Step Indicator aligned with form */}
          <div className="flex gap-6 text-white text-lg pt-10">
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
                      ? "bg-purple-400 w-40 h-1"
                      : "bg-white w-10 h-1"
                  }`}
                ></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFormStep1;
