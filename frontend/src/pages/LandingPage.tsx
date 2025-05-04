import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import bgImg from '../assets/landingBG.png';
import bgImg2 from '../assets/shoppingcartphone.png';
import bgImg3 from '../assets/growth.png';
import Footer from '../components/Footer';
import LoginSelection from '../components/LoginSelection';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='max-w-screen min-w-screen min-h-screen overflow-hidden' >
      <Navbar hover={hover} setHover={setHover} />
      <div className="relative flex flex-col justify-center items-start gap-10 min-h-screen text-white ">"
        <img src={bgImg} className="absolute top-[10%] right-[5%] w-1/2 opacity-85" />
        <div style={{fontFamily :'DxLactos'}}className="ml-[5%] flex flex-col text-[7rem] font-extrabold leading-tight z-10">
          <span>
            Where <span className="text-[#1AD6B5]">Societies</span>
          </span>
          <span className="-mt-10">
            Meet <span className="text-[#E785F2]">Sponsors</span>
          </span>
        </div>
        <div className="ml-[5%] w-[55%] text-lg z-10">
          Connect student societies with corporate sponsors effortlessly.
          Discover opportunities, expand your reach, and build impactful partnerships to achieve your goals.
        </div>
        <div className="ml-[5%] w-[20%] flex justify-between ">
          <button
            onClick={() => navigate('/Create')}
            className="w-[150px] h-[50px] bg-[#1AD6B5] text-black font-bold rounded-xl"
          >
            Sign up
          </button>
          <button className="w-[150px] h-[50px] rounded-lg bg-transparent text-white text-lg font-bold">
            Login →
          </button>
        </div>
      </div>

      <div className="relative flex flex-col justify-center items-end h-screen bg-[#A7FBEC] gap-5 text-white">
        <img src={bgImg2} className="absolute top-[10%] left-[5%] w-1/2 opacity-85" />
        <span style= {{fontFamily: 'Camerao'}} className="w-[60%] mr-[5%] text-right text-[5rem] font-extrabold text-[#121212]">
          Reach the Right College Audiences
        </span>
        <span className="w-[50%] mr-[5%] text-right text-lg text-[#121212]">
          Find and sponsor the best-fit student societies.
          <br />
          Target societies based on event type, audience, and goals.
          <br />
          Simplify negotiations, finalize deals, and track performance —
          <span className="uppercase font-bold text-[#E785F2]"> all in one platform.</span>
        </span>
        <button className="mr-[5%] px-8 py-3 bg-[#1AD6B5] text-black text-lg font-black rounded">
          Get Started
        </button>
      </div>

      <div className="relative flex flex-col justify-center items-start h-screen bg-[#E9BFEE] gap-5 text-white">
        <img src={bgImg3} className="absolute top-[10%] right-0 w-1/2 opacity-85" />
        <span style= {{fontFamily: 'Camerao'}} className="w-[60%] ml-[5%] text-[5rem] font-extrabold  text-[#121212]">
          Unlock Sponsorships for Your Society
        </span>
        <span className="w-[50%] ml-[5%] text-lg text-[#121212]">
          Connect with the right sponsors effortlessly.
          <br />
          Showcase your events, attract top brands, and
          <br />
          secure sponsorships that match your society's goals. Manage
          <br />
          everything from <span className="uppercase font-bold text-[#43AB99]">proposals to contracts in one place</span>.
        </span>
        <button className="ml-[5%] px-8 py-3 bg-[#E785F2] text-black text-lg font-bold rounded">
          Get Started
        </button>
      </div>

      <Footer />
      <LoginSelection hover={hover} setHover={setHover} />
    </div>
  );
};

export default LandingPage;
