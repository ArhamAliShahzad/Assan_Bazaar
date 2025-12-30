import React, { useState } from 'react';
import { Bike, Power, DollarSign, Package, MapPin, Navigation, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const RiderDashboard = ({ logout }) => {
    const [isOnline, setIsOnline] = useState(false);

    const toggleStatus = () => {
        setIsOnline(!isOnline);
        toast(isOnline ? "You are now Offline" : "You are now Online!", {
            icon: isOnline ? '😴' : '🚀',
            style: { borderRadius: '15px', background: '#333', color: '#fff' }
        });
    };

    const newOrders = [
        { id: "AS-552", store: "Gourmet Burgers", location: "Model Town", pay: "Rs. 150", distance: "2.5 km" },
        { id: "AS-559", store: "Khyber Shinwari", location: "Johar Town", pay: "Rs. 320", distance: "6.1 km" }
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFB] font-sans pb-10">
            {/* Header */}
            <div className="bg-black text-white p-8 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#98FF98]/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>

                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-[#98FF98] rounded-2xl flex items-center justify-center shadow-lg shadow-[#98FF98]/20 rotate-3">
                            <Bike className="text-black" size={28} />
                        </div>
                        <div>
                            <h2 className="font-black text-xl italic">Partner Portal</h2>
                            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">Live Tracking Active</p>
                        </div>
                    </div>
                    <button onClick={logout} className="p-4 bg-white/10 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all">
                        <Power size={22} />
                    </button>
                </div>

                <div className={`p-6 rounded-[2.5rem] flex justify-between items-center border ${isOnline ? 'bg-[#98FF98] border-[#98FF98] text-black shadow-lg shadow-[#98FF98]/20' : 'bg-gray-900 border-gray-800 text-gray-500'}`}>
                    <div>
                        <p className="text-[9px] font-black uppercase tracking-widest mb-1">System Status</p>
                        <h3 className="text-lg font-black">{isOnline ? 'RECEIVING ORDERS' : 'SYSTEM SLEEPING'}</h3>
                    </div>
                    <button onClick={toggleStatus} className={`w-16 h-9 rounded-full relative transition-all duration-500 ${isOnline ? 'bg-black' : 'bg-gray-700'}`}>
                        <div className={`absolute top-1.5 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-500 ${isOnline ? 'left-8' : 'left-1.5'}`}></div>
                    </button>
                </div>
            </div>

            <main className="max-w-md mx-auto p-6 -mt-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 group hover:border-[#98FF98] transition-all">
                        <div className="bg-blue-50 w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 mb-4"><DollarSign size={20} /></div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Today</p>
                        <h4 className="text-2xl font-black italic">Rs. 1,450</h4>
                    </div>
                    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 group hover:border-[#98FF98] transition-all">
                        <div className="bg-orange-50 w-10 h-10 rounded-xl flex items-center justify-center text-orange-500 mb-4"><Package size={20} /></div>
                        <p className="text-[10px] font-black text-gray-400 uppercase">Trips</p>
                        <h4 className="text-2xl font-black italic">12 Done</h4>
                    </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-black text-xl italic tracking-tighter">Live Requests</h3>
                    {isOnline && <div className="flex items-center gap-2 bg-red-50 text-red-500 px-3 py-1 rounded-full text-[10px] font-black"><Bell size={12} className="animate-bounce" /> HIGH DEMAND</div>}
                </div>

                {!isOnline ? (
                    <div className="bg-white p-16 rounded-[3rem] border-2 border-dashed border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bike size={32} className="text-gray-200" />
                        </div>
                        <p className="text-gray-400 font-bold text-sm">Online jayein taake orders mil sakein</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {newOrders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-50 relative overflow-hidden group">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-[10px] font-black">#{order.id}</span>
                                    <div className="text-right">
                                        <p className="text-[#2db32d] font-black text-lg leading-none">{order.pay}</p>
                                        <p className="text-[9px] text-gray-400 font-bold">Estimated Pay</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-black mb-1">{order.store}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-400 font-bold mb-6">
                                    <MapPin size={14} className="text-[#98FF98]" /> {order.location} <span className="text-gray-200">•</span> {order.distance}
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="py-4 rounded-2xl bg-gray-50 text-gray-400 font-black text-xs uppercase hover:bg-red-50 hover:text-red-500 transition-all">Ignore</button>
                                    <button className="py-4 rounded-2xl bg-black text-[#98FF98] font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-black/20 active:scale-95 transition-all">
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