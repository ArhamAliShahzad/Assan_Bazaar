import React, { useState } from 'react';
import { Bike, Power, DollarSign, Package, MapPin, Navigation, CheckCircle } from 'lucide-react';

const RiderDashboard = ({ logout }) => {
    const [isOnline, setIsOnline] = useState(false);

    // Ye orders hum baad mein database se layenge
    const newOrders = [
        { id: "AS-552", store: "Gourmet Burgers", location: "Model Town", pay: "Rs. 150", distance: "2.5 km" },
        { id: "AS-559", store: "Khyber Shinwari", location: "Johar Town", pay: "Rs. 320", distance: "6.1 km" }
    ];

    return (
        <div className="min-h-screen bg-[#F4F7F6] font-sans pb-10">
            {/* Rider Top Nav */}
            <div className="bg-black text-white p-6 rounded-b-[2.5rem] shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#98FF98] rounded-2xl flex items-center justify-center shadow-lg shadow-[#98FF98]/20">
                            <Bike className="text-black" size={24} />
                        </div>
                        <div>
                            <h2 className="font-black text-lg">Ali Rider</h2>
                            <p className="text-[10px] text-[#98FF98] font-bold uppercase tracking-widest">Premium Partner</p>
                        </div>
                    </div>
                    <button onClick={logout} className="p-3 bg-white/10 rounded-2xl hover:bg-red-500 transition-all">
                        <Power size={20} />
                    </button>
                </div>

                {/* Online Toggle Card */}
                <div className={`p-6 rounded-3xl flex justify-between items-center transition-all ${isOnline ? 'bg-[#98FF98] text-black' : 'bg-gray-800 text-gray-400'}`}>
                    <div>
                        <p className="text-xs font-black uppercase tracking-tighter">Current Status</p>
                        <h3 className="text-xl font-black">{isOnline ? 'You are Online' : 'You are Offline'}</h3>
                    </div>
                    <button
                        onClick={() => setIsOnline(!isOnline)}
                        className={`w-16 h-8 rounded-full relative transition-all ${isOnline ? 'bg-black' : 'bg-gray-600'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isOnline ? 'left-9' : 'left-1'}`}></div>
                    </button>
                </div>
            </div>

            <main className="max-w-md mx-auto p-6">
                {/* Earnings Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="text-blue-500 mb-2"><DollarSign size={20} /></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Today's Pay</p>
                        <h4 className="text-xl font-black italic">Rs. 1,450</h4>
                    </div>
                    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100">
                        <div className="text-orange-500 mb-2"><Package size={20} /></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Completed</p>
                        <h4 className="text-xl font-black italic">12 Orders</h4>
                    </div>
                </div>

                {/* Order Requests */}
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-black text-gray-800 text-lg">New Requests</h3>
                    {isOnline && <span className="flex h-3 w-3 rounded-full bg-red-500 animate-ping"></span>}
                </div>

                {!isOnline ? (
                    <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-gray-200 text-center">
                        <Bike size={48} className="mx-auto text-gray-200 mb-4" />
                        <p className="text-gray-400 font-bold">Kaam shuru karne ke liye online jayein</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {newOrders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-[2.5rem] shadow-lg border-l-8 border-[#98FF98] animate-in slide-in-from-bottom-4 duration-500">
                                <div className="flex justify-between mb-4">
                                    <span className="font-black text-gray-400 text-xs">#{order.id}</span>
                                    <span className="font-black text-[#2db32d]">{order.pay}</span>
                                </div>
                                <h4 className="text-lg font-black mb-1">{order.store}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-6">
                                    <MapPin size={14} /> {order.location} ({order.distance})
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-3 rounded-2xl bg-gray-100 font-black text-xs uppercase hover:bg-red-50 transition-all">Ignore</button>
                                    <button className="py-3 rounded-2xl bg-black text-[#98FF98] font-black text-xs uppercase flex items-center justify-center gap-2 hover:opacity-80 transition-all">
                                        Accept <Navigation size={14} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default RiderDashboard;