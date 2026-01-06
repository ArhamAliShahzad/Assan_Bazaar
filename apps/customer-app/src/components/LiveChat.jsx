import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, X, MessageSquare } from 'lucide-react';
import { io } from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

const LiveChat = ({ orderId, user, isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const scrollRef = useRef();

    useEffect(() => {
        if (isOpen && orderId) {
            // Room join karein specific order ke liye
            socket.emit('join_chat', orderId);

            // Purani chat load karein backend se
            axios.get(`http://localhost:5000/api/orders/chat/${orderId}`)
                .then(res => setMessages(res.data))
                .catch(err => console.log(err));
        }

        socket.on('new_message', (msg) => {
            setMessages(prev => [...prev, msg]);
        });

        return () => socket.off('new_message');
    }, [isOpen, orderId]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const msgData = { orderId, senderId: user._id, text: input };

        try {
            await axios.post('http://localhost:5000/api/orders/chat/send', msgData);
            setInput('');
        } catch (err) { console.log(err); }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed bottom-10 right-10 w-[400px] h-[600px] bg-white shadow-2xl rounded-[3rem] border border-gray-100 flex flex-col z-[100] overflow-hidden">
            {/* Chat Header */}
            <div className="bg-black p-6 text-white flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center text-black font-black">R</div>
                    <div>
                        <h4 className="font-bold text-sm leading-none">Rider Support</h4>
                        <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest mt-1">Live Now</p>
                    </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all"><X size={20} /></button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.senderId === user._id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-[1.5rem] font-bold text-sm ${m.senderId === user._id ? 'bg-black text-white rounded-tr-none' : 'bg-white border text-black rounded-tl-none'
                            }`}>
                            {m.text}
                        </div>
                    </div>
                ))}
                <div ref={scrollRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t flex items-center gap-2">
                <button className="p-3 text-gray-400 hover:text-black transition-all"><Mic size={20} /></button>
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-100 p-3 rounded-full outline-none font-bold text-sm"
                />
                <button onClick={sendMessage} className="p-3 bg-black text-white rounded-full hover:bg-green-500 transition-all"><Send size={18} /></button>
            </div>
        </div>
    );
};

export default LiveChat;