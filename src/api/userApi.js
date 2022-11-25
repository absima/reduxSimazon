// not yet correctd to be usable
import axios from 'axios';

export const getUsers = (type) =>
  axios
    .get(import.meta.env.VITE_API_URL + `users`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getOneUser = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `users/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// export const getRandomUser = () =>
//   axios
//     .get(import.meta.env.VITE_API_URL + `users/random`)
//     .then((res) => res.data)
//     .catch((error) => console.error(error));

export const getUserByName = (name) =>
  axios
    .get(import.meta.env.VITE_API_URL + `users/${name}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const updateUser = (name, win) =>
  axios
    .post(import.meta.env.VITE_API_URL + `users/updateuser`, {
      username: name,
      win: win,
    })
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const loginUser = (name, win) =>
  axios
    .post(import.meta.env.VITE_API_URL + `users/login`, {
      username: name,
      password: password,
    })
    .then((res) => res.data)
    .catch((error) => console.error(error));
