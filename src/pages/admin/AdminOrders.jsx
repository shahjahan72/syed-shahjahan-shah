import React, { useEffect, useState } from 'react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  // Filters & pagination state
  const [queryOrderId, setQueryOrderId] = useState('');
  const [queryPhone, setQueryPhone] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [meta, setMeta] = useState({ total: 0, page: 1, perPage: 20 });

  const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('ADMIN_TOKEN') : null);

  const fetchOrders = async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (opts.orderId || queryOrderId) params.set('orderId', opts.orderId || queryOrderId);
      if (opts.phone || queryPhone) params.set('phone', opts.phone || queryPhone);
      if (opts.dateFrom || dateFrom) params.set('dateFrom', opts.dateFrom || dateFrom);
      if (opts.dateTo || dateTo) params.set('dateTo', opts.dateTo || dateTo);
      params.set('page', opts.page || page);
      params.set('perPage', opts.perPage || perPage);

      const resp = await fetch(`/api/admin-orders?${params.toString()}`, { headers: { Authorization: `Bearer ${getToken()}` } });
      const body = await resp.json();
      if (!resp.ok) throw new Error(body.error || 'Failed to fetch');
      setOrders(body.orders || []);
      setMeta(body.meta || { total: 0, page: 1, perPage: perPage });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Apply saved enterprise mode choice
    const enterpriseMode = typeof window !== 'undefined' ? localStorage.getItem('enterpriseMode') === 'true' : false;
    if (enterpriseMode) document.body.classList.add('enterprise');

    // If no token, redirect to /admin for login
    if (!token) {
      window.location.href = '/admin';
      return;
    }

    fetchOrders({ page: 1 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleEnterprise = () => {
    const enabled = !document.body.classList.contains('enterprise');
    if (enabled) document.body.classList.add('enterprise'); else document.body.classList.remove('enterprise');
    localStorage.setItem('enterpriseMode', enabled ? 'true' : 'false');
  };

  const markPaid = async (orderId) => {
    // Confirmation toggle to prevent accidental clicks
    const confirm = window.confirm('Are you sure you want to mark this order as PAID? This action is irreversible.');
    if (!confirm) return;

    try {
      const resp = await fetch('/api/admin-orders', { method: 'PATCH', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` }, body: JSON.stringify({ orderId, action: 'mark-paid', paymentStatus: 'COMPLETED' }) });
      const body = await resp.json();
      if (!resp.ok) throw new Error(body.error || 'Failed to update');
      // refresh
      fetchOrders({ page });
    } catch (err) {
      alert('Error: ' + (err.message || err));
    }
  };

  if (loading) return <div className="p-8 text-center">Loading orders...</div>;

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin — Orders</h1>
          <div className="flex items-center gap-3">
            <button onClick={() => { localStorage.removeItem('ADMIN_TOKEN'); window.location.href = '/admin'; }} className="px-3 py-2 border rounded">Logout</button>
            <button onClick={toggleEnterprise} className="px-3 py-2 border rounded">Toggle Enterprise Look</button>
          </div>
        </div>
        {orders.length === 0 && <p>No recent orders.</p>}
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white p-4 rounded shadow-sm">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">Order #{order.id}</div>
                  <div className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleString()}</div>
                  <div className="text-sm text-gray-500">{order.customerPhone || order.customerEmail}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-extrabold text-green-700">Rs. {order.total}</div>
                  <div className="text-sm mt-1">Status: <span className={`font-semibold ${order.status === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>{order.status}</span></div>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button onClick={() => setSelected(order)} className="px-4 py-2 border rounded">View</button>
                <button onClick={() => markPaid(order.id)} className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded font-bold">Mark Paid</button>
              </div>
            </div>
          ))}
        </div>

        {selected && (
          <div className="mt-8 bg-white p-6 rounded shadow">
            <h3 className="text-xl font-bold mb-4">Order Details — {selected.id}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Customer</h4>
                <p>{selected.customerName}</p>
                <p>{selected.customerPhone}</p>
                <p>{selected.customerEmail}</p>
                <p className="text-sm text-gray-500 mt-2">Payment(s):</p>
                <ul className="text-sm">
                  {selected.payments && selected.payments.length > 0 ? selected.payments.map(p => (
                    <li key={p.id}>{p.method} — Rs. {p.amount} — {p.status}</li>
                  )) : <li>No payments recorded</li>}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Items</h4>
                <pre className="text-sm bg-gray-50 p-3 rounded overflow-auto">{JSON.stringify(selected.items, null, 2)}</pre>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">Close</button>
              <button onClick={() => markPaid(selected.id)} className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded font-bold">Mark Paid</button>
            </div>
          </div>
        )}

        {/* Pagination */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <button disabled={page <= 1} onClick={() => { setPage(p => Math.max(1, p - 1)); fetchOrders({ page: Math.max(1, page - 1) }); }} className="px-3 py-2 border rounded mr-2">Previous</button>
            <button disabled={(meta.total || 0) <= page * perPage} onClick={() => { setPage(p => p + 1); fetchOrders({ page: page + 1 }); }} className="px-3 py-2 border rounded">Next</button>
          </div>
          <div className="text-sm text-gray-600">Showing page {meta.page} — {meta.total} orders total</div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
