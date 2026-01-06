import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Download, ArrowLeft, MessageSquare } from 'lucide-react';

const OrderHistory = ({ setView }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            const id = user?._id || user?.id;
            if (!id) return;
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/history/${id}`);
                setOrders(res.data);
            } catch (err) { console.log(err); }
            finally { setLoading(false); }
        };
        fetchHistory();
    }, [user]);

    return (
        <div className="max-w-2xl mx-auto p-6 italic">
            <button onClick={() => setView('home')} className="flex items-center gap-2 mb-8 font-black text-gray-400 hover:text-black uppercase text-xs tracking-widest">
                <ArrowLeft size={18} /> Back
            </button>
            <h1 className="text-5xl font-black italic mb-10 tracking-tighter">Order History.</h1>

            {loading ? <div className="animate-pulse space-y-4 font-bold">Loading past records...</div> : (
                <div className="space-y-6">
                    {orders.map(o => (
                        <div key={o._id} className="bg-white p-8 rounded-[2.5rem] border-2 border-gray-50 shadow-sm flex justify-between items-center transform hover:scale-[1.02] transition-all">
                            <div className="flex-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                                    {new Date(o.createdAt).toLocaleDateString()} — {o.orderType}
                                </p>
                                <h3 className="font-bold italic text-xl leading-tight">
                                    {o.orderType === 'custom'
                                        ? `"${o.customRequest}"`
                                        : o.items?.map(i => i.name).join(", ") || "Order Items"}
                                </h3>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-2xl italic mb-1">Rs.{o.totalAmount}</p>
                                <span className={`text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${o.status === 'delivered' ? 'bg-green-100 text-green-500' : 'bg-orange-100 text-orange-500'}`}>
                                    {o.status}
                                </span>
                            </div>
                        </div>
                    ))}
                    {orders.length === 0 && <p className="text-center text-gray-400 font-bold italic py-20">No orders found yet.</p>}
                </div>
            )}
        </div>
    );
};
export default OrderHistory;