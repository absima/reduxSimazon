// import { useContext } from 'react';
// import { ProjContext } from '../contexter';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import LoadingBox from '../components/loading';
import MessageBox from '../components/message';
import Rating from '../components/rating';

import {
  getSelectedProdAsync,
  selected,
  loading,
  error,
} from '../redux/productSlice';

export default function ProductPart(props) {
  const [qty, setQty] = useState(1);
  // const { products } = useContext(ProjContext);
  const params = useParams();
  const itemID = params.id;

  // console.log('id', itemID);

  const selectedItem = useSelector(selected);
  const onload = useSelector(loading);
  const err = useSelector(error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedProdAsync(itemID));
  }, []);

  // console.log('xxxxxxx');
  // console.log(selectedItem);

  return (
    <div>
      {onload ? (
        <LoadingBox></LoadingBox>
      ) : err ? (
        <MessageBox variant="danger">{err}</MessageBox>
      ) : (
        <div>
          <Link to="/">Back to result</Link>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={selectedItem.image}
                alt={selectedItem.name}
              ></img>
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{selectedItem.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={selectedItem.rating}
                    numReviews={selectedItem.numReviews}
                  ></Rating>
                </li>
                <li>Pirce : ${selectedItem.price}</li>
                <li>
                  Description:
                  <p>{selectedItem.description}</p>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Price</div>
                      <div className="price">${selectedItem.price}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {selectedItem.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {/*                   
                  <li>
                    <button className="primary block">Add to Cart</button>
                  </li> */}
                  {selectedItem.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(selectedItem.countInStock).keys()].map(
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
                        <Link to={`/cart/${itemID}?qty=${qty}`}>
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
