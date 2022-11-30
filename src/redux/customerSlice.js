import { createSlice } from '@reduxjs/toolkit';
// import everything from user api
import * as userApi from '../api/userApi';

// create slice
const userSlice = createSlice({
  name: 'users',
  initialState: {
    // users
    users: [],
    // user
    user: {},
    // loading
    loading: true,
    //
    error: null,
    // //
    // userInfo: localStorage.getItem('userInfo')
    //   ? JSON.parse(localStorage.getItem('userInfo'))
    //   : null,
    // // user login
    // userLogin: {
    //   userInfo: localStorage.getItem('userInfo')
    //     ? JSON.parse(localStorage.getItem('userInfo'))
    //     : null,
    // },
    // // user register
    // userRegister: {
    //   userInfo: localStorage.getItem('userInfo')
    //     ? JSON.parse(localStorage.getItem('userInfo'))
    //     : null,
    // },
    // // user update
    // userUpdate: {
    //   userInfo: localStorage.getItem('userInfo')
    //     ? JSON.parse(localStorage.getItem('userInfo'))
    //     : null,
    // },
    // // user delete
    // userDelete: {
    //   userInfo: localStorage.getItem('userInfo')
    //     ? JSON.parse(localStorage.getItem('userInfo'))
    //     : null,
    // },
    // // user logout
    // userLogout: {
    //   userInfo: localStorage.getItem('userInfo')
    //     ? JSON.parse(localStorage.getItem('userInfo'))
    //     : null,
    // },
    // // user details
    // userDetails: {
    //   userInfo: localStorage.getItem('userInfo')

    //     ? JSON.parse(localStorage.getItem('userInfo'))  
    //     : null,
    // },
    // cart
    cart: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  reducers: {
    // create reducers
    // get users
    getUsersRequest: (state) => {
      state.loading = true;
    },
    getUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    getUsersFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // get user
    getUserRequest: (state) => {
      state.loading = true;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // add one product to cart
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.loading = false;
      const newItem = action.payload;
      const exists = state.cart.find((item) => {
        if (item._id === newItem._id) {
          return true;
        }
        return false;
      });
      if (exists) {
        state.cart = state.cart.map((item) => {
          if (item._id === newItem._id) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      } else {
        state.cart = [...state.cart, { ...newItem, qty: 1 }];
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    addToCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // remove one product from cart
    removeFromCartRequest: (state) => {
      state.loading = true;
    },
    removeFromCartSuccess: (state, action) => {
      state.loading = false;
      const id = action.payload;
      state.cart = state.cart.filter((item) => item._id !== id);
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    removeFromCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update one product in cart
    updateCartRequest: (state) => {
      state.loading = true;
    },
    updateCartSuccess: (state, action) => {
      state.loading = false;
      const { id, qty } = action.payload;
      state.cart = state.cart.map((item) => {
        if (item._id === id) {
          return { ...item, qty };
        }
        return item;
      });
      localStorage.setItem('cartItems', JSON.stringify(state.cart));
    },
    updateCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// export actions
export const {
  getUsersRequest,
  getUsersSuccess,
  getUsersFail,
  getUserRequest,
  getUserSuccess,
  getUserFail,
  addToCartRequest,
  addToCartSuccess,
  addToCartFail,
  removeFromCartRequest,
  removeFromCartSuccess,
  removeFromCartFail,
  updateCartRequest,
  updateCartSuccess,
  updateCartFail,
} = userSlice.actions;

// export reducer
export default userSlice.reducer;

// export thunks
// export thunk for users
export const fetchUsers = () => async (dispatch) => {
  try {
    dispatch(getUsersRequest());
    const { data } = await userApi.getUsers();
    dispatch(getUsersSuccess(data));
  } catch (error) {
    dispatch(getUsersFail(error.message));
  }
};

// export thunk for user by email
export const fetchUserByEmail = (email) => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await userApi.getUserByEmail(email);
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};

// export const fetchUser = (id) => async (dispatch) => {
//   try {
//     dispatch(getUserRequest());
//     const { data } = await userApi.getUser(id);
//     dispatch(getUserSuccess(data));
//   } catch (error) {
//     dispatch(getUserFail(error.message));
//   }
// };

// export thunk for register
export const register =
  (name, email, password, passwordcheck) => async (dispatch) => {
    try {
      dispatch(getUserRequest());
      const { data } = await userApi.register(
        name,
        email,
        password,
        passwordcheck
      );
      dispatch(getUserSuccess(data));
    } catch (error) {
      dispatch(getUserFail(error.message));
    }
  };

// export thunk for login using email and password
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await userApi.login(email, password);
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};

// export const login = (user) => async (dispatch) => {
//   try {
//     dispatch(getUserRequest());
//     const { data } = await userApi.login(user);
//     dispatch(getUserSuccess(data));
//   } catch (error) {
//     dispatch(getUserFail(error.message));
//   }
// };

// export thunk for logout
export const logout = () => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await userApi.logout();
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};

// export thunk for add to cart
export const addToCart = (id) => async (dispatch) => {
  try {
    dispatch(addToCartRequest());
    const { data } = await userApi.addToCart(id);
    dispatch(addToCartSuccess(data));
  } catch (error) {
    dispatch(addToCartFail(error.message));
  }
};

// export thunk for remove from cart
export const removeFromCart = (id) => async (dispatch) => {
  try {
    dispatch(removeFromCartRequest());
    const { data } = await userApi.removeFromCart(id);
    dispatch(removeFromCartSuccess(data));
  } catch (error) {
    dispatch(removeFromCartFail(error.message));
  }
};

// export thunk for update cart
export const updateCart = (id, qty) => async (dispatch) => {
  try {
    dispatch(updateCartRequest());
    const { data } = await userApi.updateCart(id, qty);
    dispatch(updateCartSuccess(data));
  } catch (error) {
    dispatch(updateCartFail(error.message));
  }
};

// export selector
export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectCart = (state) => state.users.cart;
