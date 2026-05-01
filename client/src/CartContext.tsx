import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    useEffect(() => localStorage.setItem('cart', JSON.stringify(cart)), [cart]);
    const addToCart = (product) => setCart([...cart, { ...product, quantity: 1 }]);
    return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
};
export const useCart = () => useContext(CartContext);
