import React, { useContext, useState } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';
import './styles.css';

function AdminForm() {
  const { changeMessage } = useContext(MessagesContext);
  const [productData, setProductData] = useState({
    'product-description': '',
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

    // send POST request to the server with the new product data
    fetchData({
      url: 'http://localhost:5000/addNewProductToDb',
      method: 'POST',
      withCredentials: true,
      data: formData
    }).then((result) => {
      changeMessage(result.data.message, true, 2000);

      // clean form fields
      setProductData({
        'product-description': '',
        'product-image-url': '',
        'product-price': '',
        'product-category': 'choose',
        'product-image-file': null,
      });
    }).catch((err) => {
      // if express server DID NOT respond
      if (!err.response) {
        changeMessage(err.message, true, 2000);
      } else {
        // if express server DID respond
        changeMessage(err.response.data.error)
      }
    });
  }

  return (
    <>
      <form className="add-product-form" onSubmit={onFormSubmit}>
        <textarea placeholder="description" name="product-description" rows="3" value={productData['product-description']} onChange={onInputChange}></textarea>
        <label htmlFor="product-image-file" className="select-file-label">{productData['product-image-file'] ? 'file selected' : 'click to select an image file'}</label>
        <input type="file" accept="image/*" id="product-image-file" name="product-image-file" onChange={onInputChange} />
        <input type="number" id="product-price" name="product-price" placeholder="price" step="0.01" min="0" value={productData['product-price']} onChange={onInputChange} />
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
