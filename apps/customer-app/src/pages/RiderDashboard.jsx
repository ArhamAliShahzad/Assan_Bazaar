import React, { useState, useEffect } from 'react';
import { LogOut, Bike, MapPin, Package, CheckCircle, RefreshCcw, Navigation, MessageCircle, X, ThumbsUp, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const RiderDashboard = ({ logout }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chatOpen, setChatOpen] = useState(false);
    const [newAmount, setNewAmount] = useState({});

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const res = await axios.get('http://localhost:5000/api/orders/pending');
            setOrders(res.data);
        } catch (err) { toast.error("Orders load nahi ho sakay"); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    // --- Order Status Actions ---
    const handleStatusUpdate = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/update-status/${id}`, { status });
            toast.success(`Order ${status}!`);

            // Agar accept ho jaye to socket room join kar lo
            if (status === 'accepted') {
                socket.emit('join_order', id);
            }

            fetchOrders();
        } catch (err) { toast.error("Update fail ho gayi"); }
    };

    const updateBill = async (orderId) => {
        const amount = newAmount[orderId];
        if (!amount) return toast.error("Price likhein");
        try {
            await axios.put(`http://localhost:5000/api/orders/update-amount/${orderId}`, { totalAmount: amount });
            toast.success("Bill updated!");
            fetchOrders();
        } catch (err) { toast.error("Bill update fail"); }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA]">
            {/* Navbar */}
            <nav className="bg-black p-6 flex justify-between items-center text-white sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="bg-[#98FF98] p-2 rounded-xl text-black"><Bike size={22} /></div>
                    <span className="font-black italic text-2xl uppercase text-[#98FF98]">FLASH<span className="text-white">Rider</span></span>
                </div>
                <div className="flex gap-4">
                    <button onClick={fetchOrders} className="p-3 bg-white/10 rounded-2xl"><RefreshCcw size={20} /></button>
                    <button onClick={logout} className="p-3 bg-red-500/10 text-red-500 rounded-2xl"><LogOut size={20} /></button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto p-6">
                <h2 className="text-4xl font-black italic uppercase mb-8">Active Shipments.</h2>

                <div className="space-y-6">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-8 rounded-[3rem] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-6">

                            <div className="flex flex-col md:flex-row justify-between gap-6">
                                <div className="flex gap-6 items-start">
                                    <div className={`p-6 rounded-[2rem] border-2 border-black ${order.orderType === 'custom' ? 'bg-orange-400' : 'bg-[#98FF98]'}`}>
                                        <Package size={30} />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-2xl italic uppercase">Order #{order._id.slice(-6)}</h4>
                                        <p className="bg-gray-100 p-4 rounded-2xl mt-2 font-bold border-2 border-dashed border-black/20 italic">"{order.customRequest || 'Food Order'}"</p>
                                        <p className="flex items-center gap-2 text-gray-500 font-bold mt-3 underline"><MapPin size={18} /> {order.address}</p>
                                    </div>
                                </div>

                                {/* Bill Box (Only for Accepted) */}
                                {order.status === 'accepted' && (
                                    <div className="bg-gray-50 p-6 rounded-3xl border-2 border-black min-w-[200px]">
                                        <p className="text-[10px] font-black uppercase text-gray-400">Total Bill</p>
                                        <p className="text-3xl font-black italic">Rs.{order.totalAmount}</p>
                                        <div className="mt-4 flex gap-2">
                                            <input
                                                type="number"
                                                className="w-full p-2 rounded-lg border-2 border-black text-sm font-bold"
                                                placeholder="Set Price"
                                                onChange={(e) => setNewAmount({ ...newAmount, [order._id]: e.target.value })}
                                            />
                                            <button onClick={() => updateBill(order._id)} className="bg-black text-[#98FF98] p-2 rounded-lg hover:invert transition-all"><CheckCircle size={18} /></button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons Logic */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t-2 border-black pt-6">
                                {order.status === 'pending' ? (
                                    <>
                                        <button onClick={() => handleStatusUpdate(order._id, 'accepted')} className="bg-[#98FF98] border-4 border-black py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:translate-y-[-2px] transition-all">
                                            <ThumbsUp size={20} /> ACCEPT
                                        </button>
                                        <button onClick={() => handleStatusUpdate(order._id, 'cancelled')} className="bg-red-400 border-4 border-black py-4 rounded-2xl font-black flex items-center justify-center gap-2">
                                            <Trash2 size={20} /> REJECT
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => setChatOpen(true)} className="bg-blue-500 text-white border-4 border-black py-4 rounded-2xl font-black flex items-center justify-center gap-2">
                                                <MessageCircle size={20} /> CHAT
                                            </button>
                                            <button className="bg-yellow-400 border-4 border-black py-4 rounded-2xl font-black flex items-center justify-center gap-2">
                                                <Navigation size={20} /> TRACK
                                            </button>
                                        </div>
                                        <button onClick={() => handleStatusUpdate(order._id, 'delivered')} className="bg-black text-[#98FF98] border-4 border-black py-4 rounded-2xl font-black italic tracking-widest uppercase">
                                            COMPLETE TASK
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default RiderDashboard;