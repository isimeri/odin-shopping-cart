import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useProducts } from '../ProductsContext';
import Carousel from "./Carousel";
import Nav from './Nav';
import './Product.css'

function Product() {
  const { id } = useParams();
  const {data, error, isLoading} = useProducts();
  const item = data.find(it => it.slug === id)

  return (
    <>
      <Nav />
      <h1>{item.name}</h1>
      <div className="gamecard">
        <div className="carousel">
          <Carousel imgArr={item.screenshots} />
        </div>
        <div className="gamecard-text">
          <div className="game-description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur sapiente mollitia fuga voluptas laborum blanditiis. Eius facere excepturi dicta corporis quidem, nisi nobis reprehenderit quo, perferendis cum dignissimos nam deserunt.</div>
          <div className="game-info">
            <div className="gamecard-title">Title: {item.name}</div>
            <div className="gamecard-released">Release date: {item.released}</div>
            <div className="gamecard-genres">Genre: {item.genres.map(g => <span key={g.id} className='gamecard-genre'>{g.name}</span>)}</div>
            <div className="gamecard-platforms">Platforms: {item.platforms.map(p => <span key={p.id} className='gamecard-platform'>{p.name}</span>)}</div>
          </div>
          <div className="hwrapper">
            <p className="product-card-price">${item.price}</p>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
      <p>{item.price}</p>
    </>
  )
}

export default Product;