import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';

import addProductToCart from '../../utils/addProductToCart';

function ProductCard(props) {
  const { id, imageUrl, description, price } = props;
  const imageUrlSmall = imageUrl.replace('/upload/', '/upload/c_scale,w_200/');  // only when images are hosted in Cloudinary.com
  const isLogged = Cookies.get('jwt') ? true : false;
  let addToCartButton = '';
  if (isLogged) addToCartButton = <button onClick={() => addProductToCart(id)}>Add to Cart</button>;

  return (
    <div className="product-card">
      <a href={imageUrl} target="_blank" rel="noopener noreferrer"><img src={imageUrlSmall} width="200px" alt="" /></a>
      
      <p>{description}.</p>
      <p>{price} lv.</p>
      {addToCartButton}
    </div>
  )
}

export default ProductCard;
