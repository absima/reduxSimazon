// create cart screen
import { useEffect, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';
import {
  addNremove,
  selectCart,
  selectLoading,
  selectError,
} from '../redux/productSlice';

export default function CartPart() {
  const { id } = useParams();
  console.log(useParams());

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { search } = useLocation();

  console.log('cart first', cart);

  const qtyInUrl = new URLSearchParams(search).get('qty');
  const quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;

  const qtysInit = cart.map((item) => item.num);
  const [qties, setQties] = useState([]);

  const [qty, setQty] = useState(quant);
  const [flag, setFlag] = useState('add');

  console.log('id', id);
  console.log('qty', qty);
  console.log('cart', cart);
  console.log('qties', qties);
  console.log('qtysInit', qtysInit);

  // write useEffect to dispatch addNremove

  useEffect(() => {
    if (id) {
      dispatch(addNremove(id, qty, flag));
    }
  }, [id, qty, flag, dispatch]);

  // const removeFromCartHandler = (id) => {
  //   dispatch(deleteFromCart(id));
  // };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>Shopping Cart</h1>
        {loading ? (
          <LoadingIndicator></LoadingIndicator>
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <ul>
            {cart.map((item, idx) => (
              <li key={item._id}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="min-30">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>
                    <select
                      value={qties[idx] || item.num}
                      onChange={(e) => {
                        const chosen = Number(e.target.value);
                        const newQties = [...qties];
                        newQties[idx] = chosen;
                        setQties(newQties);
                        setQty(chosen);
                        setFlag('add');
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>${item.price * (qties[idx] || item.num)}</div>
                  <div>
                    <button
                      type="button"
                      onClick={(e) =>
                        dispatch(
                          addNremove(id, Number(e.target.value), 'remove')
                        )
                      }
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
                Subtotal ({qties.reduce((a, c) => a + c, 0)} items) : $
                {cart.reduce((a, c, i) => a + c.price * (qties[i] || c.num), 0)}
              </h2>
            </li>
            <li>
              <button
                type="button"
                onClick={checkoutHandler}
                className="primary block"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
