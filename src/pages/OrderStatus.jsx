import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, Package, Truck, Calendar, FileText, User, Phone } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { printingRules } from '../data/printingRules';

const OrderStatus = () => {
    const [orders, setOrders] = useState([
        {
            id: 'ORD-001',
            date: '2024-01-15',
            product: 'Panaflex Printing',
            quantity: '50 sqft',
            status: 'approved',
            total: 'Rs. 1,800',
            estimatedDelivery: '2024-01-18',
            customer: 'John Doe',
            contact: '+92 348 1342505'
        },
        {
            id: 'ORD-002',
            date: '2024-01-14',
            product: 'Business Cards',
            quantity: '1000 units',
            status: 'pending_proof',
            total: 'Rs. 2,500',
            estimatedDelivery: '2024-01-20',
            customer: 'Jane Smith',
            contact: '+92 348 1342505'
        },
        {
            id: 'ORD-003',
            date: '2024-01-13',
            product: 'Custom T-Shirt Printing',
            quantity: '50 shirts',
            status: 'in_production',
            total: 'Rs. 4,200',
            estimatedDelivery: '2024-01-17',
            customer: 'Mike Johnson',
            contact: '+92 348 1342505'
        }
    ]);

    const [selectedOrder, setSelectedOrder] = useState(null);

    const getStatusInfo = (status) => {
        const state = Object.values(printingRules.orderStates).find(s => s.id === status);
        if (!state) return { name: 'Unknown', color: 'gray', icon: Clock };

        let color = 'gray';
        let icon = Clock;

        switch (status) {
            case 'pending_proof':
                color = 'yellow';
                icon = FileText;
                break;
            case 'approved':
                color = 'green';
                icon = CheckCircle;
                break;
            case 'in_production':
                color = 'blue';
                icon = Package;
                break;
            case 'ready_for_delivery':
                color = 'purple';
                icon = Truck;
                break;
            case 'delivered':
                color = 'green';
                icon = CheckCircle;
                break;
        }

        return { ...state, color, icon: icon };
    };

    const getStatusTimeline = (status) => {
        const timeline = [
            { id: 'pending_proof', label: 'Proof Pending', completed: ['pending_proof', 'approved', 'in_production', 'ready_for_delivery', 'delivered'].includes(status) },
            { id: 'approved', label: 'Approved', completed: ['approved', 'in_production', 'ready_for_delivery', 'delivered'].includes(status) },
            { id: 'in_production', label: 'In Production', completed: ['in_production', 'ready_for_delivery', 'delivered'].includes(status) },
            { id: 'ready_for_delivery', label: 'Ready for Delivery', completed: ['ready_for_delivery', 'delivered'].includes(status) },
            { id: 'delivered', label: 'Delivered', completed: ['delivered'].includes(status) }
        ];
        return timeline;
    };

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero Banner */}
            <div className="relative h-64 bg-gradient-to-r from-[#00A19D] to-[#008B87] overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                    }} />
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl lg:text-5xl font-black"
                    >
                        Order Status
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-2 text-white/80 max-w-2xl"
                    >
                        Track your printing orders and get real-time updates on production and delivery
                    </motion.p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Orders List */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Orders</h2>
                        <div className="space-y-4">
                            {orders.map((order) => {
                                const statusInfo = getStatusInfo(order.status);
                                return (
                                    <motion.div
                                        key={order.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 * orders.indexOf(order) }}
                                        onClick={() => setSelectedOrder(order)}
                                        className={`p-6 rounded-lg border cursor-pointer transition-all ${
                                            selectedOrder?.id === order.id 
                                                ? 'border-[#00A19D] bg-[#00A19D]/5' 
                                                : 'border-gray-200 hover:border-[#00A19D]/50'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{order.product}</h3>
                                                <p className="text-sm text-gray-500">{order.quantity}</p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                statusInfo.color === 'green' ? 'bg-green-100 text-green-800' :
                                                statusInfo.color === 'yellow' ? 'bg-yellow-100 text-yellow-800' :
                                                statusInfo.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                                                statusInfo.color === 'purple' ? 'bg-purple-100 text-purple-800' :
                                                'bg-gray-100 text-gray-800'
                                            }`}>
                                                {statusInfo.name}
                                            </span>
                                        </div>
                                        
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex justify-between">
                                                <span>Order ID:</span>
                                                <span className="font-mono">{order.id}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Total:</span>
                                                <span>{order.total}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Date:</span>
                                                <span>{new Date(order.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Order Details */}
                    <div className="lg:col-span-2">
                        {selectedOrder ? (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="bg-gray-50 rounded-lg p-8"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Order #{selectedOrder.id}</h2>
                                        <p className="text-gray-600">{selectedOrder.product} - {selectedOrder.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-lg font-bold text-[#00A19D]">{selectedOrder.total}</p>
                                        <p className="text-sm text-gray-500">Placed on {new Date(selectedOrder.date).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Timeline */}
                                <div className="mb-8">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">Order Progress</h3>
                                    <div className="relative">
                                        <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gray-200"></div>
                                        {getStatusTimeline(selectedOrder.status).map((step, index, arr) => {
                                            const stepInfo = getStatusInfo(step.id);
                                            const IconComponent = stepInfo.icon;
                                            return (
                                                <div key={step.id} className="relative flex items-start mb-6 last:mb-0">
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                        step.completed ? 'bg-[#00A19D] text-white' : 'bg-gray-200 text-gray-500'
                                                    }`}>
                                                        <IconComponent size={16} />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <h4 className={`font-bold ${
                                                            step.completed ? 'text-[#00A19D]' : 'text-gray-500'
                                                        }`}>
                                                            {step.label}
                                                        </h4>
                                                        {step.id === selectedOrder.status && (
                                                            <p className="text-sm text-[#00A19D] mt-1">
                                                                Current status • Expected completion: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Customer Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-white p-6 rounded-lg">
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <User size={18} />
                                            Customer Information
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p><span className="font-medium">Name:</span> {selectedOrder.customer}</p>
                                            <p><span className="font-medium">Contact:</span> {selectedOrder.contact}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-white p-6 rounded-lg">
                                        <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                            <Calendar size={18} />
                                            Delivery Information
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p><span className="font-medium">Estimated:</span> {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}</p>
                                            <p><span className="font-medium">Tracking:</span> {selectedOrder.id.replace('ORD-', 'PKG-')}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Support */}
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                                    <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                                        <Phone size={18} />
                                        Need Assistance?
                                    </h4>
                                    <p className="text-blue-700 text-sm mb-4">
                                        {printingRules.supportHours.response_time} during business hours ({printingRules.supportHours.actual_hours})
                                    </p>
                                    <a
                                        href={`https://wa.me/${siteConfig.whatsapp.number}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
                                    >
                                        <Phone size={14} />
                                        Chat on WhatsApp
                                    </a>
                                </div>
                            </motion.div>
                        ) : (
                            <div className="bg-gray-50 rounded-lg p-16 text-center">
                                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText size={24} className="text-gray-500" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Select an Order</h3>
                                <p className="text-gray-600">Click on an order from the list to view its status and details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderStatus;