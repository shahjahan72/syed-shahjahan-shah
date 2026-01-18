import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import CartModal from './CartModal';

const CartModalHandler = () => {
  const { showCartModal, setShowCartModal } = useCart();
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    setShowCartModal(false);
  };

  const handleCheckout = () => {
    setShowCartModal(false);
    navigate('/checkout');
  };

  const handleClose = () => {
    setShowCartModal(false);
  };

  return (
    <CartModal
      isOpen={showCartModal}
      onClose={handleClose}
      onContinueShopping={handleContinueShopping}
      onCheckout={handleCheckout}
    />
  );
};

export default CartModalHandler;