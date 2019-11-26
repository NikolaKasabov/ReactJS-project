import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';

function AdminForm() {
  const { changeMessage } = useContext(MessagesContext);
  const [productData, setProductData] = useState({
    'product-description': '',
    // 'product-image-url': '',
    'product-price': '',
    'product-category': 'choose',
    'product-image-file': null, //////////////
  });

  function onInputChange(ev) {
    const inputName = ev.target.name;
    let inputValue = ev.target.value;

    // file upload testing...
    if (inputName === 'product-image-file') inputValue = ev.target.files[0]; ////////////////

    setProductData({
      ...productData,
      [inputName]: inputValue,
    });
  }

  function onFormSubmit(ev) {
    ev.preventDefault();
    changeMessage('Adding product...');

    // upload file testing.....
    const formData = new FormData();
    formData.append('description', productData['product-description']);
    formData.append('imageFile', productData['product-image-file']);
    formData.append('price', productData['product-price']);
    formData.append('category', productData['product-category']);


    // send POST request to the express server with the new product data
    fetch('http://localhost:5000/addNewProductToDb', {
      method: 'POST',
      credentials: 'include',
      // headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify({
      //   description: productData['product-description'],
      //   imageUrl: productData['product-image-url'],
      //   price: productData['product-price'],
      //   category: productData['product-category'],
      // }),

      // headers: { 'Content-Type': 'multipart/form-data' }, // no headers or it will throw Error: Boundary not found. //info: https://github.com/github/fetch/issues/505
      body: formData, /////////////////////////

    }).then((result) => result.json())
      .then((json) => {
        changeMessage(json.message);
        setProductData({
          'product-description': '',
          'product-image-url': '',
          'product-price': '',
          'product-category': 'choose',
          'product-image-file': null,
        });
      })
      .catch(() => changeMessage('Something went wrong.'))
  }

  return (
    <>
      <h2>Product data:</h2>

      <form onSubmit={onFormSubmit}>
        <label htmlFor="product-description">Description: </label>
        <input type="text" id="product-description" name="product-description" value={productData['product-description']} onChange={onInputChange} />
        <br />

        {/* <label htmlFor="product-image-url">Image URL: </label>
        <input type="text" id="product-image-url" name="product-image-url" value={productData['product-image-url']} onChange={onInputChange} />
        <br /> */}

        <label htmlFor="product-image-file">Image: </label>
        <input type="file" accept="image/*" id="product-image-file" name="product-image-file" onChange={onInputChange} />
        <br />

        <label htmlFor="product-price">Price: </label>
        <input type="number" id="product-price" name="product-price" step="0.01" min="0" value={productData['product-price']} onChange={onInputChange} />
        <br />

        <label htmlFor="product-category">Category: </label>
        <select name="product-category" id="product-category" value={productData['product-category']} onChange={onInputChange}>
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
