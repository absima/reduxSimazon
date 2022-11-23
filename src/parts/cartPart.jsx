import React, { useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/message';
import { addToCart, cartdata } from '../redux/productSlice';

export default function CartPart(props) {
  const params = useParams();
  const itemID = params.id;

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get('qty');
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const dispatch = useDispatch();
  const incart = useSelector(cartdata);

  console.log(incart)
  console.log('id --cartPart', itemID);
  console.log('qty --cartPart', qty);

  
  // const onload = useSelector(loading);
  // const err = useSelector(error);

 

  useEffect(() => {
    if (itemID) {
      // dispatch(addToCart(productId, qty));
      dispatch(addToCart(itemID, qty));
    }
  }, [itemID, qty]);

  return (
    <div>
      <h1>Cart Section</h1>
      <p>
        ADD TO CART : ProductID: {itemID} Qty: {qty}
      </p>
    </div>
  );
}
