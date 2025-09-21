import { useState } from 'react';
import { Link, useParams } from 'react-router';
import { useProducts } from '../ProductsContext';
import Nav from './Nav';
// import './App.css'

function Product() {
  const { id } = useParams();
  const {data, error, isLoading} = useProducts();
  const item = data.find(it => Number(it.id) === Number(id))

  return (
    <>
      <Nav />
      <p>{item.title}</p>
      <img src={item.image} alt={item.title} />
      <p>{item.price}</p>
    </>
  )
}

export default Product;