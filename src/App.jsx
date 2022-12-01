// update the app.js file
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePart from './parts/homePart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SignInOrSignUpPart from './parts/signInNsignUpPart';
// import SearchPart from './parts/searchPart';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from './redux/productSlice';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faCartShopping } from '@fortawesome/free-solid-svg-icons';
// import { icon } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
  const cartItems = useSelector(selectCart);
  // const userInfo = useSelector(selectUser);
  // console.log(userInfo)
  console.log('cartingggggggg app', cartItems);
  // const dispatch = useDispatch();
  const userInfo = false;
  // console.log('user info app', userInfo);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.num) + qty, 0);
  };

  const signout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems');
    // dispatch({ type: USER_SIGNOUT });
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div className="grid-container">
      <header className="row">
        {/* <div className="headerFlex"> */}
          <div className='col'>
            <Link className="brand" to="/">
              simazon
            </Link>
          </div>

          <div className="col-2 center">
            <input
              className='searchinput'
              type="text"
              name="q"
              id="q"
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            <button type="submit">Search</button>
          </div>

          <div className='col'>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/login">Sign In</Link>
            )}
            <Link to="/cart">
              {/* Cart  */}
              {/* <FontAwesomeIcon icon="fa-solid fa-dice-one" /> */}
              {/* <FontAwesomeIcon 
              icon={faCoffee} 
              /> */}
              {/* <div> */}
              <FontAwesomeIcon icon={faCartShopping} />
              {cartItems.length > 0 &&
                <span className="badge">{
                getCartCount()
                }</span>
              }
              {/* </div> */}
            </Link>
          </div>
        {/* </div> */}
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/login" element={<SignInOrSignUpPart flag="login" />} />
          <Route
            path="/register"
            element={<SignInOrSignUpPart flag="register" />}
          />
          <Route path="/product/:id" element={<ProductPart />} />
          <Route path="/cart" element={<CartPart />} />
          <Route path="/cart/:id" element={<CartPart />} />
        </Routes>
      </main>
      <footer className="row center"></footer>
    </div>
  );
}

export default App;

// // update the app.js file
// import React, {useState} from 'react';
// import { Link, Routes, Route } from 'react-router-dom';
// import HomePart from './parts/homePart';
// import ProductPart from './parts/productPart';
// import CartPart from './parts/cartPart';
// import SignInOrSignUpPart from './parts/signInNsignUpPart';
// // import SearchPart from './parts/searchPart';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCart } from './redux/productSlice';

// function App() {
//   const dispatch = useDispatch();
//   const userInfo = false;
//   const cart = useSelector(selectCart);
//   const [cartItems, setCartItems] = useState(cart);

//   const getCartCount = () => {
//     if (cartItems) {
//       return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
//     }
//     // return cartItems.reduce((qty, item) => Number(item.num) + qty, 0);
//   };

//   const signout = () => {
//     localStorage.removeItem('userInfo');
//     localStorage.removeItem('cartItems');
//     // dispatch({ type: USER_SIGNOUT });
//   };

//   const signoutHandler = () => {
//     dispatch(signout());
//   };

//   return (
//     <div className="grid-container">
//       <header className="row">
//         <div className="headerFlex">
//           <div>
//             <Link className="brand" to="/">
//               simazon
//             </Link>
//           </div>

//           <div className="row1 center">
//             <input
//               type="text"
//               name="q"
//               id="q"
//               onChange={(e) => setKeyword(e.target.value)}
//             ></input>
//             <button type="submit">Search</button>
//           </div>

//           <div>
//             {userInfo ? (
//               <div className="dropdown">
//                 <Link to="#">
//                   {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
//                 </Link>
//                 <ul className="dropdown-content">
//                   <li>
//                     <Link to="#signout" onClick={signoutHandler}>
//                       Sign Out
//                     </Link>
//                   </li>
//                 </ul>
//               </div>
//             ) : (
//               <Link to="/login">Sign In</Link>
//             )}
//             <Link to="/cart">
//               Cart
//               {/* <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> */}
//               {/* <i className="fa-solid fa-cart-shopping"></i> */}
//               {cartItems.length > 0 && (
//                 <span className="badge">{getCartCount()}</span>
//               )}
//             </Link>
//           </div>
//         </div>
//       </header>
//       <main>
//         <Routes>
//           <Route path="/" element={<HomePart />} />
//           <Route path="/login" element={<SignInOrSignUpPart flag='login' />} />
//           <Route path="/register" element={<SignInOrSignUpPart flag='register'/>} />
//           <Route path="/product/:id" element={<ProductPart />} />
//           <Route path="/cart" element={<CartPart />} />
//           <Route path="/cart/:id" element={<CartPart />} />
//         </Routes>
//       </main>
//       <footer className="row center"></footer>
//     </div>
//   );
// }

// export default App;
