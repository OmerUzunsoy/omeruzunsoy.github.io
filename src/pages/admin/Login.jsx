import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, User, Shield, Eye, EyeOff, Sparkles, KeyRound, ArrowRight, AlertCircle } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [focusedField, setFocusedField] = useState(null);

    useEffect(() => {
        const authed = localStorage.getItem('admin-auth') === 'true';
        if (authed) {
            navigate('/admin');
        }
    }, [navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const username = formData.username.trim();
        const password = formData.password.trim();

        if (username.length < 3 || password.length < 6) {
            setError('Kullanıcı adı veya şifre çok kısa.');
            setIsSubmitting(false);
            return;
        }

        // Simulated delay for realism
        setTimeout(() => {
            if (username === 'admin' && password === 'admin123') {
                localStorage.setItem('admin-auth', 'true');
                navigate('/admin');
            } else {
                setError('Kullanıcı adı veya şifre hatalı!');
            }
            setIsSubmitting(false);
        }, 800);
    };

    // Floating particles animation
    const particles = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2
    }));

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -30, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
                />

                {/* Floating Particles */}
                {particles.map((particle) => (
                    <motion.div
                        key={particle.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: [0, -100],
                        }}
                        transition={{
                            duration: particle.duration,
                            repeat: Infinity,
                            delay: particle.delay,
                            ease: "easeOut"
                        }}
                        className="absolute rounded-full bg-blue-400/30"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: particle.size,
                            height: particle.size,
                        }}
                    />
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full max-w-md"
            >
                {/* Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 rounded-3xl blur-lg opacity-30 animate-pulse" />
                
                <div className="relative bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-700/50 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", duration: 0.6, delay: 0.2 }}
                            className="relative w-20 h-20 mx-auto mb-6"
                        >
                            {/* Animated Ring */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 border-r-cyan-500"
                            />
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-1 rounded-full border-2 border-transparent border-b-purple-500 border-l-pink-500"
                            />
                            {/* Icon */}
                            <div className="absolute inset-3 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <Shield className="text-white" size={28} />
                            </div>
                        </motion.div>

                        <motion.h1 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-3xl font-bold text-white mb-2"
                        >
                            Admin Panel
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-slate-400 flex items-center justify-center gap-2"
                        >
                            <Sparkles size={16} className="text-cyan-400" />
                            Güvenli giriş alanı
                        </motion.p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10, height: 0 }}
                                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                                    exit={{ opacity: 0, y: -10, height: 0 }}
                                    className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm"
                                >
                                    <AlertCircle size={18} />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Username Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Kullanıcı Adı
                            </label>
                            <div className={`relative transition-all duration-300 ${focusedField === 'username' ? 'scale-[1.02]' : ''}`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === 'username' ? 'opacity-30' : ''}`} />
                                <div className="relative">
                                    <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'username' ? 'text-cyan-400' : 'text-slate-500'}`} size={20} />
                                    <input
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                        onFocus={() => setFocusedField('username')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="Kullanıcı adınızı girin"
                                        required
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Password Field */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Şifre
                            </label>
                            <div className={`relative transition-all duration-300 ${focusedField === 'password' ? 'scale-[1.02]' : ''}`}>
                                <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-0 transition-opacity ${focusedField === 'password' ? 'opacity-30' : ''}`} />
                                <div className="relative">
                                    <KeyRound className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focusedField === 'password' ? 'text-cyan-400' : 'text-slate-500'}`} size={20} />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        onFocus={() => setFocusedField('password')}
                                        onBlur={() => setFocusedField(null)}
                                        className="w-full pl-12 pr-12 py-3.5 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Submit Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="relative w-full group"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:from-blue-600/50 disabled:to-cyan-500/50 text-white font-semibold py-3.5 rounded-xl transition-all">
                                    {isSubmitting ? (
                                        <>
                                            <motion.div
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                            />
                                            <span>Giriş yapılıyor...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Giriş Yap</span>
                                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </div>
                            </button>
                        </motion.div>

                        {/* Demo Credentials */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="pt-4 border-t border-slate-700/50"
                        >
                            <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                                <Lock size={12} />
                                <span>Demo: </span>
                                <code className="px-2 py-0.5 bg-slate-800 rounded text-cyan-400">admin</code>
                                <span>/</span>
                                <code className="px-2 py-0.5 bg-slate-800 rounded text-cyan-400">admin123</code>
                            </div>
                        </motion.div>
                    </form>
                </div>
            </motion.div>

            {/* Version Badge */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-600"
            >
                Admin Panel v2.0
            </motion.div>
        </div>
    );
};

export default Login;
