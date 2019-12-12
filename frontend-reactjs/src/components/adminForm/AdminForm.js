import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import './styles.css';

function AdminForm() {
  const { changeMessage } = useContext(MessagesContext);
  const [productData, setProductData] = useState({
    'product-description': '',
    // 'product-image-url': '',
    'product-price': '',
    'product-category': 'choose',
    'product-image-file': null,
  });

  document.title = 'add product';

  function onInputChange(ev) {
    const inputName = ev.target.name;
    let inputValue = ev.target.value;

    // for file upload field:
    if (inputName === 'product-image-file') inputValue = ev.target.files[0];

    setProductData({
      ...productData,
      [inputName]: inputValue,
    });
  }

  function onFormSubmit(ev) {
    ev.preventDefault();

    // input validations
    if (!productData['product-description']) { return changeMessage('must add description'); }
    else if (!productData['product-image-file']) { return changeMessage('must select image file'); }
    else if (!productData['product-price']) { return changeMessage('must add price'); }
    else if (productData['product-category'] === 'choose') { return changeMessage('must choose category'); }
    else { changeMessage('adding product...'); }


    // must use FormData when uploading a file
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
      body: formData,

    }).then((result) => result.json())
      .then((json) => {
        // if there is an error
        if (json.error) {
          changeMessage(json.error);
          return;
        }

        changeMessage(json.message, true, 2000);
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
      {/* <h1>product data:</h1> */}

      <form className="add-product-form" onSubmit={onFormSubmit}>
        {/* <label htmlFor="product-description">Description: </label> */}
        {/* <input type="text" id="product-description" name="product-description" placeholder="product description" value={productData['product-description']} onChange={onInputChange} /> */}
        <textarea placeholder="description" name="product-description" rows="3" value={productData['product-description']} onChange={onInputChange}></textarea>
        {/* <br /> */}

        {/* <label htmlFor="product-image-url">Image URL: </label>
        <input type="text" id="product-image-url" name="product-image-url" value={productData['product-image-url']} onChange={onInputChange} />
        <br /> */}

        <label htmlFor="product-image-file" className="select-file-label">{productData['product-image-file'] ? 'file selected' : 'click to select an image file'}</label>
        <input type="file" accept="image/*" id="product-image-file" name="product-image-file" onChange={onInputChange} />
        {/* <br /> */}

        {/* <label htmlFor="product-price">Price: </label> */}
        <input type="number" id="product-price" name="product-price" placeholder="price" step="0.01" min="0" value={productData['product-price']} onChange={onInputChange} />
        {/* <br /> */}

        {/* <label htmlFor="product-category">Category: </label> */}
        <select name="product-category" id="product-category" value={productData['product-category']} onChange={onInputChange}>
          <option value="choose">choose category...</option>
          <option value="tv">tv</option>
          <option value="phone">phone</option>
          <option value="laptop">laptop</option>
        </select>
        <br />

        <input type="submit" value="ADD PRODUCT" />
      </form>
    </>
  );
}

export default AdminForm;
