// update the app.js file
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import HeaderPart from './parts/headerPart';
import HomePart from './parts/homePart';
import HomePage from './parts/homePage';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SignInOrSignUpPart from './parts/signInNsignUpPart';
import ProfilePage from './parts/profilePart';
import FooterPart from './parts/footerPart';
import RegisteredPage from './parts/registeredPage';
import LoggedInPart from './parts/loggedInPage';

function App() {
  return (
    <div className="App">
      {/* <header>
        <HeaderPart />
      </header>
      {/* <main>
        <Routes>
          <Route path="/" element={<HomePart />} />
          <Route path="/product/:id" element={<ProductPart />} />
          <Route path="/cart/:id" element={<CartPart />} />
          <Route path="/cart" element={<CartPart />} />
          <Route path="/login" element={<SignInOrSignUpPart flag="login" />} />
          <Route
            path="/register"
            element={<SignInOrSignUpPart flag="register" />}
          />
          <Route path="/registered" element={<RegisteredPage />} />
          <Route path="/loggedin" element={<LoggedInPart />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/category/:id" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </main> */}
      {/* <footer className="row center">
        <FooterPart />
      </footer> */}
    </div>
  );
}

export default App;
