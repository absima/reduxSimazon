// import { useContext } from 'react';
// import { ProjContext } from '../contexter';
import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import listProducts from '../redux/productActions';
// import { productList } from '../redux/prodredux';

import {
  getProductsAsync,
  products,
  loading,
  error,
} from '../redux/productSlice';

export default function HomePart() {
  const productList = useSelector(products);
  const onload = useSelector(loading);
  const err = useSelector(error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsAsync());
  }, []);

  return (
    <div>
      {onload ? (
        <LoadingIndicator />
      ) : err ? (
        <Message variant="danger">{err}</Message>
      ) : (
        <div className="row center">
          {productList.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
