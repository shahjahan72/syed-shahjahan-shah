import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
        setShowCartModal(true); // Show cart confirmation modal
    };

    const removeFromCart = (index) => {
        setCart((prev) => prev.filter((_, i) => i !== index));
    };

    const clearCart = () => {
        setCart([]);
    };

    const cartTotal = cart.reduce((total, item) => total + (item.totalPrice || 0), 0);

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            cartTotal,
            isCartOpen,
            setIsCartOpen,
            showCartModal,
            setShowCartModal
        }}>
            {children}
        </CartContext.Provider>
    );
};
