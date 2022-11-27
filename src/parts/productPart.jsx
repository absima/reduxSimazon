// updating the product part to use redux
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link, useLocation } from 'react-router-dom';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import Rating from '../components/rating';

import {
  getOneProduct,
  selectProduct,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function ProductPart() {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  // console.log(id);
  // console.log(product);

  useEffect(() => {
    dispatch(getOneProduct(id));
  }, [dispatch, id]);

  // const addToCartHandler = () => {
  //   props.history.push(`/procut/cart/${id}?qty=${qty}`);
  // };

  return (
    <div>
      {loading ? (
        <LoadingIndicator></LoadingIndicator>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={product.image}
                alt={product.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>Price: ${product.price}</li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${product.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={
                                (e) => setQty(e.target.value)
                              }
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      <li>
                        <Link to={`/cart/${id}?qty=${qty}`}>
                          <button className="primary block">Add to Cart</button>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
