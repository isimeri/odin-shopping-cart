import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useProducts } from '../ProductsContext';
import { useCart } from '../CartContext';
import Carousel from "./Carousel";
import Nav from './Nav';
import './Product.css'

function Product() {
  const { id } = useParams();
  const {data, error, isLoading} = useProducts();
  const { addToCart } = useCart();
  const item = data.find(it => it.slug === id)

  return (
    <div className='product-container'>
      <Nav />
      <div className="product-inner">
        <div className="vwrapper">
          <Link to="/store">← Back to store</Link>
          <div className="gamecard">
            <h1 className='product-title'>{item.name}</h1>
            <div className="hwrapper">
              <div className="carousel">
                <Carousel imgArr={item.screenshots} />
              </div>
              <div className="gamecard-text">
                <div className="game-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur sapiente mollitia fuga voluptas laborum blanditiis. Eius facere excepturi dicta corporis quidem, nisi nobis reprehenderit quo, perferendis cum dignissimos nam deserunt.</div>
                <div className="game-info">
                  <div className="gamecard-title"><span className="faded-text">Title:</span> {item.name}</div>
                  <div className="gamecard-released"><span className="faded-text">Release date:</span> {item.released}</div>
                  <div className="gamecard-genres"><span className="faded-text">Genre:</span> {item.genres.map(g => <span key={g.id} className='gamecard-genre'>{g.name}</span>)}</div>
                  <div className="gamecard-platforms"><span className="faded-text">Platforms:</span> {item.platforms.map(p => <span key={p.id} className='gamecard-platform'>{p.name}</span>)}</div>
                </div>
                <div className="hwrapper">
                  <p className="product-card-price">{item.price}€</p>
                  <button className='add-to-cart-btn' onClick={() => {addToCart(item)}} >Add to cart</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product;