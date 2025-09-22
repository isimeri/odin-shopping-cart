import { useEffect, useState, Fragment } from 'react';
import { useProducts } from '../ProductsContext';
import { useCart } from '../CartContext';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import { mdiMicrosoftWindows, mdiPenguin, mdiApple, mdiMicrosoftXbox, mdiSonyPlaystation, mdiNintendoSwitch } from '@mdi/js';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import './shop.css'

function Shop() {
  const {data, error, isLoading, PLATFORM_ICONS, resetIcons} = useProducts();
  const { addToCart } = useCart();

  return (
    <>
      <Nav />
      <div className="hwrapper">
        <Sidebar />
        <div className="products-container">
          {data.map(item => {
            const url = "/shop/" + item.slug;
            return (
                <div key={item.id} className="product-card">
                  <Link to={url} className='product-link'>
                    <div className='product-card-image' style={{backgroundImage: `url(${item.background_image})`}}></div>
                  </Link>
                  <div className="product-card-text">
                    <p className="product-card-platforms">
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
                    <Link to={url} className='product-link'>
                      <p className="product-card-name">{item.name}</p>
                    </Link>
                    <div className="hwrapper">
                      <p className="product-card-price">{item.price}€</p>
                      <button onClick={() => {addToCart(item)}}>Add to cart</button>
                    </div>
                  </div>
                  {resetIcons()}
                </div>
            );
          })}
        </div>
      </div>
      
    </>
  )
}

export default Shop