// update the app.js file
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePart from './parts/homePart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SignInPart from './parts/signInPart';
import SearchPart from './parts/searchPart';
import { useSelector, useDispatch } from 'react-redux';
import { selectCart } from './redux/productSlice';

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
        <div className="headerFlex">
          <div>
            <Link className="brand" to="/">
              simazon
            </Link>
          </div>

          <div className="row1 center">
            <input
              type="text"
              name="q"
              id="q"
              onChange={(e) => setKeyword(e.target.value)}
            ></input>
            <button type="submit">Search</button>
          </div>

          <div>
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
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{getCartCount()}</span>
              )}
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/login" element={<SignInPart />} />
          <Route path="/register" element={<SignInPart />} />
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

// // import SignInPart from './parts/signInPart';
// import { useDispatch, useSelector } from 'react-redux';
// // import { cartdata, loggingdata } from './redux/productSlice';

// function App() {

//   // const cartItems = useSelector(cartdata);
//   // console.log('within app', cartItems)

//   // const userInfo = useSelector(loggingdata);

//   // console.log(userInfo)

//   const dispatch = useDispatch();

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
//         <div>
//           <Link className="brand" to="/">
//             simazon
//           </Link>
//         </div>
//         <div>
//           <Link to="/cart">
//             Cart
//             {cartItems.length > 0 && (
//               <span className="badge">{cartItems.length}</span>
//             )}
//           </Link>

//           {userInfo ? (
//             <div className="dropdown">
//               <Link to="#">
//                 {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
//               </Link>
//               <ul className="dropdown-content">
//                 <li>
//                   <Link to="#signout" onClick={signoutHandler}>
//                     Sign Out
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           ) : (
//             <Link to="/signin">Sign In</Link>
//           )}
//         </div>
//       </header>
//       <main>
//         <Routes>
//           <Route path="/" element={<HomePart />} />
//           <Route path="/product/:id" element={<ProductPart />} />
//           {/* <Route path="/signin" element={<SignInPart />} /> */}
//           <Route path="/cart/:id" element={<CartPart />} />
//           <Route path="/cart" element={<CartPart />} />
//         </Routes>
//       </main>
//       <footer className="row center">{/* All right reserved */}</footer>
//     </div>
//   );
// }
