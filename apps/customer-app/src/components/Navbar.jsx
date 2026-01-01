import React from 'react';
import { ShoppingCart, LogOut, Package, History } from 'lucide-react';

const Navbar = ({ logout, cart, setView }) => {
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="h-20 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
        <div className="bg-black p-2 rounded-xl text-[#98FF98]">
          <Package size={20} />
        </div>
        <h1 className="text-2xl font-black italic">Aasaan<span className="text-gray-400">Bazar</span></h1>
      </div>

      <div className="flex items-center gap-3">
        {/* History Icon */}
        <button
          onClick={() => setView('history')}
          className="p-3 hover:bg-gray-100 rounded-2xl transition-all text-gray-600"
          title="My Orders"
        >
          <History size={22} />
        </button>

        {/* Cart Icon */}
        <button
          onClick={() => setView('checkout')}
          className="relative p-3 bg-gray-100 rounded-2xl hover:bg-gray-200 transition-all"
        >
          <ShoppingCart size={22} className="text-black" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-black text-[#98FF98] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-extrabold border-2 border-white animate-bounce">
              {cartCount}
            </span>
          )}
        </button>

        <button onClick={logout} className="ml-2 bg-black text-white px-5 py-2.5 rounded-2xl font-bold text-sm hover:bg-gray-800 transition-all">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;