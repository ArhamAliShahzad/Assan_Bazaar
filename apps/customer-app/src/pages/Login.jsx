import React from 'react';
import { ShoppingBag, ArrowRight, Bike, ShieldCheck, Zap, Star, Globe } from 'lucide-react';

const Login = ({ setAuthState, setSelectedRole }) => {
    const handleChoice = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">
            {/* LEFT SIDE: THE BRAND EXPERIENCE */}
            <div className="md:w-1/2 bg-black text-white relative flex flex-col justify-between p-8 md:p-16 overflow-hidden">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#98FF98]/10 rounded-full blur-[120px]"></div>

                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-14 h-14 bg-[#98FF98] rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(152,255,152,0.3)] rotate-3">
                        <Globe size={28} className="text-black" />
                    </div>
                    <span className="text-3xl font-black italic tracking-tighter uppercase">Aasaan.</span>
                </div>

                <div className="relative z-10 my-12 md:my-0">
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-8">
                        FASTER <br />
                        <span className="text-[#98FF98] italic">THAN</span> <br />
                        EVER.
                    </h1>
                    <p className="text-gray-400 text-xl max-w-sm font-bold leading-relaxed border-l-4 border-[#98FF98] pl-6">
                        Pakistan's first hyper-local market. Food, Mart, and Essentials delivered in 20 mins.
                    </p>
                </div>

                <div className="relative z-10 flex flex-wrap gap-8 opacity-60">
                    {[
                        { icon: <ShieldCheck size={20} />, text: "SECURE" },
                        { icon: <Zap size={20} />, text: "INSTANT" },
                        { icon: <Star size={20} />, text: "TOP RATED" }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-[#98FF98]">{item.icon}</span>
                            <span className="text-[10px] font-black tracking-[0.2em]">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT SIDE: SELECTION */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-[#FDFDFD]">
                <div className="w-full max-w-md">
                    <div className="mb-12 space-y-2">
                        <h2 className="text-5xl font-black text-gray-900 tracking-tighter italic">Welcome.</h2>
                        <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">Choose your entrance to the market</p>
                    </div>

                    <div className="grid gap-6">
                        {/* Customer */}
                        <button onClick={() => handleChoice('customer')} className="group relative bg-white p-8 rounded-[3rem] text-left border-2 border-gray-100 hover:border-black transition-all duration-500 shadow-sm hover:shadow-2xl overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#98FF98] transition-colors">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 italic">I want to Shop</h3>
                                    <p className="text-gray-400 font-bold text-sm">Order anything from your city</p>
                                </div>
                                <ArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={32} />
                            </div>
                        </button>

                        {/* Rider */}
                        <button onClick={() => handleChoice('rider')} className="group relative bg-black p-8 rounded-[3rem] text-left border-2 border-black hover:bg-gray-900 transition-all duration-500 shadow-xl overflow-hidden">
                            <div className="relative z-10 flex justify-between items-center">
                                <div>
                                    <div className="w-16 h-16 bg-[#98FF98] rounded-2xl flex items-center justify-center mb-6">
                                        <Bike size={32} className="text-black" />
                                    </div>
                                    <h3 className="text-2xl font-black text-white italic">I want to Deliver</h3>
                                    <p className="text-gray-500 font-bold text-sm">Earn on every delivery trip</p>
                                </div>
                                <ArrowRight className="text-[#98FF98] group-hover:translate-x-2 transition-all" size={32} />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;