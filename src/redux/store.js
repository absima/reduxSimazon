import { configureStore } from '@reduxjs/toolkit';
// import { selectedProd } from './selectedProdSlice';
import productReducer from './productSlice'

export default configureStore({
  reducer: {
    products: productReducer,
    // selected: selectedProd
  }
}
);

