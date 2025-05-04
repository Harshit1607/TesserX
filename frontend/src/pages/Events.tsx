import { useEffect, useState } from "react";
import logo from '../assets/Logo.png'

type Sponsor = {
  id: number;
  name: string;
  description: string;
};

export default function DigitalArtsSociety() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);

  useEffect(() => {
    // Simulated fetch - replace with actual API call
    const fetchSponsors = async () => {
      const data: Sponsor[] = [
        {
          id: 1,
          name: "Akindo",
          description:
            "Lorem ipsum dolor sit amet consectetur. Orci felis volutpat diam proin arcu. Viverra ac nibh maecenas mi ut sodales lacus Ut fringilla.",
        },
        {
          id: 2,
          name: "Akindo",
          description:
            "Lorem ipsum dolor sit amet consectetur. Orci felis volutpat diam proin arcu. Viverra ac nibh maecenas mi ut sodales lacus Ut fringilla.",
        },
        {
          id: 3,
          name: "Akindo",
          description:
            "Lorem ipsum dolor sit amet consectetur. Orci felis volutpat diam proin arcu. Viverra ac nibh maecenas mi ut sodales lacus Ut fringilla.",
        },
      ];
      setSponsors(data);
    };
    fetchSponsors();
  }, []);

  return (
    <div className=" text-white min-h-screen min-w-screen p-20">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          <span className="text-teal-400">|</span> <span style={{fontFamily : 'Camerao'}} > Welcome, Digital Arts Society </span>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
          <img src={logo} alt="" className="h-20" />
        </div>
      </header>

      <div className="flex space-x-4 mb-6">
        <button className="flex items-center bg-gray-800 px-4 py-2 rounded text-sm">
          <span className="mr-2">&#9881;</span> Filter
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="bg-gray-800 pl-10 pr-4 py-2 rounded text-sm focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="space-y-6">
        {sponsors.map((sponsor) => (
          <div key={sponsor.id} className="border-t border-gray-700 pt-6">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-300"></div>
              <div className="flex-1">
                <h2 className="text-lg font-bold">{sponsor.name}</h2>
                <p className="text-sm text-gray-300 mt-1">{sponsor.description}</p>
                <a href="#" className="text-sm text-teal-400 mt-2 inline-block">
                  Know more
                </a>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <button className="bg-fuchsia-500 text-white px-4 py-1 rounded text-sm">
                  View Proposal
                </button>
                <a href="#" className="flex items-center text-sm underline">
                  Chat with us <span className="ml-1">💬</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-700 flex justify-center items-center px-10 py-4 gap-10">
        <span>Sponsors</span>
        <button className="bg-teal-400 text-white rounded-full w-10 h-10 flex items-center justify-center">
          +
        </button>
        <span>Message</span>
      </footer>
    </div>
  );
}
