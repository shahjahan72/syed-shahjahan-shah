import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    // Attempt to verify the token against the server (minimal check)
    try {
      const resp = await fetch('/api/admin-orders', { headers: { Authorization: `Bearer ${token}` } });
      const body = await resp.json();
      if (!resp.ok) throw new Error(body.error || 'Unauthorized');
      // Verified: store token in sessionStorage for the admin UI session
      sessionStorage.setItem('ADMIN_TOKEN', token);
      navigate('/admin/orders');
    } catch (err) {
      alert('Invalid admin token. Please check the token and try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 soft-shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <p className="text-sm text-gray-600 mb-6">Enter the admin token to access order management.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="password" placeholder="Admin Token" value={token} onChange={e => setToken(e.target.value)} className="w-full border-b py-3 outline-none" />
          <div className="flex gap-3">
            <button type="submit" className="bg-brand-black text-white px-4 py-3 rounded">Enter</button>
            <button type="button" onClick={() => { setToken(''); sessionStorage.removeItem('ADMIN_TOKEN'); }} className="px-4 py-3 border rounded">Clear</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
