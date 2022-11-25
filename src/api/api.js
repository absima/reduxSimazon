// not yet correctd to be usable
import axios from 'axios';

export const getProducts = (type) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/type/${type}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getOneProduct = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/oneProduct/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getRandomProduct = () =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/random`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getProductByName = (name) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/name/${name}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getOpponents = (amount) =>
  axios
    .get(import.meta.env.VITE_API_URL + `products/race/${amount}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getPlayers = () =>
  axios
    .get(import.meta.env.VITE_API_URL + 'products/leaderboard')
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const updatePlayer = (name, win) =>
  axios
    .post(import.meta.env.VITE_API_URL + `products/updateplayer`, {
      username: name,
      win: win,
    })
    .then((res) => res.data)
    .catch((error) => console.error(error));
