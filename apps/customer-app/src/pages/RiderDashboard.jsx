import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';
import { LogOut, Bike, MapPin, Package, RefreshCw, DollarSign, CheckCircle, XCircle, MessageSquare, Phone } from 'lucide-react';

const socket = io('http://localhost:5000');

const RiderDashboard = ({ user, logout }) => {
    const [marketOrders, setMarketOrders] = useState([]);
    const [myTasks, setMyTasks] = useState([]);
    const [stats, setStats] = useState({ today: 0, total: 0 });
    const [loading, setLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const userId = user?.id || user?._id;
        if (!userId) return;
        try {
            const [m, t] = await Promise.all([
                axios.get('http://localhost:5000/api/orders/market'),
                axios.get(`http://localhost:5000/api/orders/history/${userId}`)
            ]);
            setMarketOrders(m.data);
            setMyTasks(t.data.filter(o => o.status === 'accepted' || o.status === 'picked'));
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    }, [user]);

    useEffect(() => {
        fetchData();
        socket.on('new_order_alert', (newOrder) => {
            setMarketOrders(prev => [newOrder, ...prev]);
            toast.success("New Gig Available!");
        });
        socket.on('order_taken', (id) => {
            setMarketOrders(prev => prev.filter(o => o._id !== id));
        });
        socket.on('order_updated', fetchData);
        return () => {
            socket.off('new_order_alert');
            socket.off('order_taken');
            socket.off('order_updated');
        };
    }, [fetchData]);

    const handleAction = async (id, status) => {
        try {
            await axios.put(`http://localhost:5000/api/orders/update-status/${id}`, {
                status, riderId: user.id || user._id
            });
            toast.success(`Order ${status}!`);
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || "Action failed!");
        }
    };

    const handleSkip = (id) => {
        setMarketOrders(prev => prev.filter(o => o._id !== id));
        toast("Order Skipped", { icon: '🚫' });
    };

    const getOrderTitle = (o) => {
        if (o.orderType === 'custom') return `"${o.customRequest}"`;
        return o.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "Restaurant Order";
    };

    return (
        <div className="min-h-screen bg-[#F8F9FA] pb-24 font-sans italic">
            <nav className="bg-black text-white p-6 sticky top-0 z-50 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-green-500 p-2 rounded-2xl"><Bike size={24} className="text-black" /></div>
                    <span className="font-black text-2xl tracking-tighter uppercase">Flash Rider</span>
                </div>
                <button onClick={logout} className="bg-red-500/20 text-red-500 p-3 rounded-2xl"><LogOut size={20} /></button>
            </nav>

            <main className="max-w-xl mx-auto p-4 md:p-8">
                <h3 className="text-xs font-black text-gray-400 uppercase mb-6 tracking-widest">Active Deliveries</h3>
                {myTasks.map(o => (
                    <div key={o._id} className="bg-black text-white p-8 rounded-[3rem] mb-6 shadow-2xl">
                        <div className="flex justify-between items-start mb-6">
                            <h2 className="text-2xl font-black italic">{getOrderTitle(o)}</h2>
                            <button className="bg-green-500 p-4 rounded-2xl text-black"><MessageSquare size={20} /></button>
                        </div>
                        <div className="space-y-2 mb-8 opacity-70 font-bold">
                            <p className="flex items-center gap-2"><MapPin size={16} /> {o.address}</p>
                            <p className="flex items-center gap-2"><Phone size={16} /> {o.phone}</p>
                        </div>
                        <button onClick={() => handleAction(o._id, 'delivered')} className="w-full bg-white text-black py-5 rounded-[2rem] font-black uppercase italic">Complete Order</button>
                    </div>
                ))}

                <h3 className="text-xs font-black text-gray-400 uppercase mt-12 mb-6 tracking-widest">Marketplace</h3>
                {marketOrders.map(o => (
                    <div key={o._id} className="bg-white p-8 rounded-[3rem] mb-6 border border-gray-100 shadow-xl">
                        <div className="flex justify-between mb-4">
                            <span className="bg-gray-100 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">{o.orderType}</span>
                            <span className="font-black text-2xl italic">Rs.{o.totalAmount}</span>
                        </div>
                        <h2 className="text-xl font-bold mb-8 italic">{getOrderTitle(o)}</h2>
                        <div className="flex gap-3">
                            <button onClick={() => handleSkip(o._id)} className="flex-1 bg-gray-50 text-gray-400 py-4 rounded-2xl font-black text-xs uppercase italic flex items-center justify-center gap-2"><XCircle size={16} /> Skip</button>
                            <button onClick={() => handleAction(o._id, 'accepted')} className="flex-[2] bg-black text-white py-4 rounded-2xl font-black text-xs uppercase italic flex items-center justify-center gap-2 hover:bg-green-500 transition-all"><CheckCircle size={16} /> Accept Gig</button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
};
export default RiderDashboard;