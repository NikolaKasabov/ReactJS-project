import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

function AdminForm() {
  const { changeMessage } = useContext(MessagesContext);
  const [productData, setProductData] = useState({});

  function onInputChange(ev) {
    const inputName = ev.target.name;
    const inputValue = ev.target.value;

    setProductData({
      ...productData,
      [inputName]: inputValue,
    });
  }

  function onFormSubmit(ev) {
    ev.preventDefault();
    changeMessage('Adding product...');

    // send POST request to the express server with the new product data
    fetch('http://localhost:5000/addNewProduct', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: productData['product-description'],
        imageUrl: productData['product-image-url'],
        price: productData['product-price'],
        category: productData['product-category'],
      }),
    })
  }

  return (
    <>
      <h2>Product data:</h2>

      <form onSubmit={onFormSubmit}>
        <label htmlFor="product-description">Description: </label>
        <input id="product-description" name="product-description" onChange={onInputChange} />
        <br />

        <label htmlFor="product-image-url">Image URL: </label>
        <input id="product-image-url" name="product-image-url" onChange={onInputChange} />
        <br />

        <label htmlFor="product-price">Price: </label>
        <input id="product-price" name="product-price" type="number" step="0.01" onChange={onInputChange} />
        <br />

        <label htmlFor="product-category">Category: </label>
        <select name="product-category" id="product-category" onChange={onInputChange}>
          <option value="choose">choose one...</option>
          <option value="tv">tv</option>
          <option value="phone">phone</option>
          <option value="laptop">laptop</option>
        </select>
        <br />

        <button type="submit">Add Product</button>
      </form>
    </>
  );
}

export default AdminForm;
