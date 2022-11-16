import { useContext } from 'react';
import { ProjContext } from '../contexter';
import Product from '../components/product';
import LoadingIndicator from '../components/loading';
import Message from '../components/message';

export default function HomePart() {
  const { products, loading, error } = useContext(ProjContext);
  
  return (
    <div>
      {loading ? (
        <LoadingIndicator />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
