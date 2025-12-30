import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Bike, ArrowRight, ChevronLeft, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';

const AuthScreen = ({ initialRole, setAuthState }) => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(false); // Toggle state
    const [role, setRole] = useState(initialRole || 'customer');
    const [showPassword, setShowPassword] = useState(false); // Password hide/show

    const [formData, setFormData] = useState({
        name: '',
        identifier: '', // Email ya Phone ke liye
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        const { name, identifier, password } = formData;

        if (!identifier || !password || (!isLogin && !name)) {
            alert("Bhai, saari fields bharein!");
            return;
        }

        setLoading(true);
        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const payload = isLogin
                ? { identifier, password }
                : { name, email: identifier, password, role, phone: identifier }; // Signup mein identifier ko hi use kar rahe hain

            const res = await axios.post(`http://localhost:5000${endpoint}`, payload);

            if (res.data.user) {
                login(res.data.user);
            }
        } catch (err) {
            alert(err.response?.data?.msg || "Kuch ghalat ho gaya!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-8 font-sans">
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-8">
                <button onClick={() => setAuthState('landing')} className="p-2 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={24} />
                </button>
                <div className="flex bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${!isLogin ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                    >SIGNUP</button>
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${isLogin ? 'bg-white shadow-sm' : 'text-gray-400'}`}
                    >LOGIN</button>
                </div>
            </div>

            <img src="/final.png" alt="Logo" className="w-24 mb-6" />

            <div className="w-full max-w-sm">
                <h2 className="text-2xl font-black mb-6 text-center">
                    {isLogin ? 'Welcome Back!' : 'Naya Account Banayein'}
                </h2>

                {/* Role Toggle (Only for Signup) */}
                {!isLogin && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <button onClick={() => setRole('customer')} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${role === 'customer' ? 'border-[#98FF98] bg-[#98FF98]/10' : 'border-gray-50'}`}>
                            <User size={20} /> <span className="text-[10px] font-bold">CUSTOMER</span>
                        </button>
                        <button onClick={() => setRole('rider')} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${role === 'rider' ? 'border-black bg-black text-white' : 'border-gray-50'}`}>
                            <Bike size={20} /> <span className="text-[10px] font-bold">RIDER</span>
                        </button>
                    </div>
                )}

                <div className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Poora Naam"
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}

                    <input
                        type="text"
                        placeholder="Email ya Mobile Number"
                        className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold"
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full p-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-4 text-gray-400"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        onClick={handleAction}
                        disabled={loading}
                        className={`w-full py-5 rounded-2xl font-black shadow-xl transition-all active:scale-95 ${role === 'customer' ? 'bg-[#98FF98]' : 'bg-black text-white'}`}
                    >
                        {loading ? 'Processing...' : (isLogin ? 'LOGIN NOW' : 'CREATE ACCOUNT')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;