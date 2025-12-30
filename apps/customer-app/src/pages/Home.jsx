import React, { useState, useMemo } from 'react';
import { STORES_DATA } from '../data/stores';
import { Package, Search, Star, Clock, ChevronRight, ShoppingCart, Sparkles, Facebook, Instagram, Twitter } from 'lucide-react';

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

const Home = ({ setView, setSelectedStore, cart }) => {
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
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b px-6 py-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="bg-black p-2 rounded-xl text-[#98FF98]"><Package size={20} /></div>
                    <span className="font-black italic text-xl">Aasaan.</span>
                </div>
                <button onClick={() => setView('cart')} className="relative p-3 bg-gray-100 rounded-2xl">
                    <ShoppingCart size={20} />
                    {cart?.length > 0 && <span className="absolute -top-1 -right-1 bg-black text-[#98FF98] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">{cart.length}</span>}
                </button>
            </nav>

            <main className="flex-grow max-w-7xl mx-auto w-full p-6 text-left">
                <div className="bg-black rounded-[3rem] p-10 mb-10 relative overflow-hidden text-white">
                    <div className="relative z-10 max-w-lg">
                        <h1 className="text-5xl font-black tracking-tighter mb-6 leading-none">Everything <br /> <span className="text-[#98FF98]">Instantly.</span></h1>
                        <div className="relative">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input type="text" placeholder="Search stores or items..." className="w-full py-5 pl-14 pr-6 rounded-2xl text-black font-bold outline-none" onChange={(e) => setSearchQuery(e.target.value)} />
                        </div>
                    </div>
                    <Sparkles className="absolute right-10 bottom-0 text-white/5" size={250} />
                </div>

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