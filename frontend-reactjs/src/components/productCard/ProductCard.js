import React from 'react';
import Cookies from 'js-cookie';
import './styles.css';

import AddProductToCartButton from '../AddProductToCartButton/AddProductToCartButton';
import DeleteProductFromDbButton from '../DeleteProductFromDbButton/DeleteProductFromDbButton';


function ProductCard(props) {
  const { id, imageUrl, description, price } = props;
  const imageUrlSmall = imageUrl.replace('/dq2snomti/image/upload/', '/dq2snomti/image/upload/c_scale,w_200/');  // only when images are hosted at Cloudinary.com
  const isLogged = Cookies.get('jwt') ? true : false;
  const isAdmin = Cookies.get('username') === 'admin' ? true : false;
  // const deleteProductFromDbButton = <button onClick={() => deleteProductFromDb(id)}>delete product</button>

  return (
    <div className="product-card">
      <a href={imageUrl} target="_blank" rel="noopener noreferrer"><img src={imageUrlSmall} width="200px" alt="" /></a>

      <p className="product-card-description">{description}.</p>
      <p className="product-card-price">{price} lv.</p>
      <div className="product-card-buttons">
        {isLogged && <AddProductToCartButton id={id} />}
        {isAdmin && <DeleteProductFromDbButton id={id} />}
      </div>
    </div>
  )
}

export default ProductCard;
