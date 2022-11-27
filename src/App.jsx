// update the app.js file
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePart from './parts/homePart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import { useSelector } from 'react-redux';
import { selectCart } from './redux/productSlice';

// write the app function
function App() {
  const cartItems = useSelector(selectCart);
  console.log('cartingggggggg app', cartItems);

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.num) + qty, 0);
  };

  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <Link className="brand" to="/">
            simazon
          </Link>
        </div>
        <div>
          <Link to="/cart">
            Cart
            {cartItems.length > 0 && (
              <span className="badge">{getCartCount()}</span>
            )}
          </Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
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
