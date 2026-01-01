import React from 'react';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

const StoreMenu = ({ store, setView, cart, setCart }) => {
    const products = store?.menu || [];

    const updateQty = (p, change) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === p.id);
            if (exists) {
                const newQty = exists.qty + change;
                if (newQty <= 0) return prev.filter(i => i.id !== p.id);
                return prev.map(i => i.id === p.id ? { ...i, qty: newQty } : i);
            }
            return change > 0 ? [...prev, { ...p, qty: 1 }] : prev;
        });
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="p-6 flex items-center gap-4 max-w-5xl mx-auto w-full">
                <button onClick={() => setView('home')} className="p-3 bg-gray-100 rounded-2xl"><ArrowLeft /></button>
                <div>
                    <h1 className="font-black italic text-3xl">{store?.name}</h1>
                    <p className="text-gray-400 font-bold">{store?.category} • {store?.time} Delivery</p>
                </div>
            </div>

            <main className="max-w-5xl mx-auto w-full p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {products.map(p => {
                        const cartItem = cart.find(item => item.id === p.id);
                        return (
                            <div key={p.id} className="flex items-center justify-between p-5 border rounded-[2.5rem] hover:border-black transition-all">
                                <div className="flex gap-4 items-center">
                                    <img src={p.img} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                    <div>
                                        <h3 className="font-black">{p.name}</h3>
                                        <p className="font-bold text-gray-400 text-sm">Rs. {p.price}</p>
                                    </div>
                                </div>
                                {cartItem ? (
                                    <div className="flex items-center gap-3 bg-black text-white p-2 rounded-2xl">
                                        <button onClick={() => updateQty(p, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-xl"><Minus size={16} /></button>
                                        <span className="font-black text-[#98FF98]">{cartItem.qty}</span>
                                        <button onClick={() => updateQty(p, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-xl"><Plus size={16} /></button>
                                    </div>
                                ) : (
                                    <button onClick={() => updateQty(p, 1)} className="bg-black text-[#98FF98] p-4 rounded-2xl"><Plus size={20} /></button>
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>
        </div>
    );
};

export default StoreMenu;