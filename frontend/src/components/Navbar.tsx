import logo from "../assets/Logo.png"
import React from 'react'

interface LandingNavProps {
    hover: boolean;
    setHover: (value: boolean) => void;
}

const Navbar: React.FC<LandingNavProps> = ({ hover, setHover }) => {
    return (
        <div className="absolute w-screen z-20 bg-[#090909] flex justify-between px-10 py-5 gap-10 items-center">
            <div>
                <a href="/"><img src={logo} className="w-[60px]" alt="" /></a>
            </div>
            <div className="flex justify-between  w-[65%] px-20" >
                <div>
                    For Companies
                </div>
                <div>
                    For Colleges
                </div>
                <div>
                    For Societies
                </div>
                <div>
                    About
                </div>
            </div>
            <div className="flex flex-row gap-5 justify-center items-center text-center">
                <a href="/create"> <button className="h-[40px] items-center justify-center flex text-black bg-[#E785F2] rounded-xl" onClick={() => setHover(!hover)}> Get Started</button></a>
                <a href="/login">  <button className="h-[40px] flex justify-center items-center border-2 border-[#1AD6B5] rounded-xl" onClick={() => setHover(!hover)}>Login</button></a>
            </div>
        </div>
    )
}

export default Navbar