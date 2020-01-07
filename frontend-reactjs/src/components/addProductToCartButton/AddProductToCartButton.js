import React, { useContext } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';

function AddProductToCartButton(props) {
  const { changeMessage } = useContext(MessagesContext);

  function addProductToCart(productId) {
    fetchData({
      url: `http://localhost:5000/addProductToCart/${productId}`,
      method: 'POST',
      withCredentials: true
    }).then((result) => changeMessage(result.data.message, true, 1500))
      .catch((err) => {
        // if express server DID NOT respond
        if (!err.response) {
          changeMessage(err.message, true, 2000);
        } else {
          // if express server DID respond
          changeMessage(err.response.data.error);
        }
      });
  }

  return (
    <button onClick={() => addProductToCart(props.id)}>add to cart</button>
  );
}

export default AddProductToCartButton;
