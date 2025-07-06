
import { NavLink } from 'react-router';
import logo from './../assets/libratrack logo.png'; 

const Footer = () => {
  return (
    <footer className="bg-[#03151E] text-white py-6 mt-16 ">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="LibraTrack Logo" className="w-8 md:w-10 h-8 md:h-10" />
          <h1 className="text-[#0096B5] text-xl md:text-2xl font-bold">LibraTrack</h1>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6">
          <NavLink to="/" className="hover:underline text-sm md:text-base font-semibold text-white/90">
            All Books
          </NavLink>
          <NavLink to="/borrow-summary" className="hover:underline text-sm md:text-base font-semibold text-white/90">
            Borrow Summary
          </NavLink>
        </nav>

        {/* Footer Text */}
        <p className="text-xs text-white/60 mt-2">© {new Date().getFullYear()} LibraTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
