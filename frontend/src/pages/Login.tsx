
import arrow from '../assets/arrow.svg'
import { useNavigate } from 'react-router'
const Login = () => {
    const navigate = useNavigate();
    return (
        <div className='flex justify-center items-center min-w-screen flex-col bg-[#090909]'>
            <div className='text-5xl text-start w-[70%] m-10' style= {{fontFamily: 'Camerao'}}>
                Log In
            </div>
            <div className='flex flex-col gap-5 w-[70%]'>
                <button className='flex justify-between bg-[#1AD6B5] px-10 py-5 rounded-xl items-center text-black gap-8' onClick={() => navigate('/events')}>
                    <div className='text-[2.5rem]'>I want to login as</div>
                    <div className='w-1/5  h-0 border-1 border-black rounded-full'></div>
                    <div className='text-[4rem]'>
                        SOCIETY
                    </div>
                    <img src={arrow} alt="" />
                </button>
                <button className='flex justify-between bg-[#E785F2] px-10 py-5 rounded-xl items-center text-black gap-8'>
                    <div className='text-[2.5rem]'>I want to login as</div>
                    <div className='w-1/5  h-0 border-1 border-black rounded-full'></div>
                    <div className='text-[4rem]'>
                        COLLEGE
                    </div>
                    <img src={arrow} alt="" />
                </button>
                <button className='flex justify-between bg-[#1AD6B5] px-10 py-5 rounded-xl items-center text-black gap-8'>
                    <div className='text-[2.5rem]'>I want to login as</div>
                    <div className='w-1/5  h-0 border-1 border-black rounded-full'></div>
                    <div className='text-[4rem]'>
                        SPONSOR
                    </div>
                    <img src={arrow} alt="" />
                </button>


            </div>
        </div>
    )
}

export default Login