import React from 'react';
import './styles.css';

function ProductCard(props) {
  const { id, imageUrl, description, price } = props;



  return (
    <div className="product-card">
      <img src={imageUrl} alt="" height="200" />
      <p>Description: {description}</p>
      <p>Price: {price} lv.</p>
      <button onClick={() => props.addProductToCart(id)}>Add to Cart {id}</button>
    </div>
  )
}

export default ProductCard;
