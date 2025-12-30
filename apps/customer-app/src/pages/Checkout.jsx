import React, { useState } from 'react';
import { ShieldCheck, MapPin, Wallet, Smartphone, Landmark, CheckCircle } from 'lucide-react';

const Checkout = ({ cart, setView, setCart }) => {
    const [method, setMethod] = useState('cod');
    const [ordered, setOrdered] = useState(false);

    const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    const delivery = 99;
    const total = subtotal + delivery;

    if (ordered) return (
        <div className="min-h-screen bg-black flex flex-center items-center justify-center p-6">
            <div className="text-center">
                <div className="bg-[#98FF98] w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={48} className="text-black" />
                </div>
                <h2 className="text-4xl font-black text-white italic">ORDER PLACED!</h2>
                <p className="text-gray-400 font-bold mt-2 uppercase tracking-widest">Rider is on the way to the store</p>
                <button onClick={() => { setView('home'); setCart([]); }} className="mt-10 bg-white text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest">Back to Home</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6 md:p-12 grid md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-4xl font-black italic mb-8">Secure Checkout</h2>

                    {/* Address Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-3"><MapPin className="text-[#98FF98]" /> Delivery Info</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <input className="col-span-2 p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98]" placeholder="Street Address / Building" />
                            <input className="p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98]" placeholder="Floor / House No." />
                            <input className="p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98]" placeholder="Mobile Number" />
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-3"><Wallet className="text-[#98FF98]" /> Payment Method</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { id: 'cod', name: 'Cash on Delivery', icon: <Wallet size={20} /> },
                                { id: 'easy', name: 'EasyPaisa', icon: <Smartphone size={20} /> },
                                { id: 'jazz', name: 'JazzCash', icon: <Smartphone size={20} /> },
                                { id: 'bank', name: 'Bank Transfer', icon: <Landmark size={20} /> }
                            ].map(m => (
                                <button key={m.id} onClick={() => setMethod(m.id)} className={`p-6 rounded-[2rem] border-2 flex items-center gap-4 transition-all ${method === m.id ? 'border-black bg-black text-white shadow-xl' : 'border-gray-100 hover:border-gray-200'}`}>
                                    {m.icon} <span className="font-black text-xs uppercase tracking-widest">{m.name}</span>
                                </button>
                            ))}
                        </div>
                        {method !== 'cod' && (
                            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-[#98FF98]">
                                <p className="text-[10px] font-black uppercase text-gray-400 mb-2">Account Details</p>
                                <p className="font-black text-sm">Send amount to: 0300-1234567</p>
                                <p className="text-xs font-bold text-gray-500 mt-1 italic">*Attach screenshot in chat after order</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Bill Card */}
                <div className="h-fit sticky top-10">
                    <div className="bg-black text-white p-8 rounded-[3rem] shadow-2xl">
                        <div className="flex items-center gap-2 mb-8 bg-[#98FF98]/10 w-fit px-4 py-2 rounded-full">
                            <ShieldCheck className="text-[#98FF98]" size={16} />
                            <span className="text-[10px] font-black text-[#98FF98] uppercase">Secure Gateway</span>
                        </div>
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between font-bold text-gray-400"><span>Subtotal</span><span>Rs. {subtotal}</span></div>
                            <div className="flex justify-between font-bold text-gray-400"><span>Delivery Fee</span><span>Rs. {delivery}</span></div>
                            <div className="flex justify-between font-bold text-gray-400"><span>Service Fee</span><span>Rs. 25</span></div>
                            <div className="h-[1px] bg-gray-800 my-4"></div>
                            <div className="flex justify-between font-black text-2xl text-[#98FF98]"><span>Total</span><span>Rs. {total + 25}</span></div>
                        </div>
                        <button onClick={() => setOrdered(true)} className="w-full bg-[#98FF98] text-black py-6 rounded-2xl font-black text-lg hover:scale-105 active:scale-95 transition-all">PLACE ORDER</button>
                    </div>
                    <button onClick={() => setView('menu')} className="w-full text-center mt-6 font-black text-gray-400 text-xs uppercase tracking-widest hover:text-black">Modify Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;