import { useState } from 'react';
import { useProducts } from '../ProductsContext';
import { useCart } from '../CartContext';
import { Link } from 'react-router';
import Icon from '@mdi/react';
import Sidebar from "./Sidebar";
import Nav from './Nav';
import './Store.css'

function Store() {
  const {data, error, isLoading, PLATFORM_ICONS, resetIcons} = useProducts();//productsToDisplay, setProductsToDisplay
  const { addToCart } = useCart();
  const [activeFilter, setActiveFilter] = useState(null);
  // const [productsToDisplay, setProductsToDisplay] = useState([...data]);

  const filterByPlatform = (platformFilter) => {
    if(platformFilter === null){
      return data;
    }
    const filteredArr = data.filter(item => {
      return item.platforms.some(p => platformFilter === p.name.toLowerCase().split(" ")[0]);
    });
    return filteredArr;
  }

  const productsToDisplay = filterByPlatform(activeFilter);

  return (
    <div className='store-container'>
      <Nav />
      <Sidebar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      <div className="products-container">
        {productsToDisplay.map(item => {
          const url = "/store/" + item.slug;
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
                    <button className='add-to-cart-btn' onClick={() => {addToCart(item)}}>Add to cart</button>
                  </div>
                </div>
                {resetIcons()}
              </div>
          );
        })}
      </div>      
    </div>
  )
}

export default Store;