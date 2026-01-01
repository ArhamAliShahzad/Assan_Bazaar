import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, MapPin, Send } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const CustomOrder = ({ setView }) => {
    const { user } = useAuth();
    const [request, setRequest] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    // CustomOrder.jsx ke submit function mein ye check karein
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check karein ke user login hai ya nahi
        if (!user) return toast.error("Please login first!");

        const orderData = {
            customer: user._id || user.id, // User ID lazmi honi chahiye
            orderType: 'custom',
            customRequest: request,
            address: address,
            totalAmount: 0,
            status: 'pending'
        };

        try {
            const res = await axios.post('http://localhost:5000/api/orders/create', orderData);
            if (res.status === 201) {
                toast.success("Bazaar Task Created!");
                setView('history');
            }
        } catch (err) {
            console.log("Error Detail:", err.response.data); // Ye console mein error check karne ke liye
            toast.error("Server Error: Check Console");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-gray-400 mb-8 font-bold hover:text-black">
                <ArrowLeft size={18} /> Back
            </button>

            <div className="bg-white p-8 rounded-[3rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center gap-4 mb-6">
                    <div className="bg-[#98FF98] p-4 rounded-2xl border-2 border-black">
                        <ShoppingBag size={32} />
                    </div>
                    <div>
                        <h2 className="text-3xl font-black italic uppercase tracking-tighter">Bazaar Task.</h2>
                        <p className="text-xs font-bold text-gray-400">Rider aapke liye bazaar se kuch bhi lay ga!</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-black uppercase mb-2">Kya mangwana hai? (List likhein)</label>
                        <textarea
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            placeholder="e.g. 2 Roti, 1 Dahi ka packet aur 1 chaye ki patti..."
                            className="w-full p-4 rounded-2xl border-2 border-black font-bold h-32 outline-none focus:bg-gray-50"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-black uppercase mb-2">Delivery Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-4 text-gray-400" size={20} />
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Ghar ka pata likhein..."
                                className="w-full p-4 pl-12 rounded-2xl border-2 border-black font-bold outline-none"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-black text-[#98FF98] py-5 rounded-2xl font-black text-xl italic flex items-center justify-center gap-3 hover:scale-[1.02] transition-transform"
                    >
                        {loading ? "Sending..." : "SEND RIDER TO BAZAAR"} <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CustomOrder;