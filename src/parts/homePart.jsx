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
  // const product = useSelector((state) => state.product);
  // const dispatch = useDispatch();
  // const { loading, error, products } = product;

  // console.log('-x-x-x-x-')
  // console.log('listprod--dispatched');
  console.log('loading', onload);
  // console.log('---------')
  // console.log('after product');
  // console.log(product);
  // console.log('zzzzzzzzzzzzzzzzzzzzz')
  // console.log('products')
  // console.log(dispatch(listProducts()))

  // useEffect(() => {
  //   dispatch(productList());
  // }, [dispatch]);

  // // console.log('-x-x-x-x-')
  // // console.log('listprod--dispatched');
  // // console.log(dispatch(listProducts));
  // // console.log('---------')
  // // console.log('after product');
  // // console.log(product);
  // // console.log('zzzzzzzzzzzzzzzzzzzzz')
  // // console.log('products')
  // // console.log(listProducts(dispatch))

  return (
    // <div className="App">
    //   <h1>Welcome to Simazon!</h1>
    //   {productList.map((item) => {
    //     return <p key={item.id}>{item.title}</p>;
    //   })}
    // </div>

    <div>
      {
        onload ? (
          <LoadingIndicator />
        ) : err ? (
          <Message variant="danger">{err}</Message>
        ) : (
          <div className="row center">
            {productList.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )
      }
    </div>
  );
}
