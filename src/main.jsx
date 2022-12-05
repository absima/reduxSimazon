import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
// import CtxtProvider from './contexter';
import App from './App';
import './index.css';

import { Provider } from 'react-redux';
import store from './redux/store';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePart from './parts/homePart';
import HomePage from './parts/homePage';
import ProductPart from './parts/productPart';
import CartPart from './parts/cartPart';
import SignInOrSignUpPart from './parts/signInNsignUpPart';
import ProfilePage from './parts/profilePart';
import RegisteredPage from './parts/registeredPage';
import LoggedInPart from './parts/loggedInPage';
import AuthLayout from './parts/layout';

const browserRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      { path: '/', element: <HomePart /> },
      { path: '/product/:id', element: <ProductPart /> },
      { path: '/cart/:id', element: <CartPart /> },
      { path: '/cart', element: <CartPart /> },
      { path: '/register', element: <SignInOrSignUpPart flag="register" /> },
      { path: '/login', element: <SignInOrSignUpPart flag="login" /> },
      {
        path: '/profile',
        element: <ProfilePage />,
        children: [{ path: '/profile/:username', element: <LoggedInPart /> }],
      },
      { path: '/registered', element: <RegisteredPage /> },
      // { path: '/loggedin', element: <LoggedInPart /> },

      { path: '/category/:id', element: <HomePage /> },
      { path: '/search', element: <HomePage /> },
      { path: '*', element: <h1>Not Found</h1> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={browserRouter}>
      <App />
    </RouterProvider>
  </Provider>
);

// ReactDOM.render(
//   <Provider store={store}>
//     <RouterProvider router={browserRouter}>
//       <BrowserRouter>
//         <HeaderPart />
//         <HomePart />
//         <ProductPart />
//         <CartPart />
//         <SignInOrSignUpPart />
//         <ProfilePage />
//         <FooterPart />
//         <RegisteredPage />
//         <LoggedInPart />
//         <HomePage />
//         <App />
//       </BrowserRouter>
//     </RouterProvider>
//   </Provider>,
//   document.getElementById('root')
// );

// // ReactDOM.createRoot(document.getElementById('root')).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //       {/* <CtxtProvider> */}
// //       <Provider store={store}>
// //         <App />
// //       </Provider>
// //       {/* </CtxtProvider> */}
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );
