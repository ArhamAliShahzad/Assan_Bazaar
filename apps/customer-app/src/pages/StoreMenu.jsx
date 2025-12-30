import React from 'react';
import { ArrowRight, Plus } from 'lucide-react';

const StoreMenu = ({ store, setView, cart, setCart }) => {
    const menuItems = [
        { id: 101, name: "Zinger Burger", price: 550, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500", desc: "Crispy chicken" },
        { id: 102, name: "Special Pizza", price: 1250, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500", desc: "Cheese loaded" },
    ];

    const addToCart = (item) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) return prev.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...item, qty: 1 }];
        });
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            <nav className="bg-white p-6 sticky top-0 z-50 border-b flex items-center justify-between px-8">
                <button onClick={() => setView('home')} className="flex items-center gap-2 font-black text-sm"><ArrowRight size={18} className="rotate-180" /> BACK</button>
                <h2 className="text-lg font-black">{store?.name}</h2>
                <div className="w-10"></div>
            </nav>
            <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    <div className="h-64 rounded-[3rem] overflow-hidden mb-8 shadow-xl">
                        <img src={store?.img} className="w-full h-full object-cover" alt="" />
                    </div>
                    <h3 className="text-2xl font-black mb-6">Menu Items</h3>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {menuItems.map(item => (
                            <div key={item.id} className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-4">
                                <img src={item.img} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                <div className="flex-1">
                                    <h4 className="font-bold">{item.name}</h4>
                                    <p className="text-xs text-gray-400">Rs. {item.price}</p>
                                    <button onClick={() => addToCart(item)} className="mt-2 bg-[#98FF98] p-1.5 rounded-lg"><Plus size={16} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border h-fit sticky top-28">
                    <h3 className="text-xl font-black mb-6 text-black">Cart Summary</h3>
                    {cart.length === 0 ? <p className="text-gray-400 font-bold text-center">Empty</p> : (
                        <div className="space-y-4">
                            {cart.map(i => <div key={i.id} className="flex justify-between font-bold text-sm text-black"><span>{i.qty}x {i.name}</span><span>Rs.{i.price * i.qty}</span></div>)}
                            <button onClick={() => setView('checkout')} className="w-full bg-black text-[#98FF98] py-4 rounded-2xl font-black mt-4">CHECKOUT</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StoreMenu;