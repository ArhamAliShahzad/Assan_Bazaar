import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, Send, Phone, Mic, MicOff, ShieldCheck } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CustomOrder = ({ setView }) => {
    const { user } = useAuth();
    const [request, setRequest] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);

    // --- Voice Search Logic ---
    const handleVoiceSearch = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) return toast.error("Browser doesn't support Voice Search");

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.onstart = () => { setIsListening(true); toast("Listening...", { icon: '🎤' }); };
        recognition.onresult = (e) => { setRequest(prev => prev + " " + e.results[0][0].transcript); setIsListening(false); };
        recognition.onerror = () => setIsListening(false);
        recognition.start();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error("Please login first!");
        if (!request || !address || !phone) return toast.error("Please fill all fields!");

        setLoading(true);
        try {
            const orderData = {
                customer: user._id || user.id,
                orderType: 'custom',
                customRequest: request,
                address: address,
                phone: phone,
                totalAmount: 250, // Base delivery fee
                status: 'pending'
            };

            const res = await axios.post('http://localhost:5000/api/orders/create', orderData);
            if (res.status === 201 || res.status === 200) {
                toast.success("Rider Notified! Order Placed.");
                setView('history');
            }
        } catch (err) {
            console.error("Order Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Something went wrong!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex items-center justify-center p-4 md:p-8 font-sans">
            <div className="w-full max-w-5xl bg-white shadow-2xl rounded-[3rem] border border-gray-50 flex flex-col md:flex-row overflow-hidden min-h-[600px]">

                {/* Desktop Left Sidebar */}
                <div className="md:w-1/3 bg-black p-10 text-white flex flex-col justify-between">
                    <div>
                        <button onClick={() => setView('home')} className="mb-10 flex items-center gap-2 text-gray-400 hover:text-white transition-all font-bold">
                            <ArrowLeft size={20} /> BACK
                        </button>
                        <h1 className="text-6xl font-black italic tracking-tighter leading-tight">FLASH<br />BAZAAR.</h1>
                        <p className="mt-4 text-gray-400 font-medium italic">"Anything you need, just speak or type."</p>
                    </div>
                    <div className="flex items-center gap-2 text-green-400 text-[10px] font-black tracking-widest uppercase">
                        <ShieldCheck size={16} /> Instant Support Enabled
                    </div>
                </div>

                {/* Form Section */}
                <div className="md:w-2/3 p-8 md:p-16">
                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* 1. Request Box (Top Priority) */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">1. What do you need? (Request)</label>
                            <div className="relative group">
                                <textarea
                                    value={request}
                                    onChange={(e) => setRequest(e.target.value)}
                                    placeholder="e.g. 5 Roti and 1kg Fresh Dahi..."
                                    className="w-full bg-gray-50 border-2 border-transparent focus:border-black focus:bg-white rounded-[2rem] p-8 text-2xl font-bold italic outline-none transition-all h-48 resize-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleVoiceSearch}
                                    className={`absolute right-6 bottom-6 p-4 rounded-full shadow-xl transition-all ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-black text-white hover:bg-green-500'}`}
                                >
                                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                                </button>
                            </div>
                        </div>

                        {/* 2. Address & Phone (Grid) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">2. Delivery Address</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl p-4 border-2 border-transparent focus-within:border-black transition-all">
                                    <MapPin className="text-gray-300 mr-3" size={20} />
                                    <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" placeholder="Enter full address" className="bg-transparent w-full font-bold outline-none" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">3. Phone Number</label>
                                <div className="flex items-center bg-gray-50 rounded-2xl p-4 border-2 border-transparent focus-within:border-black transition-all">
                                    <Phone className="text-gray-300 mr-3" size={20} />
                                    <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" placeholder="03xx-xxxxxxx" className="bg-transparent w-full font-bold outline-none" />
                                </div>
                            </div>
                        </div>

                        {/* Action Button */}
                        <button
                            disabled={loading}
                            className="w-full bg-black text-white py-6 rounded-full font-black text-xl tracking-tighter hover:bg-green-500 hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
                        >
                            {loading ? "SEARCHING RIDER..." : "PLACE CUSTOM ORDER"}
                            <Send size={22} className="group-hover:translate-x-2 transition-all" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomOrder;