import { useEffect, useState } from 'react';
import { useProducts } from '../ProductsContext';
import { Link } from 'react-router';
import Nav from './Nav';
import './shop.css'

function Shop() {
  const {data, error, isLoading} = useProducts();

  return (
    <>
      <Nav />
      <div className="products-container">
        {data.map(item => {
          const url = "/shop/" + item.id;
          return (
            <Link to={url} key={item.id}><div className="product-card">
              <img src={item.image} className='product-card-image' alt={item.title} />
              <div className="product-card-text">
                <p className="product-card-name">{item.title}</p>
                <div className="hwrapper">
                  <p className="product-card-price">${item.price}</p>
                  <button>Buy</button>
                </div>
              </div>
            </div>
            </Link>
          );
        })}
      </div>
    </>
  )
}

export default Shop