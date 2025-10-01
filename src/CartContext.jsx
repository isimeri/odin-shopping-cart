import { createContext, useContext, useState, useRef } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const timeoutRef = useRef(null)
    
  function showToast(){
    const successMsg = document.querySelector(".added-success-msg");
    successMsg.classList.remove("hidden");

    if(timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(()=>{
      successMsg.classList.add("hidden");
    },2000);
  }

  const addToCart = (obj) => {
    const found = cart.find(item => item.id === obj.id);
    if(found) return;

    showToast();

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