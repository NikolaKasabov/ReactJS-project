import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';

import addProductToCart from '../../utils/addProductToCart';


function ProductCard(props) {
  const { id, imageUrl, description, price } = props;
  const isLogged = Cookies.get('jwt') ? true : false;
  let addToCartButton = '';
  if (isLogged) addToCartButton = <button onClick={() => addProductToCart(id)}>Add to Cart</button>;

  return (
    <div className="product-card">
      <img src={imageUrl} alt="" height="200" />
      <p>Description: {description}</p>
      <p>Price: {price} lv.</p>
      {addToCartButton}
    </div>
  )
}

export default ProductCard;
