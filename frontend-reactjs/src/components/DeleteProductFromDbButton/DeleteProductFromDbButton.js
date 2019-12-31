import React from 'react';
import fetchData from '../../utils/fetchData';

function DeleteProductFromDbButton(props) {

  function deleteProductFromDb(productId) {
    fetchData({
      url: `http://localhost:5000/deleteProductFromDb/${productId}`,
      method: 'POST',
      withCredentials: true
    }).then(() => window.location.reload())
      .catch((err) => console.log(err));
  }

  return <button className="delete-product" onClick={() => deleteProductFromDb(props.id)}>delete</button>
}

export default DeleteProductFromDbButton;
