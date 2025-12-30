import React from 'react';
import { ShoppingBag, ArrowRight, Bike, ShieldCheck, Zap, Star } from 'lucide-react';

const Login = ({ setAuthState, setSelectedRole }) => {
    const handleChoice = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans overflow-hidden">

            {/* LEFT SIDE: BRANDING & MOCKUP LOOK */}
            <div className="md:w-1/2 bg-black text-white relative flex flex-col justify-between p-12 overflow-hidden">
                {/* Background Decorative Element */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#98FF98]/10 rounded-full blur-[120px]"></div>

                {/* Top: Logo */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#98FF98] rounded-2xl flex items-center justify-center shadow-lg shadow-[#98FF98]/20">
                        <ShoppingBag size={24} className="text-black" />
                    </div>
                    <span className="text-2xl font-black italic tracking-tighter uppercase">Aasaan.</span>
                </div>

                {/* Center: Main Text */}
                <div className="relative z-10 mt-20 md:mt-0">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-6">
                        FASTEST <br />
                        <span className="text-[#98FF98] italic">DELIVERY</span> <br />
                        MARKET.
                    </h1>
                    <p className="text-gray-400 text-lg max-w-sm font-medium leading-relaxed">
                        Ab har cheez milegi aapke darwazay par, sirf 20 minute mein. Join the revolution.
                    </p>
                </div>

                {/* Bottom: Trust Badges */}
                <div className="relative z-10 flex gap-6 mt-12 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-[#98FF98]" size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Secure</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Zap className="text-[#98FF98]" size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Fast</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Star className="text-[#98FF98]" size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Trusted</span>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: ROLE SELECTION */}
            <div className="flex-1 flex flex-col justify-center items-center p-8 md:p-16 bg-[#FAFAFA]">
                <div className="w-full max-w-md">
                    <div className="mb-12">
                        <h2 className="text-4xl font-black text-gray-900 tracking-tight mb-2">Shuru Karein!</h2>
                        <p className="text-gray-500 font-bold">Aap hamari app kaise use karna chahte hain?</p>
                    </div>

                    <div className="space-y-6">
                        {/* Customer Card */}
                        <button
                            onClick={() => handleChoice('customer')}
                            className="group w-full bg-white p-8 rounded-[2.5rem] text-left shadow-sm border border-gray-100 hover:border-[#98FF98] hover:shadow-2xl hover:shadow-[#98FF98]/10 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] group-hover:opacity-[0.1] transition-opacity">
                                <ShoppingBag size={150} />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-[#98FF98] transition-colors duration-500 text-black">
                                    <ShoppingBag size={28} />
                                </div>
                                <ArrowRight className="text-gray-200 group-hover:text-black group-hover:translate-x-2 transition-all" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-1">Customer Portal</h3>
                            <p className="text-gray-400 text-sm font-medium italic">Order food, groceries & more.</p>
                        </button>

                        {/* Rider Card */}
                        <button
                            onClick={() => handleChoice('rider')}
                            className="group w-full bg-black p-8 rounded-[2.5rem] text-left shadow-xl hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.1] group-hover:opacity-[0.2] transition-opacity">
                                <Bike size={150} className="text-white" />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-4 bg-[#98FF98] rounded-2xl text-black">
                                    <Bike size={28} />
                                </div>
                                <ArrowRight className="text-[#98FF98] group-hover:translate-x-2 transition-all" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-1">Rider Partner</h3>
                            <p className="text-gray-400 text-sm font-medium italic">Earn money on your own schedule.</p>
                        </button>
                    </div>

                    <p className="text-center mt-12 text-gray-300 text-[11px] font-bold uppercase tracking-[0.2em]">
                        Developed with ❤️ in Pakistan
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;