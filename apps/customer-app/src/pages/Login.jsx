import React from 'react';
import { ShoppingBag, ArrowRight, Bike } from 'lucide-react';

const Login = ({ setAuthState, setSelectedRole }) => {
    const handleChoice = (role) => {
        setSelectedRole(role);
        setAuthState('auth-form');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
            <div className="hidden md:flex md:w-1/2 bg-black text-white items-center justify-center p-12">
                <div className="max-w-md">
                    <div className="w-20 h-20 bg-[#98FF98] rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                        <ShoppingBag size={40} className="text-black" />
                    </div>
                    <h1 className="text-6xl font-black tracking-tighter mb-4 italic text-[#98FF98]">Aasaan Bazar.</h1>
                    <p className="text-xl text-gray-400 font-medium">Pakistan ka sabse tez marketplace.</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center p-8">
                <div className="w-full max-w-sm">
                    <h2 className="text-3xl font-black mb-8">Chaliye Shuru Karein!</h2>
                    <div className="space-y-4">
                        <button onClick={() => handleChoice('customer')} className="w-full bg-black text-white p-6 rounded-3xl font-bold flex justify-between items-center hover:scale-105 transition-all">
                            Customer Portal <ArrowRight className="text-[#98FF98]" />
                        </button>
                        <button onClick={() => handleChoice('rider')} className="w-full bg-white border-2 border-gray-100 text-black p-6 rounded-3xl font-bold flex justify-between items-center hover:border-black transition-all">
                            Rider Portal <Bike />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;