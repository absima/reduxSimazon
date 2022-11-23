import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import HomePart from './parts/homePart';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
// import './App.css';
import { useSelector } from 'react-redux';

import { cartdata } from './redux/productSlice';

function App() {
  const cartItems = useSelector(cartdata);
  // console.log('within app', cartItems)

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
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
          <Link to="/signin">Sign In</Link>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/product/:id" element={<ProductPart />} />
          <Route path="/cart/:id" element={<CartPart />} />
          <Route path="/cart" element={<CartPart />} />
        </Routes>
      </main>
      <footer className="row center">
        {/* All right reserved */}
        </footer>
    </div>
  );
}

export default App;
