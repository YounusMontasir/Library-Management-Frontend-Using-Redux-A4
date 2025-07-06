
import { NavLink } from 'react-router';
import logo from './../assets/libratrack logo.png'
const Navbar = () => {
    return (
        <div className='flex gap-5 lg:gap-10 w-11/12 lg:w-10/12 mx-auto mt-10 items-center '>
           <div className='flex justify-center gap-2'>
             <p className='font-bold text-[#0096B5] text-xl md:text-2xl'>LibraTrack</p>
             <img src={logo} className='w-8 md:w-10 h-7 md:h-9' alt="" />
           </div>
           <div className='flex gap-2 lg:gap-10 md:ml-40 lg:ml-90'>
             <NavLink className={'font-bold text-[#03151E] underline'} to={'/'}>All Books</NavLink>
              <NavLink className={'font-bold text-[#03151E] underline'} to={'/borrow-summary'}>Book Summary</NavLink>
           </div>
        </div>
    );
};

export default Navbar;