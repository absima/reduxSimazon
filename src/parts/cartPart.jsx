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
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { search } = useLocation();
  const { id } = useParams();
  if (cart.length > 0) {
    const qtyInUrl = new URLSearchParams(search).get('qty');
    const quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;

    const qtysInit = cart.map((item) => item.num);
    const [qties, setQties] = useState([]);

    const [qty, setQty] = useState(quant);
    const [flag, setFlag] = useState('add');

    // const qntqnt = qties.length || qtysInit;

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
      props.history.push('/login?redirect=shipping');
    };

    return (
      <div className="row top cartcont">
        <div className="cartdiv">
          <h1>Cart Section</h1>

          {loading ? (
            <LoadingIndicator></LoadingIndicator>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={item._id}>
                  <div className="row rowcart">
                    <div className="col imagediv">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="cartimg"
                      ></img>
                    </div>
                    <div className="col-3 titdiv">
                      <Link to={`/product/${item._id}`}>{item.title}</Link>
                    </div>
                    <div className="col optdiv">
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
                        {[...Array((item.stock % 10) + 1).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col pricediv">
                      €{item.price * (qties[idx] || item.num)}
                    </div>
                    <div className="col deldiv">
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
                    <div className="col-3 titdiv"></div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="col-1 cartright">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Subtotal ({qtysInit.reduce((a, c) => a + c, 0)} items) : €
                  {cart.reduce(
                    (a, c, i) => a + c.price * (qties[i] || c.num),
                    0
                  )}
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
  } else {
    // if cart is empty show this
    return (
      <div className="row top">
        <div className="col-2">
          <h1>Cart is empty</h1>
        </div>
      </div>
    );
  }
}
