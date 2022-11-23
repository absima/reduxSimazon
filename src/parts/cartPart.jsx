import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import { add2orRemoveFromCart, cartdata } from '../redux/productSlice';

export default function CartPart(props) {
  const params = useParams();
  const itemID = params.id;
  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const dispatch = useDispatch();
  const incart = useSelector(cartdata);
  const cartItems = incart;

  console.log('incart', incart);
  // console.log('id --cartPart', itemID);
  // console.log('qty --cartPart', qty);

  // const onload = useSelector(loading);
  // const err = useSelector(error);

const [flag, setFlag] = useState('add')

  // const removeFromCartHandler = (id) => {
  //   // delete action
  // };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };


  useEffect(() => {
    if (itemID) {
      // dispatch(addToCart(productId, qty));
      dispatch(add2orRemoveFromCart(itemID, qty, flag));
    }
  }, [itemID, qty]);

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </Message>
        ) : (
          <ul>
            {cartItems.map((item, dxitem) => (
              <li key={dxitem}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(add2orRemoveFromCart(item._id, Number(e.target.value), 'add'))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price}</div>
                  <div>
                    <button
                      type="button"
                      onClick={() => dispatch(add2orRemoveFromCart(item._id, 1, 'remove'))}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1">
        <div className="card card-body">
          <ul>
            <li>
              <h2>
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : $
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>

    // <div>
    //   <h1>Cart Section</h1>
    //   <p>
    //     ADD TO CART : ProductID: {itemID} Qty: {qty}
    //   </p>
    // </div>
  );
}
