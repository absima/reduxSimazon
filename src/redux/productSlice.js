import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = "http://localhost:5000/products";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    loading: true,
    error: '' 
  },
  reducers: {
    getProducts: (state, action) => {
      state.data = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    catchError: (state, action) => {
      state.error = action.payload;
    }
  }
});

// "ACTION"
// this async action triggers another action getProducts
export const getProductsAsync = () => async (dispatch) => {
  try {
    const response = await axios.get(`${API_URL}`);
    console.log(response)
    dispatch(setLoading(false));
    dispatch(getProducts(response.data));
  } catch (err) {
    dispatch(catchError(err));
    // throw new Error(err);
  }
};

export const { getProducts, setLoading } = productSlice.actions;
export const products = (state) => state.products.data;
export const loading = (state) => state.products.loading;
export const error = (state) => state.products.error;

export default productSlice.reducer;
