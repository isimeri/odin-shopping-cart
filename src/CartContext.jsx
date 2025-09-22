import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (obj) => {
    const found = cart.find(item => item.id === obj.id);
    if(found) return;

    setCart(prevState => [...prevState, obj]);
  }

  const removeFromCart = (id) => {
    const filtered= cart.filter(item => item.id !== id);
    setCart(filtered);
  }

  const clearCart = () => {
    setCart([]);
  }


  return (
    <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}