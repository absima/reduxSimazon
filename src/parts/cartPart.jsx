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

  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const { search } = useLocation();

  const qtyInUrl = new URLSearchParams(search).get('qty');
  let quant;
  if (cart.length !== 0) {
    quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;
    // dispatch(addNremove({ id, quant }));
  } else {
    quant = qtyInUrl ? Number(qtyInUrl) : 1;
    // dispatch(addNremove({ id, quant }));
  }

  // const quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;

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
    <>
      <div className="row top cartcont">
        <div className="cartdiv">
          <h1>Cart Section</h1>

          {error ? (
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
                      ${item.price * (qties[idx] || item.num)}
                    </div>
                    <div className="col deldiv">
                      <button
                        type="button"
                        onClick={(e) =>
                          dispatch(addNremove(item._id, item.num, 'remove'))
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
                  Subtotal ({qtysInit.reduce((a, c) => a + c, 0)} items) : $
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
      <div className="row top"></div>
    </>
  );
}

// // create cart screen
// import { useEffect, useState } from 'react';
// import { useParams, useLocation, Link } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import LoadingIndicator from '../components/loading';
// import Message from '../components/message';
// import {
//   addNremove,
//   selectCart,
//   selectLoading,
//   selectError,
// } from '../redux/productSlice';

// export default function CartPart() {
//   const dispatch = useDispatch();
//   const cart = useSelector(selectCart);
//   const loading = useSelector(selectLoading);
//   const error = useSelector(selectError);
//   const { search } = useLocation();
//   const { id } = useParams();
//   if (cart.length > 0) {
//     const qtyInUrl = new URLSearchParams(search).get('qty');
//     const quant = qtyInUrl ? Number(qtyInUrl) : cart[cart.length - 1].num;

//     const qtysInit = cart.map((item) => item.num);
//     const [qties, setQties] = useState([]);

//     const [qty, setQty] = useState(quant);
//     const [flag, setFlag] = useState('add');

//     // const qntqnt = qties.length || qtysInit;

//     console.log('id', id);
//     console.log('qty', qty);
//     console.log('cart', cart);
//     console.log('qties', qties);
//     console.log('qtysInit', qtysInit);

//     // write useEffect to dispatch addNremove

//     useEffect(() => {
//       if (id) {
//         dispatch(addNremove(id, qty, flag));
//       }
//     }, [id, qty, flag, dispatch]);

//     // const removeFromCartHandler = (id) => {
//     //   dispatch(deleteFromCart(id));
//     // };

//     const checkoutHandler = () => {
//       props.history.push('/login?redirect=shipping');
//     };

//     return (
//       <div className="row top cartcont">
//         <div className="cartdiv">
//           <h1>Cart Section</h1>

//           {loading ? (
//             <LoadingIndicator></LoadingIndicator>
//           ) : error ? (
//             <Message variant="danger">{error}</Message>
//           ) : (
//             <ul>
//               {cart.map((item, idx) => (
//                 <li key={item._id}>
//                   <div className="row rowcart">
//                     <div className="col imagediv">
//                       <img
//                         src={item.thumbnail}
//                         alt={item.title}
//                         className="cartimg"
//                       ></img>
//                     </div>
//                     <div className="col-3 titdiv">
//                       <Link to={`/product/${item._id}`}>{item.title}</Link>
//                     </div>
//                     <div className="col optdiv">
//                       <select
//                         value={qties[idx] || item.num}
//                         onChange={(e) => {
//                           const chosen = Number(e.target.value);
//                           const newQties = [...qties];
//                           newQties[idx] = chosen;
//                           setQties(newQties);
//                           setQty(chosen);
//                           setFlag('add');
//                         }}
//                       >
//                         {[...Array((item.stock % 10) + 1).keys()].map((x) => (
//                           <option key={x + 1} value={x + 1}>
//                             {x + 1}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="col pricediv">
//                       €{item.price * (qties[idx] || item.num)}
//                     </div>
//                     <div className="col deldiv">
//                       <button
//                         type="button"
//                         onClick={(e) =>
//                           dispatch(
//                             addNremove(id, Number(e.target.value), 'remove')
//                           )
//                         }
//                       >
//                         Delete
//                       </button>
//                     </div>
//                     <div className="col-3 titdiv"></div>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         <div className="col-1 cartright">
//           <div className="card card-body">
//             <ul>
//               <li>
//                 <h2>
//                   Subtotal ({qtysInit.reduce((a, c) => a + c, 0)} items) : €
//                   {cart.reduce(
//                     (a, c, i) => a + c.price * (qties[i] || c.num),
//                     0
//                   )}
//                 </h2>
//               </li>
//               <li>
//                 <button
//                   type="button"
//                   onClick={checkoutHandler}
//                   className="primary block"
//                   disabled={cart.length === 0}
//                 >
//                   Proceed to Checkout
//                 </button>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     // if cart is empty show this
//     return (
//       <div className="row top">
//         <div className="col-2">
//           <h1>Cart is empty</h1>
//         </div>
//       </div>
//     );
//   }
// }

// // // create cart screen
// // import { useEffect, useState } from 'react';
// // import { useParams, useLocation, Link } from 'react-router-dom';
// // import { useDispatch, useSelector } from 'react-redux';
// // // import LoadingIndicator from '../components/loading';
// // import Message from '../components/message';
// // import {
// //   addNremove,
// //   selectCart,
// //   selectError,
// // } from '../redux/productSlice';

// // // cart section
// // const CartPart = () => {
// //   const { id } = useParams();
// //   const location = useLocation();
// //   const qty = location.search ? Number(location.search.split('=')[1]) : 1;
// //   const dispatch = useDispatch();
// //   const cart = useSelector(selectCart);
// //   const error = useSelector(selectError);
// //   const [cartItems, setCartItems] = useState(cart);
// //   const [totalPrice, setTotalPrice] = useState(0);
// //   const [totalQty, setTotalQty] = useState(0);

// //   useEffect(() => {
// //     if (id) {
// //       dispatch(addNremove({ id, qty }));
// //     }
// //   }, [dispatch, id, qty]);

// //   useEffect(() => {
// //     setCartItems(cart);
// //   }, [cart]);

// //   useEffect(() => {
// //     let items = 0;
// //     let price = 0;
// //     cartItems.forEach((item) => {
// //       items += item.qty;
// //       price += item.qty * item.price;
// //     });
// //     setTotalPrice(price);
// //     setTotalQty(items);
// //   }, [cartItems, totalPrice, totalQty]);

// //   const removeFromCartHandler = (id) => {
// //     dispatch(addNremove({ id }));
// //   };

// //   const checkoutHandler = () => {
// //     console.log('checkout');
// //   };

// //   return (
// //     <div className="cart">
// //       <div className="cart__left">
// //         <h2>Shopping Cart</h2>
// //         {error && <Message>{error}</Message>}
// //         {cartItems.length === 0 ? (
// //           <Message>
// //             Your cart is empty <Link to="/">Go Back</Link>
// //           </Message>
// //         ) : (
// //           cartItems.map((item) => (
// //             <div className="cart__item" key={item.product}>
// //               <div className="cart__item__img">
// //                 <img src={item.image
// //                   .replace('upload', 'upload/w_200')
// //                   .replace('upload', 'upload/h_200')} alt={item.name} />
// //               </div>
// //               <div className="cart__item__info">
// //                 <Link to={`/product/${item.product}`}>{item.name}</Link>
// //                 <p>
// //                   Price: <span>${item.price}</span>
// //                 </p>
// //               </div>
// //               <div className="cart__item__qty">
// //                 <select
// //                   value={item.qty}
// //                   onChange={(e) =>
// //                     dispatch(
// //                       addNremove({
// //                         id: item.product,
// //                         qty: Number(e.target.value),
// //                       })
// //                     )
// //                   }
// //                 >
// //                   {[...Array(item.countInStock).keys()].map((x) => (
// //                     <option key={x + 1} value={x + 1}>
// //                       {x + 1}
// //                     </option>
// //                   ))}
// //                 </select>
// //                 <button
// //                   type="button"
// //                   onClick={() => removeFromCartHandler(item.product)}
// //                 >
// //                   <i className="fas fa-trash"></i>
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )}
// //       </div>
// //       <div className="cart__right">
// //         <div className="cart__info">
// //           <p>
// //             Subtotal ({totalQty} items) : <span>${totalPrice}</span>
// //           </p>
// //           <button
// //             type="button"
// //             onClick={checkoutHandler}
// //             disabled={cartItems.length === 0}
// //           >
// //             Proceed To Checkout
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default CartPart;
