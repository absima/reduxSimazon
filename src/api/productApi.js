// not yet correctd to be usable
import axios from 'axios';

// create product in db
export const createProduct = (product) =>
  axios
    .post(import.meta.env.VITE_API_URL + `product`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getProducts = (type) =>
  axios
    .get(import.meta.env.VITE_API_URL + `product`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

export const getOneProduct = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `product/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// update product in db by id
export const updateProduct = (id, product) =>
  axios
    .put(import.meta.env.VITE_API_URL + `product/${id}`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));
// delete product in db by id
export const deleteProduct = (id) =>
  axios
    .delete(import.meta.env.VITE_API_URL + `product/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// add product to cart in db
export const addProductToCart = (id, product) =>  
  axios
    .put(import.meta.env.VITE_API_URL + `product/cart/${id}`, product)
    .then((res) => res.data)
    .catch((error) => console.error(error));
// delete product from cart in db
export const deleteProductFromCart = (id) =>
  axios
    .delete(import.meta.env.VITE_API_URL + `product/cart/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

// get cart from db
export const getCart = (id) =>
  axios
    .get(import.meta.env.VITE_API_URL + `product/cart/${id}`)
    .then((res) => res.data)
    .catch((error) => console.error(error));

    