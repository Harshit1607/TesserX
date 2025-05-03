import React, { useState } from 'react';
import Navbar from './Navbar';

interface Sponsor {
  company: string;
  location: string;
  budget: string;
  domain: string;
}

const SponsorsList: React.FC = () => {
  const [hover, setHover] = useState(false); // ✅ Add hover state

  const sponsorsData: Sponsor[] = [
    { company: 'Microsoft', location: 'US', budget: '$9000', domain: 'Sports' },
    { company: 'Yahoo', location: 'Kiribati', budget: '$1200', domain: 'Photo' },
    { company: 'Adobe', location: 'Israel', budget: '$17000', domain: 'Design' },
  ];

  return (
    <div className="bg-gray-900 min-h-screen">
      <Navbar hover={hover} setHover={setHover} /> {/* ✅ Pass props */}
      <div className="bg-white w-11/12 mx-auto py-10 mb-8 rounded-lg flex justify-evenly">
        <div className="flex justify-evenly w-full">
          <div className="bg-green-400 rounded-full h-16 w-16"></div>
          <div className="px-3 flex flex-col justify-center">
            <div className="text-sm text-gray-400">Registered Societies</div>
            <div className="text-2xl">10,354</div>
          </div>
          <div className="w-px bg-gray-300 mx-5"></div>
          <div className="bg-green-400 rounded-full h-16 w-16"></div>
          <div className="px-3 flex flex-col justify-center">
            <div className="text-sm text-gray-400">Registered Societies</div>
            <div className="text-2xl">10,354</div>
          </div>
          <div className="w-px bg-gray-300 mx-5"></div>
          <div className="bg-green-400 rounded-full h-16 w-16"></div>
          <div className="px-3 flex flex-col justify-center">
            <div className="text-sm text-gray-400">Registered Societies</div>
            <div className="text-2xl">10,354</div>
          </div>
        </div>
      </div>

      <div className="h-px bg-black"></div>

      {/* Sponsors Section */}
      <div className="bg-white w-11/12 mx-auto py-12 rounded-lg">
        <div className="flex justify-between font-bold mb-6">
          <div className="text-3xl">ALL SPONSORS</div>
          <div className="flex gap-4">
            <div className="bg-gray-100 w-32 text-center py-2 rounded">Search</div>
            <div className="bg-gray-100 w-32 text-center py-2 rounded">Sort By NEW</div>
          </div>
        </div>

        <div className="text-green-400 mb-4">Active Members</div>
        <div className="w-full h-px bg-gray-300 mb-4"></div>

        <div>
          <div className="flex justify-between">
            <div className="flex justify-between w-7/12 text-gray-700">
              <div className="text-gray-400">Company</div>
              <div className="text-gray-400">Location</div>
              <div className="text-gray-400">Budget</div>
              <div className="text-gray-400">Domain</div>
            </div>
            <div className="text-gray-700">Status</div>
          </div>
          <div className="w-full h-px bg-gray-300 my-4"></div>
        </div>

        {sponsorsData.map((sponsor, index) => (
          <div key={index}>
            <div className="flex justify-between mb-4">
              <div className="flex justify-between w-7/12 text-gray-700">
                <div>{sponsor.company}</div>
                <div>{sponsor.location}</div>
                <div>{sponsor.budget}</div>
                <div>{sponsor.domain}</div>
              </div>
              <div className="text-gray-700">Status</div>
            </div>
            <div className="w-full h-px bg-gray-300 my-4"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SponsorsList;
