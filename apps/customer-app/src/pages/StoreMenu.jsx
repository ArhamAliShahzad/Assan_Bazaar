import React from 'react';
import { ArrowLeft, ShoppingCart, Plus, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => (
    <footer className="bg-white border-t p-12 mt-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 text-left">
            <div className="col-span-2">
                <h3 className="text-2xl font-black italic mb-4">Aasaan.</h3>
                <p className="text-gray-400 font-medium">Fastest delivery in Lahore.</p>
            </div>
        </div>
    </footer>
);

const StoreMenu = ({ store, setView, cart, setCart }) => {
    const products = store?.menu || [];
    const addToCart = (p) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === p.id);
            if (exists) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...p, qty: 1 }];
        });
    };

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md p-4 flex items-center justify-between border-b">
                <button onClick={() => setView('home')} className="p-2 hover:bg-gray-100 rounded-full"><ArrowLeft /></button>
                <h1 className="font-black italic text-xl">{store?.name}</h1>
                <ShoppingCart onClick={() => setView('cart')} className="cursor-pointer" />
            </div>

            <main className="flex-grow max-w-5xl mx-auto w-full p-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {products.map(p => (
                        <div key={p.id} className="flex items-center justify-between p-4 border rounded-3xl">
                            <div className="flex gap-4 items-center">
                                <img src={p.img} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                                <div><h3 className="font-black">{p.name}</h3><p className="font-bold text-gray-400">Rs. {p.price}</p></div>
                            </div>
                            <button onClick={() => addToCart(p)} className="bg-black text-[#98FF98] p-3 rounded-2xl"><Plus size={20} /></button>
                        </div>
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    );
};
export default StoreMenu;