import { configureStore } from '@reduxjs/toolkit';
// import { selectedProd } from './selectedProdSlice';
import productReducer from './productSlice'
// import cartReducer from './cartSlice'
// import userReducer from './userSlice'
// import orderReducer from './orderSlice'


export default configureStore({
  reducer: {
    // products
    products: productReducer,
    // cart
    // cart: cartReducer,    
  }
}
);

