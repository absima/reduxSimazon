import axios from 'axios';

// // create user
// export const createUser = (user) =>
//   axios
//     .post(import.meta.env.VITE_API_URL + `user`, user)
//     .then((res) => res.data)
//     .catch((error) => console.error(error));

// register user using name, email, password
export const register = (name, email, password, passwordCheck) =>
  axios
    .post(import.meta.env.VITE_API_URL + `user/register`, { name, email, password, passwordCheck })
    .then((res) => res.data)  
    .catch((error) => console.error(error));



// export const register = (user) =>
//   axios
//     .post(import.meta.env.VITE_API_URL + `user/register`, { email, password})
//     .then((res) => res.data)
//     .catch((error) => console.error(error));



// sign in
export const login = (email, password) =>
  axios
    .post(import.meta.env.VITE_API_URL + `user/login`, { email, password })
    .then((res) => res.data)
    .catch((error) => console.error(error));

// sign out
export const logout = () =>
  axios
    .get(import.meta.env.VITE_API_URL + `user/logout`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// update user by id
export const updateUser = (id, user) =>
  axios
    .put(import.meta.env.VITE_API_URL + `user/${id}`, user)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// delete user by id
export const deleteUser = (id) =>
  axios
    .delete(import.meta.env.VITE_API_URL + `user/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get user by id
export const getUser = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `user/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get all users
export const getUsers = () =>
  axios
    .get(import.meta.env.VITE_API_URL + `user`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get user by email
export const getUserByEmail = (email) =>
  axios
    .get(import.meta.env.VITE_API_URL + `user/email/${email}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get user by email and password
export const getUserByEmailAndPassword = (email, password) =>
  axios
    .get(
      import.meta.env.VITE_API_URL + `user/email/${email}/password/${password}`
    )
    .then((res) => res.data)
    .catch((error) => console.error(error));
