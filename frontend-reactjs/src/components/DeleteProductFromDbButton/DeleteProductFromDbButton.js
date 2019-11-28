import React from 'react';

function DeleteProductFromDbButton(props) {

  function deleteProductFromDb(productId) {
    fetch(`http://localhost:5000/deleteProductFromDb/${productId}`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => window.location.reload())
      .catch((err) => console.log(err));  
  }

  return <button className="delete-product" onClick={() => deleteProductFromDb(props.id)}>delete</button>
}

export default DeleteProductFromDbButton;
