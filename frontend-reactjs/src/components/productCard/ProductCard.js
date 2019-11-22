import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';

import addProductToCart from '../../utils/addProductToCart';
import deleteProductFromDb from '../../utils/deleteProductFromDb';

function ProductCard(props) {
  const { id, imageUrl, description, price } = props;
  const imageUrlSmall = imageUrl.replace('/dq2snomti/image/upload/', '/dq2snomti/image/upload/c_scale,w_200/');  // only when images are hosted at Cloudinary.com
  const isLogged = Cookies.get('jwt') ? true : false;
  const isAdmin = Cookies.get('username') === 'admin' ? true : false;
  const addToCartButton = <button onClick={() => addProductToCart(id)}>Add to Cart</button>;
  const deleteProductFromDbButton = <button onClick={()=>deleteProductFromDb(id)}>Delete Product</button>

  return (
    <div className="product-card">
      <a href={imageUrl} target="_blank" rel="noopener noreferrer"><img src={imageUrlSmall} width="200px" alt="" /></a>
      
      <p>{description}.</p>
      <p>{price} lv.</p>
      {isLogged && addToCartButton}
      {isAdmin && deleteProductFromDbButton}
    </div>
  )
}

export default ProductCard;
