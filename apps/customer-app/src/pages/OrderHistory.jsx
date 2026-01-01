import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Package, Clock, CheckCircle2, ArrowLeft, MapPin, Download, MessageSquare } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const OrderHistory = ({ setView, setActiveTrackingId }) => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) return;
            try {
                const userId = user._id || user.id;
                const res = await axios.get(`http://localhost:5000/api/orders/user/${userId}`);
                setOrders(res.data);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchOrders();
    }, [user]);

    // --- Bill Generation Function ---
    const downloadInvoice = (order) => {
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("FLASH DELIVERY - INVOICE", 14, 20);
        doc.setFontSize(10);
        doc.text(`Order ID: #${order._id.toUpperCase()}`, 14, 30);
        doc.text(`Customer: ${user.name || 'User'}`, 14, 35);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleString()}`, 14, 40);

        const tableColumn = ["Description", "Quantity", "Price", "Total"];
        const tableRows = [];

        if (order.orderType === 'custom') {
            tableRows.push(["Bazaar Request: " + order.customRequest, "1", order.totalAmount, order.totalAmount]);
        } else {
            order.items.forEach(item => {
                tableRows.push([item.name, item.qty, `Rs.${item.price}`, `Rs.${item.qty * item.price}`]);
            });
        }

        doc.autoTable(tableColumn, tableRows, { startY: 50, headStyles: { fillColor: [0, 0, 0] } });
        const finalY = doc.lastAutoTable.finalY;
        doc.setFontSize(14);
        doc.text(`Total Amount Paid: Rs.${order.totalAmount}`, 14, finalY + 15);
        doc.save(`Invoice_${order._id.slice(-6)}.pdf`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <button onClick={() => setView('home')} className="flex items-center gap-2 text-gray-400 mb-6 font-bold hover:text-black">
                <ArrowLeft size={18} /> Back to Home
            </button>

            <h2 className="text-4xl font-black italic mb-8 tracking-tighter">My History.</h2>

            {loading ? (
                <p className="text-center font-bold text-gray-400">Fetching records...</p>
            ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed">
                    <p className="text-gray-400 font-black italic">No orders found!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => (
                        <div key={order._id} className="bg-white p-6 rounded-[2.5rem] border flex flex-col gap-4 shadow-sm">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex gap-4 items-center">
                                    <div className={`p-4 rounded-2xl ${order.status === 'delivered' ? 'bg-[#98FF98] text-black' : 'bg-black text-[#98FF98]'}`}>
                                        <Package size={24} />
                                    </div>
                                    <div>
                                        <p className="font-black text-lg italic">
                                            {order.orderType === 'custom' ? 'BAZAAR ORDER' : `ORDER #${order._id.slice(-6).toUpperCase()}`}
                                        </p>
                                        <span className="text-[10px] font-black uppercase flex items-center gap-1">
                                            {order.status === 'delivered' ? <CheckCircle2 size={12} /> : <Clock size={12} />} {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="text-right mr-4">
                                        <p className="text-xl font-black italic">Rs. {order.totalAmount}</p>
                                    </div>
                                    <button onClick={() => downloadInvoice(order)} className="p-3 bg-gray-100 rounded-xl hover:bg-black hover:text-white transition-all" title="Download Bill">
                                        <Download size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* CUSTOM REQUEST DETAILS */}
                            {order.orderType === 'custom' && (
                                <div className="bg-gray-50 p-4 rounded-2xl border-l-4 border-black">
                                    <p className="text-xs font-bold text-gray-400 uppercase">Requirement:</p>
                                    <p className="font-bold italic">"{order.customRequest}"</p>
                                </div>
                            )}

                            {/* ACTION BUTTONS */}
                            <div className="flex gap-2 border-t pt-4">
                                {order.status === 'pending' && (
                                    <>
                                        <button onClick={() => { setActiveTrackingId(order._id); setView('tracking'); }} className="flex-1 bg-black text-[#98FF98] py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 shadow-lg">
                                            <MapPin size={14} /> TRACK RIDER
                                        </button>
                                        <button onClick={() => setView('chat')} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2">
                                            <MessageSquare size={14} /> CHAT WITH RIDER
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderHistory;