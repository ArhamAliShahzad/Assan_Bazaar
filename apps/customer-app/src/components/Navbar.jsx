import React from 'react';
import { Search, User } from 'lucide-react';

const Navbar = ({ logout }) => (
  <nav className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b flex items-center justify-between px-6 md:px-12">
    <h1 className="text-2xl font-black italic">Aasaan<span className="text-[#98FF98]">Bazar</span></h1>
    <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
      <input type="text" placeholder="Search..." className="w-full py-2.5 pl-12 bg-gray-100 rounded-full border-none outline-none font-medium"/>
    </div>
    <button onClick={logout} className="bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:opacity-80 transition-all">Logout</button>
  </nav>
);

export default Navbar;