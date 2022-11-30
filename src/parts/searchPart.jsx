// create search for products screen
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

import {
  getAllProducts,
  selectProducts,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function SearchPart(props) {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);



  useEffect(() => {
    dispatch(getAllProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {/* <div className="row center">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setKeyword(e.target.value)}
        ></input>
        <button type="submit">Search</button>
      </div> */}
      {loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                <img
                  className="medium"
                  src={product.image}
                  alt={product.name}
                ></img>
              </Link>
              <div className="card-body">
                <Link to={`/product/${product._id}`}>
                  <h2>{product.name}</h2>
                </Link>
                <div className="rating">
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                  <span>
                    <i className="fa fa-star"></i>
                  </span>
                </div>
                <div className="price">${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

