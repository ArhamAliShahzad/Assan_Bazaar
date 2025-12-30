import React from 'react';
import { X, MapPin, CreditCard } from 'lucide-react';

const Checkout = ({ cart, setView, setCart }) => {
    const total = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-10">
            <nav className="bg-white border-b p-6 sticky top-0 z-50">
                <div className="max-w-5xl mx-auto flex items-center gap-4 text-black">
                    <button onClick={() => setView('menu')} className="p-2 hover:bg-gray-100 rounded-full"><X /></button>
                    <h2 className="text-xl font-black italic">Finalize Order</h2>
                </div>
            </nav>
            <div className="max-w-5xl mx-auto p-6 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border text-black">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2"><MapPin className="text-[#98FF98]" /> Delivery Address</h3>
                        <div className="space-y-4">
                            <input type="text" placeholder="House / Street" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-[#98FF98]" />
                            <input type="tel" placeholder="Mobile Number" className="w-full p-4 bg-gray-50 rounded-2xl border-none font-bold outline-none focus:ring-2 focus:ring-[#98FF98]" />
                        </div>
                    </div>
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border text-black">
                        <h3 className="text-xl font-black mb-6 flex items-center gap-2"><CreditCard className="text-[#98FF98]" /> Payment</h3>
                        <div className="p-4 bg-[#98FF98]/10 border-2 border-[#98FF98] rounded-2xl font-bold">Cash on Delivery</div>
                    </div>
                </div>
                <div className="bg-black text-white p-8 rounded-[3rem] shadow-2xl h-fit sticky top-28">
                    <h3 className="text-xl font-black mb-6 text-[#98FF98]">Total Bill</h3>
                    <div className="flex justify-between text-2xl font-black border-t border-gray-800 pt-4">
                        <span>Total</span><span>Rs. {total + 50}</span>
                    </div>
                    <button onClick={() => { alert('Order Success!'); setView('home'); setCart([]); }} className="w-full bg-[#98FF98] text-black py-5 rounded-2xl font-black mt-8 hover:scale-105 transition-all">ORDER NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;