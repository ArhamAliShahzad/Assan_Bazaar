import React from 'react';
import { Utensils, ShoppingBasket, Pill, Package, Sparkles, Star, Clock } from 'lucide-react';

const Home = ({ setView, setSelectedStore }) => {
    const stores = [
        { id: 1, name: "Aasaan Gourmet Burgers", rating: "4.9", time: "20-30m", img: "https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=800", tags: "Fast Food • Burgers" },
        { id: 2, name: "Khyber Shinwari", rating: "4.8", time: "40-50m", img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800", tags: "Desi • BBQ" },
        { id: 3, name: "Premium Grocery Store", rating: "4.7", time: "15-20m", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800", tags: "Fresh Items • 24/7" },
        { id: 4, name: "Pizza Max Aasaan", rating: "4.6", time: "25-35m", img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800", tags: "Italian • Pizza" }
    ];

    return (
        <main className="max-w-7xl mx-auto p-6 md:p-12">
            <div className="bg-black text-white rounded-[3.5rem] p-10 md:p-16 mb-12 relative overflow-hidden">
                <h2 className="text-4xl md:text-6xl font-black leading-tight mb-4 tracking-tighter">Fastest Delivery <br /> in <span className="text-[#98FF98]">Lahore.</span></h2>
                <p className="text-gray-400 max-w-md mb-8">Sab kuch mangwaein, sirf 20 minutes mein.</p>
                <Sparkles className="absolute right-10 top-10 text-[#98FF98]/20" size={150} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {[
                    { label: 'Food', color: 'bg-orange-500', icon: <Utensils /> },
                    { label: 'Mart', color: 'bg-blue-500', icon: <ShoppingBasket /> },
                    { label: 'Health', color: 'bg-red-500', icon: <Pill /> },
                    { label: 'Parcel', color: 'bg-purple-500', icon: <Package /> }
                ].map((cat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col items-center gap-4 hover:shadow-xl transition-all cursor-pointer">
                        <div className={`${cat.color} text-white p-5 rounded-[1.8rem]`}>{cat.icon}</div>
                        <span className="font-black text-xs uppercase">{cat.label}</span>
                    </div>
                ))}
            </div>

            <h3 className="text-2xl font-black mb-8">Popular Stores</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {stores.map(store => (
                    <div key={store.id} onClick={() => { setSelectedStore(store); setView('menu'); }} className="bg-white rounded-[2.5rem] overflow-hidden border hover:shadow-2xl transition-all cursor-pointer group">
                        <div className="h-48 relative overflow-hidden">
                            <img src={store.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500" alt="" />
                            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black flex items-center gap-1"><Star size={12} className="text-yellow-500 fill-yellow-500" /> {store.rating}</div>
                        </div>
                        <div className="p-6">
                            <h4 className="font-black text-lg">{store.name}</h4>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">{store.tags}</p>
                            <div className="mt-4 flex items-center gap-2 text-[10px] font-black"><Clock size={12} /> {store.time} • Free Delivery</div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default Home;