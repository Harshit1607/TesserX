import logo from "../assets/Logo.png"
import React from 'react'

interface LandingNavProps {
    hover: boolean;
    setHover: (value: boolean) => void;
}

const Navbar: React.FC<LandingNavProps> = ({ hover, setHover }) => {
    return (
        <div className="relative w-screen z-20 bg-[#090909] flex justify-between px-10 py-5 gap-10 items-center">
            <div>
                <a href="/"><img src={logo} className="w-[60px]" alt="" /></a>
            </div>
            <div className="flex justify-between  w-[70%] px-20" >

            </div>
            <div className="flex flex-row gap-5 justify-center items-center text-center">
                <a href="/create"><button style={{ backgroundColor: '#E785F2' }} className="h-[40px] items-center justify-center flex text-black " onClick={() => setHover(!hover)}> Get Started</button></a>
                <a href="/login"><button style={{ border: 4, borderColor: '#1AD6B5' }} className="h-[40px] flex justify-center items-center border-4 border-[#1AD6B5] " onClick={() => setHover(!hover)}>Login</button></a>
            </div>
        </div>
    )
}

export default Navbar