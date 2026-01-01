import React, { useState, useMemo } from 'react';
import { STORES_DATA } from '../data/stores';
import { Package, Search, ChevronRight, Sparkles, Facebook, Instagram, Twitter, ShoppingBag, Bike } from 'lucide-react';

const Footer = () => (
    <footer className="bg-white border-t p-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-left">
            <div className="col-span-2">
                <h3 className="text-2xl font-black italic mb-4">Aasaan.</h3>
                <p className="text-gray-400 font-medium max-w-sm">Pakistan's fastest delivery network. Everything you need, delivered in minutes.</p>
                <div className="flex gap-4 mt-6">
                    <Facebook className="cursor-pointer hover:text-[#98FF98]" />
                    <Instagram className="cursor-pointer hover:text-[#98FF98]" />
                    <Twitter className="cursor-pointer hover:text-[#98FF98]" />
                </div>
            </div>
            <div>
                <h4 className="font-black mb-4">Quick Links</h4>
                <ul className="text-gray-400 space-y-2 text-sm font-bold">
                    <li className="cursor-pointer hover:text-black">Add your Restaurant</li>
                    <li className="cursor-pointer hover:text-black">Join as Rider</li>
                </ul>
            </div>
            <div>
                <h4 className="font-black mb-4">Contact</h4>
                <p className="text-gray-400 text-sm font-bold italic">Gulberg III, Lahore<br />support@aasaan.pk</p>
            </div>
        </div>
    </footer>
);

const Home = ({ setView, setSelectedStore }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredStores = useMemo(() => {
        return (STORES_DATA || []).filter(s =>
            (activeCategory === "All" || s.category === activeCategory) &&
            s.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [searchQuery, activeCategory]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <main className="flex-grow max-w-7xl mx-auto w-full p-6 text-left mt-6">

                {/* HERO SECTION */}
                <div className="bg-black rounded-[3rem] p-10 mb-10 relative overflow-hidden text-white shadow-2xl">
                    <div className="relative z-10 max-w-lg">
                        <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none italic uppercase">Fastest<br /> <span className="text-[#98FF98]">Delivery.</span></h1>
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search restaurants or food..."
                                className="w-full py-5 pl-14 pr-6 rounded-2xl text-black font-bold outline-none shadow-xl"
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                    <Sparkles className="absolute right-10 bottom-0 text-white/5" size={300} />
                </div>

                {/* BAZAAR CUSTOM ORDER BANNER */}
                <div className="bg-[#98FF98] rounded-[3rem] p-8 mb-10 border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-center group cursor-pointer"
                    onClick={() => setView('customOrder')}>
                    <div className="text-left">
                        <h2 className="text-4xl font-black italic tracking-tighter text-black">BAZAAR SE KUCH MANGWANA HAI?</h2>
                        <p className="font-bold text-black/60 mt-2 uppercase text-xs">Roti, Dahi, Soda ya kuch bhi... Rider hazir hai!</p>
                        <button className="mt-6 bg-black text-[#98FF98] px-8 py-4 rounded-2xl font-black hover:scale-105 transition-all">ORDER ANYTHING</button>
                    </div>
                    <Bike size={120} className="text-black group-hover:rotate-12 transition-all mt-6 md:mt-0" />
                </div>

                {/* CATEGORIES */}
                <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar">
                    {['All', 'Food', 'Mart', 'Health', 'Parcel'].map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-8 py-4 rounded-2xl font-black text-xs transition-all ${activeCategory === cat ? 'bg-black text-[#98FF98]' : 'bg-white text-gray-400 border'}`}>{cat}</button>
                    ))}
                </div>

                <h2 className="text-2xl font-black mb-6 italic">{activeCategory} Partners</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredStores.map(store => (
                        <div key={store.id} onClick={() => { setSelectedStore(store); setView('menu'); }} className="bg-white rounded-[2.5rem] overflow-hidden border border-transparent hover:border-black transition-all cursor-pointer group shadow-sm">
                            <div className="h-48 overflow-hidden"><img src={store.img} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" alt="" /></div>
                            <div className="p-6">
                                <h4 className="font-black text-lg">{store.name}</h4>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-[10px] font-black bg-gray-100 px-3 py-1 rounded-lg">{store.time}</span>
                                    <ChevronRight size={18} className="text-[#98FF98]" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;