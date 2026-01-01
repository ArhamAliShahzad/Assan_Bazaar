import React, { useState, useEffect } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const socket = io('http://localhost:5000');

const Chat = ({ setView, orderId }) => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        if (!orderId) return;

        // Room join karein
        socket.emit('join_chat', orderId);

        // Receive Message
        socket.on('receive_message', (msg) => {
            setMessages((prev) => [...prev, msg]);
        });

        return () => socket.off('receive_message');
    }, [orderId]);

    const handleSend = () => {
        if (!text.trim()) return;

        const msgData = {
            orderId,
            text,
            sender: user.role, // 'customer' ya 'rider'
            time: new Date()
        };

        socket.emit('send_message', msgData);
        setMessages((prev) => [...prev, msgData]);
        setText('');
    };

    return (
        <div className="max-w-2xl mx-auto h-[90vh] flex flex-col p-4">
            <div className="flex items-center gap-4 mb-4">
                <button onClick={() => setView('history')} className="bg-black text-white p-2 rounded-xl"><ArrowLeft /></button>
                <h2 className="text-2xl font-black italic uppercase tracking-tighter">Live Support.</h2>
            </div>

            <div className="flex-grow bg-white rounded-[3rem] border-4 border-black p-6 overflow-y-auto space-y-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.sender === user.role ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-4 rounded-2xl font-bold border-2 border-black ${m.sender === user.role ? 'bg-black text-[#98FF98] rounded-tr-none' : 'bg-gray-100 text-black rounded-tl-none'}`}>
                            {m.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 flex gap-3">
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your message..."
                    className="flex-1 p-5 rounded-2xl border-4 border-black font-black outline-none focus:bg-gray-50"
                />
                <button onClick={handleSend} className="bg-[#98FF98] p-5 rounded-2xl border-4 border-black hover:bg-black hover:text-[#98FF98] transition-all">
                    <Send size={24} />
                </button>
            </div>
        </div>
    );
};

export default Chat;