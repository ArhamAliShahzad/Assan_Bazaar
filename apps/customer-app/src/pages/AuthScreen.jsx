import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Bike, ArrowRight, ChevronLeft, Eye, EyeOff, Mail, Lock, Globe } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthScreen = ({ initialRole, setAuthState }) => {
    const { login } = useAuth();
    const [isLogin, setIsLogin] = useState(false);
    const [role, setRole] = useState(initialRole || 'customer');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        identifier: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    const handleAction = async () => {
        const { name, identifier, password } = formData;
        if (!identifier || !password || (!isLogin && !name)) {
            toast.error("Meharbani karke saari fields bharein!");
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
                toast.success(isLogin ? "Welcome Back! 👋" : "Khush Amdeed! Account ban gaya. 🎉");
            }
        } catch (err) {
            toast.dismiss(loadToast);
            toast.error(err.response?.data?.msg || "Oho! Kuch ghalat ho gaya.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
            {/* Background Decorative Circles */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#98FF98]/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-black/5 rounded-full blur-3xl"></div>

            {/* Main Content Card */}
            <div className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-[2.5rem] shadow-2xl border border-white p-8 relative z-10">

                {/* Header: Back Button & Toggle */}
                <div className="flex justify-between items-center mb-10">
                    <button onClick={() => setAuthState('landing')} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-all">
                        <ChevronLeft size={20} />
                    </button>
                    <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                        <button onClick={() => setIsLogin(false)} className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${!isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>JOIN</button>
                        <button onClick={() => setIsLogin(true)} className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${isLogin ? 'bg-white shadow-sm text-black' : 'text-gray-400'}`}>LOGIN</button>
                    </div>
                </div>

                {/* Logo & Welcome Text */}
                <div className="text-center mb-8">
                    <div className="inline-block p-4 bg-black rounded-3xl mb-4 shadow-xl rotate-3">
                        <Globe className="text-[#98FF98]" size={32} />
                    </div>
                    <h2 className="text-3xl font-black italic tracking-tighter">Aasaan Bazar.</h2>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-1">
                        {isLogin ? 'Welcome Back Partner' : 'Create Partner Account'}
                    </p>
                </div>

                {/* Role Toggle (Signup Only) */}
                {!isLogin && (
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button onClick={() => setRole('customer')} className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${role === 'customer' ? 'border-[#98FF98] bg-[#98FF98]/5 text-black' : 'border-gray-50 text-gray-400'}`}>
                            <User size={18} /> <span className="text-[10px] font-black uppercase">Customer</span>
                        </button>
                        <button onClick={() => setRole('rider')} className={`py-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all ${role === 'rider' ? 'border-black bg-black text-white shadow-lg' : 'border-gray-50 text-gray-400'}`}>
                            <Bike size={18} /> <span className="text-[10px] font-black uppercase">Rider</span>
                        </button>
                    </div>
                )}

                {/* Form Fields */}
                <div className="space-y-4">
                    {!isLogin && (
                        <div className="relative">
                            <User className="absolute left-4 top-4 text-gray-300" size={20} />
                            <input type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold text-sm transition-all"
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>
                    )}

                    <div className="relative">
                        <Mail className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input type="text" placeholder="Email or Phone Number" className="w-full pl-12 pr-4 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold text-sm transition-all"
                            onChange={(e) => setFormData({ ...formData, identifier: e.target.value })} />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-4 text-gray-300" size={20} />
                        <input type={showPassword ? "text" : "password"} placeholder="Password"
                            className="w-full pl-12 pr-12 py-4 bg-gray-50 rounded-2xl outline-none focus:ring-2 focus:ring-[#98FF98] font-bold text-sm transition-all"
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                        <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-4 text-gray-300 hover:text-black transition-colors">
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <button onClick={handleAction} disabled={loading}
                        className={`w-full py-5 rounded-2xl font-black shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3 mt-4 ${role === 'customer' ? 'bg-[#98FF98] text-black hover:bg-[#7fff7f]' : 'bg-black text-[#98FF98] hover:bg-gray-900'}`}>
                        {loading ? 'PLEASE WAIT...' : (isLogin ? 'CONTINUE' : 'GET STARTED')}
                        {!loading && <ArrowRight size={20} />}
                    </button>
                </div>
            </div>

            {/* Footer Text */}
            <p className="mt-8 text-gray-400 text-[10px] font-bold uppercase tracking-widest relative z-10">
                Safe & Secure Payments • Aasaan Bazar 2024
            </p>
        </div>
    );
};

export default AuthScreen;