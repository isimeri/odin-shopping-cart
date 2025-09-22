import { Link } from "react-router";
import { useCart } from "../CartContext";
import { useProducts } from "../ProductsContext";
import Icon from '@mdi/react';
import Nav from "./Nav";
import "./Cart.css";

const Cart = () => {
  const {data, PLATFORM_ICONS, resetIcons} = useProducts();
  const {cart, removeFromCart, clearCart} = useCart()

  return (
    <>
      <Nav />
      <div className="cart-inner">
        <h1>Your cart</h1>
        <div className="hwrapper">
          <div className="vwrapper">
            <ul className="cart-list">
              {cart.map(item => {
                return (
                  <li key={item.id} className="cart-list-item">
                    <div className="cart-list-item-img" style={{backgroundImage: `url(${item.background_image})`}}></div>
                      <div className="cart-list-item-text">
                        <h2 className="cart-list-item-title">{item.name}</h2>
                        <p className="cart-list-item-price">{item.price}€</p>
                        <div className="hwrapper">
                          <p className="cart-list-item-platforms">
                            {item.platforms.map((platform, i) => {
                              const name = platform.name.toLowerCase().split(" ")[0];
                              let icon;
      
                              if(PLATFORM_ICONS[name] === undefined) return null;
                              if(PLATFORM_ICONS[name].used === false){
                                icon = PLATFORM_ICONS[name].icon || null;
                              } else {
                                icon = null
                              }
                              if(icon !== null) PLATFORM_ICONS[name].used = true;
      
                              return icon ? <Icon key={i} path={icon} size={0.8} /> : null;
                            })}   
                          </p>
                          {resetIcons()}
                          <button onClick={() => {removeFromCart(item.id)}}>Remove</button>
                        </div>
                      </div>
                  </li>
                )
              })}
            </ul>
            <div className="hwrapper">
              <div className={cart.length > 5 ? "payment-wrapper" : "payment-wrapper hidden"}>
                <p className="estimated-total">Estimated total: <span>{cart.reduce((acc, cur) => acc + cur.price, 0)}€</span></p>
                <button className="pay-btn">Continue to payment</button>
              </div>
              {cart.length > 0 && <button className="clear-cart-btn" onClick={clearCart}>Remove all items</button>}
            </div>
          </div>
          <div className="payment-wrapper">
            <p className="estimated-total">Estimated total: <span>{cart.reduce((acc, cur) => acc + cur.price, 0)}€</span></p>
            <button className="pay-btn">Continue to payment</button>
          </div>
        </div>
        

      </div>
    </>
  );
};

export default Cart;