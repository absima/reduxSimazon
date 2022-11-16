import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePart from './parts/homePart';
import ProductPart from './parts/productPart';

// import './App.css';

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">
            simazon
          </a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/product/:id" element={<ProductPart />} />
        </Routes>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
