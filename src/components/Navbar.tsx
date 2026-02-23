import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../Img/logo.png'; // Import the logo

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* ✅ Fixed Logo Path */}
            <img 
              src={Logo} 
              alt="South Indian Film Workers Union Logo" 
              className="h-12 w-auto mr-3"
            />
            <span className="font-bold text-lg">SIFWWU</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="hover:text-yellow-500 px-3 py-2">Home</a>
              <a href="#about" className="hover:text-yellow-500 px-3 py-2">About</a>
              <a href="#services" className="hover:text-yellow-500 px-3 py-2">Services</a>
              <a href="#founders" className="hover:text-yellow-500 px-3 py-2">Leadership</a>
              <a href="#ott" className="hover:text-yellow-500 px-3 py-2">OTT Platform</a>
              <a href="#contact" className="hover:text-yellow-500 px-3 py-2">Contact</a>
              <a href="#people" className="hover:text-yellow-500 px-3 py-2 font-semibold">People</a>
              <a href="#admin" className="hover:text-yellow-500 px-3 py-2 font-semibold">Admin Panel</a>
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#home" className="block hover:text-yellow-500 px-3 py-2">Home</a>
            <a href="#about" className="block hover:text-yellow-500 px-3 py-2">About</a>
            <a href="#services" className="block hover:text-yellow-500 px-3 py-2">Services</a>
            <a href="#founders" className="block hover:text-yellow-500 px-3 py-2">Leadership</a>
            <a href="#ott" className="block hover:text-yellow-500 px-3 py-2">OTT Platform</a>
            <a href="#contact" className="block hover:text-yellow-500 px-3 py-2">Contact</a>
            <a href="#people" className="block hover:text-yellow-500 px-3 py-2 font-semibold">People</a>
            <a href="#admin" className="block hover:text-yellow-500 px-3 py-2 font-semibold">Admin Panel</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
