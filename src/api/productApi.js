// not yet correctd to be usable
import axios from 'axios';

export const getProducts = (type) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getOneProduct = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// export const getRandomProduct = () =>
//   axios
//     .get(import.meta.env.VITE_API_URL + `products/random`)
//     .then((res) => res.data)
//     .catch((error) => console.error(error));

export const getProductByName = (name) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/${name}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));


export const updateProduct = (name, win) =>
  axios
    .post(import.meta.env.VITE_API_URL + `products/updateproduct`, {
      username: name,
      win: win,
    })
    .then((res) => res.data)
    .catch((error) => console.error(error));
