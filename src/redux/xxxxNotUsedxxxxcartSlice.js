// create cart slice and reducers
import { createSlice } from '@reduxjs/toolkit';
import * as productApi from '../api/productApi';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: [],
    loading: false,
    error: null,
  },
  reducers: {
    // get cart
    getCartRequest: (state) => {
      state.loading = true;
    },
    getCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    getCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add to cart
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // delete from cart
    deleteFromCartRequest: (state) => {
      state.loading = true;
    },
    deleteFromCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    },
    deleteFromCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }

  },
});

// export actions
export const {
  getCartRequest,
  getCartSuccess,
  getCartFail,
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  deleteFromCartRequest,
  deleteFromCartSuccess,
  deleteFromCartFail
} = cartSlice.actions;

// export reducer
export default cartSlice.reducer;

// export selectors
export const selectCart = (state) => state.cart.cart;
export const selectLoading = (state) => state.cart.loading;
export const selectError = (state) => state.cart.error;


// export thunks
export const getCart = () => async (dispatch) => {
  try {
    dispatch(getCartRequest());
    const { data } = await productApi.getCart();
    dispatch(getCartSuccess(data));
  } catch (error) {
    dispatch(getCartFail(error.message));
  }
}

export const addToCart = (id) => async (dispatch) => {
  try {
    dispatch(addToCartRequest());
    const { data } = await productApi.addProductToCart(id);
    console.log( "from within",data);
    dispatch(addToCartSuccess(data));
  } catch (error) {
    dispatch(addToCartFail(error.message));
  }
}

export const deleteFromCart = (id) => async (dispatch) => {
  try {
    dispatch(deleteFromCartRequest());
    const { data } = await productApi.deleteProductFromCart(id);
    dispatch(getCartSuccess(data));
  } catch (error) {
    dispatch(getCartFail(error.message));
  }
}



