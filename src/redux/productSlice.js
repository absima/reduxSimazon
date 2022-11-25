import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    data: [],
    sdata: {},
    // cdata: [],
    cdata: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    logindata: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
    loading: true,
    error: '',
  },
  reducers: {
    // for all items
    getProducts: (state, action) => {
      state.data = action.payload;
    },
    // for selected item
    getSelected: (state, action) => {
      state.sdata = action.payload;
    },
    // for adding cart item
    add2cart: (state, action) => {
      const newItem = action.payload;
      const exists = state.cdata.find((item) => {
        if (item._id === newItem._id) {
          return true;
        }
        return false;
      });
      exists !== undefined
        ? (state.cdata = [...state.cdata])
        : (state.cdata = [...state.cdata, action.payload]);
    },

    // for removing cart item
    removeFromCart: (state, action) => {
      const todelete = action.payload;
      const index = state.cdata.findIndex((item) => {
        return item._id === todelete._id;
      });
      state.cdata.splice(index, 1);
    },
    // logging in
    loggingIn: (state, action) => {
      state.logInData = action.payload; //
    },
    // for loading true or false
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // for error in loading
    catchError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// "ACTION"
// this async action triggers another action getProducts
export const getProductsAsync = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await axios.get(
      // `http://localhost:5000/products`
      // `http://localhost:5050/product`
      `${import.meta.env.VITE_PROJECT_API}/product`
    );
    // console.log(response);
    dispatch(setLoading(false));
    dispatch(getProducts(response.data));
  } catch (err) {
    dispatch(catchError(err));
    // throw new Error(err);
  }
};

// --------->>> for selected item
export const getSelectedProdAsync = (productId) => async (dispatch) => {
  try {
    // dispatch(setLoading(true));
    const response = await axios.get(
      // `http://localhost:5000/products/${productId}`
      // `http://localhost:5050/product/${productId}`
      `${import.meta.env.VITE_PROJECT_API}/product/${productId}`
    );
    dispatch(setLoading(false));
    dispatch(getSelected(response.data));
  } catch (err) {
    dispatch(catchError(err));
    // throw new Error(err);
  }
};
// <<<---------

// --------->>> for cart item
export const add2orRemoveFromCart =
  (productId, qty, flag) => async (dispatch, getState) => {
    const response = await axios.get(
      // `http://localhost:5000/products/${productId}`
      `http://localhost:5050/product/${productId}`
    );
    const data = response.data;
    data.num = qty;
    console.log('within cart--------', qty);
    if (flag === 'add') {
      dispatch(add2cart(data));
    } else if (flag === 'remove') {
      dispatch(removeFromCart(data));
    }
    console.log('getState', getState());
    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().products.cdata)
    );
  };
// <<<---------

export const signinAsync = (email, password) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      // 'http://localhost:5050/login',
      `${import.meta.env.VITE_PROJECT_API}/login`,
       {
      email,
      password,
    });
    console.log('within Redux', data)
    dispatch(loggingIn(data));
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    return error.message;
  }
};

// export const signOut = () => (dispatch) => {
//   localStorage.removeItem('userInfo');
//   localStorage.removeItem('cartItems');
//   // dispatch({ type: USER_SIGNOUT });
// };

export const {
  getProducts,
  getSelected,
  add2cart,
  removeFromCart,
  loggingIn,
  setLoading,
  catchError,
} = productSlice.actions;
export const products = (state) => state.products.data;
export const selected = (state) => state.products.sdata;
export const cartdata = (state) => state.products.cdata;
export const loggingdata = (state) => state.products.logindata;
export const loading = (state) => state.products.loading;
export const error = (state) => state.products.error;

export default productSlice.reducer;
