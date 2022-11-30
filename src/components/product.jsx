import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './rating';

export default function Product(props) {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <Link to={`/product/${product._id}`}>
        <img className="medium" src={product.thumbnail} alt={product.name} />
      </Link>
      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 className='h2title'>{product.title}</h2>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.stock} // review = stock,  for now
        ></Rating>
        <div className="price">€{product.price}</div>
      </div>
    </div>
  );
}
