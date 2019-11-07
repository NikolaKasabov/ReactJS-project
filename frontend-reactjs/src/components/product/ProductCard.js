import React from 'react';

function ProductCard(props) {
  const { imageUrl, description, price } = props;

  return (
    <div className="product-card">
      <img src={imageUrl} alt="" height="200" />
      <p>Description: {description}</p>
      <p>Price: {price} lv.</p>
    </div>
  )
}

export default ProductCard;
