import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const AuthPage = () => {
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegisterPassword, setShowRegisterPassword] = useState(false);
    const [loginData, setLoginData] = useState({ email: '', password: '', remember: false });
    const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

    const handleLogin = (e) => {
        e.preventDefault();
        // Handle login logic - integrate with your backend
        // TODO: Implement backend authentication
        alert('Login functionality would connect to your backend here.');
    };

    const handleRegister = (e) => {
        e.preventDefault();
        // Handle register logic - integrate with your backend
        console.log('Register:', registerData);
        alert('Registration functionality would connect to your backend here.');
    };

    return (
        <div className="min-h-screen bg-white pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Login Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-8">LOGIN</h2>
                        
                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username or email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showLoginPassword ? 'text' : 'password'}
                                        required
                                        value={loginData.password}
                                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showLoginPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="px-8 py-3 bg-[#00A19D] text-white font-bold rounded-md hover:bg-[#008B87] transition-colors"
                                >
                                    LOG IN
                                </button>
                                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={loginData.remember}
                                        onChange={(e) => setLoginData({ ...loginData, remember: e.target.checked })}
                                        className="w-4 h-4 border-gray-300 rounded text-[#00A19D] focus:ring-[#00A19D]"
                                    />
                                    Remember me
                                </label>
                            </div>

                            <div>
                                <a href="#" className="text-sm text-gray-600 hover:text-[#00A19D] transition-colors">
                                    Lost your password?
                                </a>
                            </div>
                        </form>
                    </motion.div>

                    {/* Register Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:border-l lg:border-gray-200 lg:pl-20"
                    >
                        <h2 className="text-3xl font-black text-gray-900 mb-8">REGISTER</h2>
                        
                        <form onSubmit={handleRegister} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={registerData.username}
                                    onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={registerData.email}
                                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showRegisterPassword ? 'text' : 'password'}
                                        required
                                        value={registerData.password}
                                        onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#00A19D] focus:border-transparent outline-none transition-all pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                    >
                                        {showRegisterPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600">
                                Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our privacy policy.
                            </p>

                            <button
                                type="submit"
                                className="px-8 py-3 bg-[#00A19D] text-white font-bold rounded-md hover:bg-[#008B87] transition-colors"
                            >
                                REGISTER
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
