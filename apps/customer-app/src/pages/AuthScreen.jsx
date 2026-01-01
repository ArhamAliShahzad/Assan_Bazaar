// src/pages/AuthScreen.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Bike, ArrowRight, ChevronLeft, Eye, EyeOff, Mail, Lock, Globe } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthScreen = ({ initialRole, setAuthState }) => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(true); // Default login rakha hai
    const [role, setRole] = useState(initialRole || 'customer');
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ name: '', identifier: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        const { name, identifier, password } = formData;
        if (!identifier || !password || (!isLogin && !name)) {
            toast.error("Oho! Saari fields bharna lazmi hain.");
            return;
        }

        setLoading(true);
        const loadToast = toast.loading(isLogin ? "Bhai, login ho raha hai..." : "Account ban raha hai...");

        try {
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const payload = isLogin
                ? { identifier, password }
                : { name, email: identifier, password, role, phone: identifier };

            const res = await axios.post(`http://localhost:5000${endpoint}`, payload);

            if (res.data.user) {
                toast.dismiss(loadToast);
                login(res.data.user);
                toast.success(isLogin ? "Welcome Back! 👋" : "Khush Amdeed! 🎉");
            }
        } catch (err) {
            toast.dismiss(loadToast);
            toast.error(err.response?.data?.msg || "Kuch ghalat ho gaya. Detail check karein.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Back Button */}
                <button onClick={() => setAuthState('landing')} className="mb-8 p-3 bg-gray-50 rounded-2xl hover:bg-black hover:text-white transition-all">
                    <ChevronLeft size={20} />
                </button>

                <div className="text-left mb-10">
                    <h2 className="text-5xl font-black italic tracking-tighter mb-2">
                        {isLogin ? 'Login.' : 'Signup.'}
                    </h2>
                    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">
                        {role === 'customer' ? 'Customer Portal' : 'Rider Network'}
                    </p>
                </div>

                {/* Role Switcher (Sign up only) */}
                {!isLogin && (
                    <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
                        <button onClick={() => setRole('customer')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${role === 'customer' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>CUSTOMER</button>
                        <button onClick={() => setRole('rider')} className={`flex-1 py-3 rounded-xl font-black text-[10px] transition-all ${role === 'rider' ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>RIDER</button>
                    </div>
                )}

                <div className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text" placeholder="Full Name"
                            className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98] border-none"
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    )}
                    <input
                        type="text" placeholder="Email or Phone"
                        className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98] border-none"
                        onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"} placeholder="Password"
                            className="w-full p-5 bg-gray-50 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-[#98FF98] border-none"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-black">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button
                        onClick={handleAction}
                        disabled={loading}
                        className="w-full bg-black text-[#98FF98] py-5 rounded-[2rem] font-black text-lg hover:scale-[1.02] active:scale-95 transition-all shadow-xl mt-4"
                    >
                        {loading ? 'WAIT...' : (isLogin ? 'GO TO DASHBOARD' : 'CREATE ACCOUNT')}
                    </button>

                    <p className="text-center mt-6 font-bold text-gray-400 text-sm">
                        {isLogin ? "Naye ho yahan?" : "Pehle se account hai?"}
                        <span onClick={() => setIsLogin(!isLogin)} className="text-black underline ml-2 cursor-pointer">
                            {isLogin ? 'Signup karein' : 'Login karein'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthScreen;