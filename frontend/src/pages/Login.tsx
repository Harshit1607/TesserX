import React, { useState } from 'react';
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router'
const Login: React.FC = () => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);
    return (
        <div className='min-w-screen min-h-screen gap-10  bg-[#090909]'>
            <Navbar hover={hover} setHover={setHover} />
            <div className='flex flex-col min-w-screen min-h-screen gap-10 justify-center items-center'>
                <div className='flex flex-col justify-center items-center text-center'>
                    <div className='text-7xl font-black' style={{ fontFamily :'Camerao'}}> Log in</div>
                    <div className='text-3xl'>In what type of account do you want to login?</div>
                </div>
                <div className='flex justify-between w-[80%]'>
                    <div className='m-8 flex gap-2 flex-col justify-center items-center text-center border-4 rounded-2xl p-7 border-[#1AD6B5] '>
                        <div className='text-5xl font-medium text-[#1AD6B5]'>College</div>
                        <div className='text-xl'>I want to attract sponsors and secure funding for our events.</div>
                        <div>--</div>
                    </div>
                    <div className='m-8 flex gap-2 flex-col justify-center items-center text-center border-4 rounded-2xl p-7 border-[#E785F2]' onClick={() => navigate('/sponsor')}>
                        <div className='text-5xl font-medium text-[#E785F2]'>Societies</div>
                        <div className='text-xl'>I want to attract sponsors and secure funding for our events.</div>
                        <div>--</div>
                    </div>
                    <div className='m-8 flex gap-2 flex-col justify-center items-center text-center border-4 rounded-2xl p-7 border-[#1AD6B5] '>
                        <div className='text-5xl font-medium text-[#1AD6B5]'>Sponsors</div>
                        <div className='text-xl'>I want to attract sponsors and secure funding for our events.</div>
                        <div>--</div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Login