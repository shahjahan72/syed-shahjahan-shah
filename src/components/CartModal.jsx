import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const CartModal = ({ isOpen, onClose, onContinueShopping, onCheckout }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Added to Cart!</h2>
              <p className="text-gray-600">Your item has been successfully added to your shopping cart.</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={onCheckout}
                className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                Proceed to Checkout
              </button>
              
              <button
                onClick={onContinueShopping}
                className="w-full bg-white border-2 border-gray-200 hover:border-teal-500 text-gray-700 hover:text-teal-500 font-bold py-4 px-6 rounded-lg transition-colors duration-200"
              >
                Continue Shopping
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartModal;