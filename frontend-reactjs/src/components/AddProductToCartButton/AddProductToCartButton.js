import React, { useContext } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

function AddProductToCartButton(props) {
  const { changeMessage } = useContext(MessagesContext);

  function addProductToCart(productId) {
    fetch(`http://localhost:5000/addProductToCart/${productId}`, {
      method: 'POST',
      credentials: 'include',
    }).then((result) => result.json())
      .then((json) => {
        if (json.error) { alert(json.error); }
        else if (json.message) {
          changeMessage('product successfully added to the shopping cart', true, 2500);
        }
      }).catch((err) => console.log(err));
  }
  
  return (
    <button onClick={() => addProductToCart(props.id)}>add to cart</button>
  );
}

export default AddProductToCartButton;
