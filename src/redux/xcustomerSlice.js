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
    error: '',
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
export const registerUser = (name, email, password) => async (dispatch) => {
  try {
    dispatch(getUserRequest());
    const { data } = await userApi.register(name, email, password);
    console.log('registration successful');
    dispatch(getUserSuccess(data));
  } catch (error) {
    dispatch(getUserFail(error.message));
  }
};

// export thunk for login using email and password
export const loginUser = (email, password) => async (dispatch) => {
  try {
    const response = await userApi.login(email, password);
    console.log('login successful');
    return response.data;
  } catch (error) {
    return error.message;
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
export const logoutUser = () => async (dispatch) => {
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

// export selector
export const selectUsers = (state) => state.users.users;
export const selectUser = (state) => state.users.user;
export const selectLoading = (state) => state.users.loading;
export const selectError = (state) => state.users.error;
export const selectCart = (state) => state.users.cart;

// import { createSlice } from '@reduxjs/toolkit';
// // import everything from user api
// import * as userApi from '../api/userApi';

// // create slice
// const userSlice = createSlice({
//   name: 'users',
//   initialState: {
//     // users
//     users: [],
//     // user
//     user: {},
//     // loading
//     loading: true,
//     //
//     error: "",
//     // user login
//     userLogin: {},
//     // user register
//     userRegister: {},
//     // user update
//     userUpdate: {},
//     // user delete
//     userDelete: {},
//     // user details
//     userDetails: {},
//     // // user list
//     // userList: {},
//     // user update profile
//     userUpdateProfile: {},
//     // user update password
//     userUpdatePassword: {},
//     // user logout
//     userLogout: {},
//   },
//   reducers: {
//     // get users
//     getUsersStart: (state) => {
//       state.loading = true;
//     },
//     getUsersSuccess: (state, action) => {
//       state.loading = false;
//       state.users = action.payload;
//     },
//     getUsersFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // get user
//     getUserStart: (state) => {
//       state.loading = true;
//     },
//     getUserSuccess: (state, action) => {
//       state.loading = false;
//       state.user = action.payload;
//     },
//     getUserFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user login
//     userLoginStart: (state) => {
//       state.loading = true;
//     },
//     userLoginSuccess: (state, action) => {
//       state.loading = false;
//       state.userLogin = action.payload;
//     },
//     userLoginFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user register
//     userRegisterStart: (state) => {
//       state.loading = true;
//     },
//     userRegisterSuccess: (state, action) => {
//       state.loading = false;
//       state.userRegister = action.payload;
//     },
//     userRegisterFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user update
//     userUpdateStart: (state) => {
//       state.loading = true;
//     },
//     userUpdateSuccess: (state, action) => {
//       state.loading = false;
//       state.userUpdate = action.payload;
//     },
//     userUpdateFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user delete
//     userDeleteStart: (state) => {
//       state.loading = true;
//     },
//     userDeleteSuccess: (state, action) => {
//       state.loading = false;
//       state.userDelete = action.payload;
//     },
//     userDeleteFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user details
//     userDetailsStart: (state) => {
//       state.loading = true;
//     },
//     userDetailsSuccess: (state, action) => {
//       state.loading = false;
//       state.userDetails = action.payload;
//     },
//     userDetailsFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     // // user list
//     // userListStart: (state) => {
//     //   state.loading = true;
//     // },
//     // userListSuccess: (state, action) => {
//     //   state.loading = false;
//     //   state.userList = action.payload;
//     // },
//     // userListFail: (state, action) => {
//     //   state.loading = false;
//     //   state.error = action.payload;
//     // },
//     // user update profile
//     userUpdateProfileStart: (state) => {
//       state.loading = true;
//     },
//     userUpdateProfileSuccess: (state, action) => {
//       state.loading = false;
//       state.userUpdateProfile = action.payload;
//     },
//     userUpdateProfileFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user update password
//     userUpdatePasswordStart: (state) => {
//       state.loading = true;
//     },
//     userUpdatePasswordSuccess: (state, action) => {
//       state.loading = false;
//       state.userUpdatePassword = action.payload;
//     },
//     userUpdatePasswordFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     // user logout
//     userLogoutStart: (state) => {
//       state.loading = true;
//     },
//     userLogoutSuccess: (state, action) => {
//       state.loading = false;
//       state.userLogout = action.payload;
//     },
//     userLogoutFail: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// // export actions
// export const {
//   getUsersStart,
//   getUsersSuccess,
//   getUsersFail,
//   getUserStart,
//   getUserSuccess,
//   getUserFail,
//   userLoginStart,
//   userLoginSuccess,
//   userLoginFail,
//   userRegisterStart,
//   userRegisterSuccess,
//   userRegisterFail,
//   userUpdateStart,
//   userUpdateSuccess,
//   userUpdateFail,
//   userDeleteStart,
//   userDeleteSuccess,
//   userDeleteFail,
//   userDetailsStart,
//   userDetailsSuccess,
//   userDetailsFail,
//   // userListStart,
//   // userListSuccess,
//   // userListFail,
//   userUpdateProfileStart,

//   userUpdateProfileSuccess,
//   userUpdateProfileFail,
//   userUpdatePasswordStart,
//   userUpdatePasswordSuccess,
//   userUpdatePasswordFail,

//   userLogoutStart,
//   userLogoutSuccess,
//   userLogoutFail,
// } = userSlice.actions;

// // export reducer
// export default userSlice.reducer;

// // export thunks
// export const fetchUsers = () => async (dispatch) => {
//   try {
//     dispatch(getUsersStart());
//     const { data } = await userApi.getUsers();
//     dispatch(getUsersSuccess(data));
//   } catch (error) {
//     dispatch(getUsersFail(error.message));
//   }
// };

// // export thunk for user by email
// export const fetchUserByEmail = (email) => async (dispatch) => {
//   try {
//     dispatch(getUserRequest());
//     const { data } = await userApi.getUserByEmail(email);
//     dispatch(getUserSuccess(data));
//   } catch (error) {
//     dispatch(getUserFail(error.message));
//   }
// };

// // export thunk for register
// export const register =
//   (name, email, password, passwordcheck) => async (dispatch) => {
//     try {
//       dispatch(getUserRequest());
//       const { data } = await userApi.register(
//         name,
//         email,
//         password,
//         passwordcheck
//       );
//       console.log('registration successful');
//       dispatch(getUserSuccess(data));
//     } catch (error) {
//       dispatch(getUserFail(error.message));
//     }
//   };

// // export thunk for login
// export const login = (email, password) => async (dispatch) => {
//   try {
//     dispatch(userLoginStart());
//     const { data } = await userApi.login(email, password);
//     dispatch(userLoginSuccess(data));
//   } catch (error) {
//     dispatch(userLoginFail(error.message));
//   }
// };

// // export thunk for update user
// export const updateUser =
//   (id, name, email, password, passwordcheck) => async (dispatch) => {
//     try {
//       dispatch(userUpdateStart());
//       const { data } = await userApi.updateUser(
//         id,
//         name,
//         email,
//         password,
//         passwordcheck
//       );
//       dispatch(userUpdateSuccess(data));
//     } catch (error) {
//       dispatch(userUpdateFail(error.message));
//     }
//   };

// // export thunk for delete user
// export const deleteUser = (id) => async (dispatch) => {
//   try {
//     dispatch(userDeleteStart());
//     const { data } = await userApi.deleteUser(id);
//     dispatch(userDeleteSuccess(data));
//   } catch (error) {
//     dispatch(userDeleteFail(error.message));
//   }
// };

// // export thunk for user update password
// export const updateUserPassword =
//   (id, password, passwordcheck) => async (dispatch) => {
//     try {
//       dispatch(userUpdatePasswordStart());
//       const { data } = await userApi.updateUserPassword(
//         id,
//         password,
//         passwordcheck
//       );
//       dispatch(userUpdatePasswordSuccess(data));
//     } catch (error) {
//       dispatch(userUpdatePasswordFail(error.message));
//     }
//   };

// // export thunk for user logout
// export const logout = () => async (dispatch) => {
//   try {
//     dispatch(userLogoutStart());
//     const { data } = await userApi.logout();
//     dispatch(userLogoutSuccess(data));
//   } catch (error) {
//     dispatch(userLogoutFail(error.message));
//   }
// };

// // export selectors
// export const selectUsers = (state) => state.users.users;
// export const selectUser = (state) => state.users.user;
// export const selectLoading = (state) => state.users.loading;
// export const selectError = (state) => state.users.error;
// // export selectors for user login
// export const selectUserLogin = (state) => state.users.userLogin;
// // export selectors for user register
// export const selectUserRegister = (state) => state.users.userRegister;
// // export selectors for user update
// export const selectUserUpdate = (state) => state.users.userUpdate;
// // export selectors for user delete
// export const selectUserDelete = (state) => state.users.userDelete;
// // export selectors for user details
// export const selectUserDetails = (state) => state.users.userDetails;
// // export selectors for user list
// // export const selectUserList = (state) => state.users.userList;
// // export selectors for user update profile
// export const selectUserUpdateProfile = (state) => state.users.userUpdateProfile;
// // export selectors for user update password
// export const selectUserUpdatePassword = (state) =>
//   state.users.userUpdatePassword;
// // export selectors for user logout
// export const selectUserLogout = (state) => state.users.userLogout;

// // ------------------ to be deleted thunks (from) ------------------ //

// // ------------------ to be deleted thunks (to)   ------------------ //

// //     // userInfo: localStorage.getItem('userInfo')
// //     //   ? JSON.parse(localStorage.getItem('userInfo'))
// //     //   : "",
// //     // // user login
// //     // userLogin: {
// //     //   userInfo: localStorage.getItem('userInfo')
// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // // user register
// //     // userRegister: {
// //     //   userInfo: localStorage.getItem('userInfo')
// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // // user update
// //     // userUpdate: {
// //     //   userInfo: localStorage.getItem('userInfo')
// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // // user delete
// //     // userDelete: {
// //     //   userInfo: localStorage.getItem('userInfo')
// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // // user logout
// //     // userLogout: {
// //     //   userInfo: localStorage.getItem('userInfo')
// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // // user details
// //     // userDetails: {
// //     //   userInfo: localStorage.getItem('userInfo')

// //     //     ? JSON.parse(localStorage.getItem('userInfo'))
// //     //     : "",
// //     // },
// //     // cart
// //     cart: localStorage.getItem('cartItems')
// //       ? JSON.parse(localStorage.getItem('cartItems'))
// //       : [],
// //   },
// //   reducers: {
// //     // create reducers
// //     // get users
// //     getUsersRequest: (state) => {
// //       state.loading = true;
// //     },
// //     getUsersSuccess: (state, action) => {
// //       state.loading = false;
// //       state.users = action.payload;
// //     },
// //     getUsersFail: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //     // get user
// //     getUserRequest: (state) => {
// //       state.loading = true;
// //     },
// //     getUserSuccess: (state, action) => {
// //       state.loading = false;
// //       state.user = action.payload;
// //     },
// //     getUserFail: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //     // add one product to cart
// //     addToCartRequest: (state) => {
// //       state.loading = true;
// //     },
// //     addToCartSuccess: (state, action) => {
// //       state.loading = false;
// //       const newItem = action.payload;
// //       const exists = state.cart.find((item) => {
// //         if (item._id === newItem._id) {
// //           return true;
// //         }
// //         return false;
// //       });
// //       if (exists) {
// //         state.cart = state.cart.map((item) => {
// //           if (item._id === newItem._id) {
// //             return { ...item, qty: item.qty + 1 };
// //           }
// //           return item;
// //         });
// //       } else {
// //         state.cart = [...state.cart, { ...newItem, qty: 1 }];
// //       }
// //       localStorage.setItem('cartItems', JSON.stringify(state.cart));
// //     },
// //     addToCartFail: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //     // remove one product from cart
// //     removeFromCartRequest: (state) => {
// //       state.loading = true;
// //     },
// //     removeFromCartSuccess: (state, action) => {
// //       state.loading = false;
// //       const id = action.payload;
// //       state.cart = state.cart.filter((item) => item._id !== id);
// //       localStorage.setItem('cartItems', JSON.stringify(state.cart));
// //     },
// //     removeFromCartFail: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //     // update one product in cart
// //     updateCartRequest: (state) => {
// //       state.loading = true;
// //     },
// //     updateCartSuccess: (state, action) => {
// //       state.loading = false;
// //       const { id, qty } = action.payload;
// //       state.cart = state.cart.map((item) => {
// //         if (item._id === id) {
// //           return { ...item, qty };
// //         }
// //         return item;
// //       });
// //       localStorage.setItem('cartItems', JSON.stringify(state.cart));
// //     },
// //     updateCartFail: (state, action) => {
// //       state.loading = false;
// //       state.error = action.payload;
// //     },
// //   },
// // });

// // // export actions
// // export const {
// //   getUsersRequest,
// //   getUsersSuccess,
// //   getUsersFail,
// //   getUserRequest,
// //   getUserSuccess,
// //   getUserFail,
// //   addToCartRequest,
// //   addToCartSuccess,
// //   addToCartFail,
// //   removeFromCartRequest,
// //   removeFromCartSuccess,
// //   removeFromCartFail,
// //   updateCartRequest,
// //   updateCartSuccess,
// //   updateCartFail,
// // } = userSlice.actions;

// // // export reducer
// // export default userSlice.reducer;

// // // export thunks
// // // export thunk for users
// // export const fetchUsers = () => async (dispatch) => {
// //   try {
// //     dispatch(getUsersRequest());
// //     const { data } = await userApi.getUsers();
// //     dispatch(getUsersSuccess(data));
// //   } catch (error) {
// //     dispatch(getUsersFail(error.message));
// //   }
// // };

// // // export thunk for user by email
// // export const fetchUserByEmail = (email) => async (dispatch) => {
// //   try {
// //     dispatch(getUserRequest());
// //     const { data } = await userApi.getUserByEmail(email);
// //     dispatch(getUserSuccess(data));
// //   } catch (error) {
// //     dispatch(getUserFail(error.message));
// //   }
// // };

// // // export const fetchUser = (id) => async (dispatch) => {
// // //   try {
// // //     dispatch(getUserRequest());
// // //     const { data } = await userApi.getUser(id);
// // //     dispatch(getUserSuccess(data));
// // //   } catch (error) {
// // //     dispatch(getUserFail(error.message));
// // //   }
// // // };

// // // export thunk for register
// // export const register =
// //   (name, email, password, passwordcheck) => async (dispatch) => {

// //     try {
// //       dispatch(getUserRequest());
// //       const { data } = await userApi.register(
// //         name,
// //         email,
// //         password,
// //         passwordcheck
// //       );
// //       console.log('registration successful')
// //       dispatch(getUserSuccess(data));
// //     } catch (error) {
// //       dispatch(getUserFail(error.message));
// //     }
// //   };

// // // export thunk for login using email and password
// // export const login = (email, password) => async (dispatch) => {
// //   try {
// //     dispatch(getUserRequest());
// //     const { data } = await userApi.login(email, password);
// //     console.log('login successful')
// //     dispatch(getUserSuccess(data));
// //   } catch (error) {
// //     dispatch(getUserFail(error.message));
// //   }
// // };

// // // export const login = (user) => async (dispatch) => {
// // //   try {
// // //     dispatch(getUserRequest());
// // //     const { data } = await userApi.login(user);
// // //     dispatch(getUserSuccess(data));
// // //   } catch (error) {
// // //     dispatch(getUserFail(error.message));
// // //   }
// // // };

// // // export thunk for logout
// // export const logout = () => async (dispatch) => {
// //   try {
// //     dispatch(getUserRequest());
// //     const { data } = await userApi.logout();
// //     dispatch(getUserSuccess(data));
// //   } catch (error) {
// //     dispatch(getUserFail(error.message));
// //   }
// // };

// // // export thunk for add to cart
// // export const addToCart = (id) => async (dispatch) => {
// //   try {
// //     dispatch(addToCartRequest());
// //     const { data } = await userApi.addToCart(id);
// //     dispatch(addToCartSuccess(data));
// //   } catch (error) {
// //     dispatch(addToCartFail(error.message));
// //   }
// // };

// // // export thunk for remove from cart
// // export const removeFromCart = (id) => async (dispatch) => {
// //   try {
// //     dispatch(removeFromCartRequest());
// //     const { data } = await userApi.removeFromCart(id);
// //     dispatch(removeFromCartSuccess(data));
// //   } catch (error) {
// //     dispatch(removeFromCartFail(error.message));
// //   }
// // };

// // // export thunk for update cart
// // export const updateCart = (id, qty) => async (dispatch) => {
// //   try {
// //     dispatch(updateCartRequest());
// //     const { data } = await userApi.updateCart(id, qty);
// //     dispatch(updateCartSuccess(data));
// //   } catch (error) {
// //     dispatch(updateCartFail(error.message));
// //   }
// // };

// // // export selector
// // export const selectUsers = (state) => state.users.users;
// // export const selectUser = (state) => state.users.user;
// // export const selectLoading = (state) => state.users.loading;
// // export const selectError = (state) => state.users.error;
// // export const selectCart = (state) => state.users.cart;
