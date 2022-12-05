import { Link } from 'react-router-dom';
import Rating from '../components/rating';

export default function HomePage(props) {
  return (
    <div>
      <h1>Home Page</h1>
      {/* featured products */}
      <div>
        <h2>Featured Products</h2>
        <div>
          <div>
            <div>
              <Link to="/product/63858c3dda33dbfc031a95ba">
                <img 
                  src="https://dummyjson.com/image/i/products/6/thumbnail.png"
                  alt="product"
                />
              </Link>
            </div>
            <div>
              <Link to="/product/63858c3dda33dbfc031a95ba">Product 1</Link>
            </div>
            <div>
              <Rating rating={4.5} numReviews={10}></Rating>
            </div>
            <div>€ 10</div>
          </div>
          <div>
            <div>
              <Link to="/product/63858c3dda33dbfc031a95ba">
                <img
                  src="https://dummyjson.com/image/i/products/6/thumbnail.png"
                  alt="product"
                />
              </Link>
            </div>
            <div>
              <Link to="/product/63858c3dda33dbfc031a95ba">Product 1</Link>
            </div>
            <div>
              <Rating rating={4.5} numReviews={10}></Rating>
            </div>
            <div>€ 10</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// // import { useContext } from 'react';
// // import { ProjContext } from '../contexter';
// import Product from '../components/product';
// import LoadingIndicator from '../components/loading';
// import Message from '../components/message';

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import listProducts from '../redux/productActions';
// // import { productList } from '../redux/prodredux';
// // import { getProducts } from '../api/productApi';

// import {
//   getProductsAsync,
//   products,
//   loading,
//   error,
// } from '../redux/productSlice';

// export default function HomePart() {
//   const productList = useSelector(products);
//   const onload = useSelector(loading);
//   const err = useSelector(error);
//   const dispatch = useDispatch();
//   console.log(productList)

//   useEffect(() => {
//     dispatch(getProductsAsync());
//   }, []);

//   return (
//     <div>
//       {onload ? (
//         <LoadingIndicator />
//       ) : err ? (
//         <Message variant="danger">{err}</Message>
//       ) : (
//         <div className="row center">
//           {productList.map((product) => (
//             <Product key={product._id} product={product} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }
