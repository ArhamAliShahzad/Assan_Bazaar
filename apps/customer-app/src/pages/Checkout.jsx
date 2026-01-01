import React, { useState } from 'react';
import { MapPin, CheckCircle, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Checkout = ({ cart, setView, setCart }) => {
    const { user } = useAuth();
    const [ordered, setOrdered] = useState(false);
    const [address, setAddress] = useState({ street: '', phone: '' });
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const total = subtotal + 99 + 25;

    const handleOrder = async () => {
        // Validation
        if (!address.street || address.phone.length < 11) {
            toast.error("Valid address aur phone number (11 digits) lazmi hai!");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Placing your order...");

        try {
            const orderPayload = {
                customer: user._id || user.id, // Linking order to logged-in user
                items: cart.map(i => ({
                    name: i.name,
                    qty: i.qty,
                    price: i.price
                })),
                totalAmount: total,
                address: address.street,
                phone: address.phone,
                status: 'pending'
            };

            const response = await axios.post('http://localhost:5000/api/orders/create', orderPayload);

            if (response.status === 201 || response.status === 200) {
                toast.success("Mubarak ho! Order place ho gaya.", { id: loadingToast });
                setOrdered(true);
                // Cart tab khali karein jab order confirm ho jaye
            }
        } catch (err) {
            console.error("Order Error:", err);
            toast.error(err.response?.data?.message || "Order fail ho gaya! Server check karein.", { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    if (ordered) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-center p-6">
            <div className="animate-in zoom-in duration-500">
                <CheckCircle size={100} className="text-[#98FF98] mx-auto mb-6" />
                <h2 className="text-5xl font-black text-white italic tracking-tighter">ORDER PLACED!</h2>
                <p className="text-gray-400 mt-2 font-bold uppercase tracking-widest">Aapka khana raste mein hai.</p>
                <button
                    onClick={() => { setView('home'); setCart([]); }}
                    className="mt-10 bg-[#98FF98] px-12 py-5 rounded-[2rem] font-black text-black hover:scale-105 active:scale-95 transition-all shadow-[0_0_30px_rgba(152,255,152,0.3)]"
                >
                    BACK TO HOME
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                    <button onClick={() => setView('home')} className="flex items-center gap-2 font-bold text-gray-500 hover:text-black transition-colors">
                        <ArrowLeft size={18} /> Back to Shop
                    </button>
                    <h2 className="text-5xl font-black italic tracking-tighter">Checkout.</h2>

                    {/* Address Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm space-y-4 border-gray-100">
                        <h3 className="font-black flex items-center gap-2 text-lg uppercase tracking-tight">
                            <MapPin className="text-[#98FF98]" /> Delivery Details
                        </h3>
                        <input
                            className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black border-none font-bold"
                            placeholder="Complete Street Address & House #"
                            onChange={e => setAddress({ ...address, street: e.target.value })}
                        />
                        <input
                            type="tel"
                            className="w-full p-5 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-black border-none font-bold"
                            placeholder="Phone Number (03xxxxxxxxx)"
                            onChange={e => setAddress({ ...address, phone: e.target.value })}
                        />
                    </div>

                    {/* Order Summary Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] border shadow-sm border-gray-100">
                        <h3 className="font-black mb-6 text-lg uppercase tracking-tight">Your Basket</h3>
                        <div className="space-y-4">
                            {cart.length === 0 ? (
                                <p className="text-gray-400 font-bold italic text-center py-4">Aapki basket khali hai!</p>
                            ) : (
                                cart.map(item => (
                                    <div key={item.id} className="flex justify-between items-center py-4 border-b border-dashed border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <span className="bg-black text-[#98FF98] text-[10px] font-black px-2 py-1 rounded-md">{item.qty}x</span>
                                            <span className="font-bold text-gray-800">{item.name}</span>
                                        </div>
                                        <span className="font-black text-gray-400 font-mono">Rs. {item.price * item.qty}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side Billing Card */}
                <div className="h-fit sticky top-10">
                    <div className="bg-black text-white p-8 rounded-[3rem] shadow-2xl border border-white/5">
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400 font-bold"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
                            <div className="flex justify-between text-gray-400 font-bold"><span>Delivery Fee</span><span>Rs. 99</span></div>
                            <div className="flex justify-between text-gray-400 font-bold"><span>Service Fee</span><span>Rs. 25</span></div>
                            <div className="flex justify-between font-black text-3xl text-[#98FF98] border-t border-white/10 pt-6 mt-4">
                                <span>Total</span>
                                <span className="font-mono">Rs. {total}</span>
                            </div>
                        </div>
                        <button
                            disabled={loading || cart.length === 0}
                            onClick={handleOrder}
                            className="w-full bg-[#98FF98] text-black py-6 rounded-2xl font-extrabold text-xl shadow-[0_10px_30px_rgba(152,255,152,0.2)] hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:grayscale uppercase"
                        >
                            {loading ? "Processing..." : "Confirm Order"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;