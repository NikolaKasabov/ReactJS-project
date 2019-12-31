import React, { useState, useEffect, useContext } from 'react';
import { MessagesContext } from '../../contexts/MessagesContext';
import fetchData from '../../utils/fetchData';
import './styles.css';

function ShoppingCart(props) {
  const { changeMessage } = useContext(MessagesContext);
  const [products, setProducts] = useState([]);
  const totalSum = products.reduce((acc, cur) => acc + Number(cur.price), 0);

  document.title = 'shopping cart';

  // initial products fetch, similar to componentDidMount(), because of the [] as second argument
  useEffect(() => fetchProductsAndAddToState(), []);

  function removeProductFromCart(productId) {
    fetchData({
      url: `http://localhost:5000/removeProductFromCart/${productId}`,
      method: 'POST',
      withCredentials: true
    }).then(() => fetchProductsAndAddToState())
      .catch((err) => {
        // if express server DID NOT respond
        if (!err.response) {
          changeMessage(err.message);
        } else {
          // if exress server DID respond
          changeMessage(err.response.data.error);
        }
      });
  }

  // empty the shopping cart, show message and redirect to the home page
  function onCheckoutClick() {
    fetchData({
      url: 'http://localhost:5000/checkout',
      withCredentials: true
    }).then((result) => {
      changeMessage('thanks for shopping from us. checkout successful');
      setTimeout(() => props.history.push('/'), 2500);
    }).catch((err) => {
      // if express server DID NOT respond
      if (!err.response) {
        changeMessage(err.message);
      } else {
        // if exress server DID respond
        changeMessage(err.response.data.error);
      }
    });
  }

  function fetchProductsAndAddToState() {
    fetchData({
      url: 'http://localhost:5000/shoppingCart',
      withCredentials: true
    }).then((result) => setProducts(result.data))
      .catch((err) => {
        // if express server DID NOT respond
        if (!err.response) {
          changeMessage(err.message);
        } else {
          // if exress server DID respond
          changeMessage(err.response.data.error);
        }
      });
  }

  return (
    <>
      {products.length > 0 ? (
        <table className="shopping-cart-table">
          <tbody>
            {products.map((product, index) => {
              const imageUrlSmall = product.imageUrl.replace('/dq2snomti/image/upload/', '/dq2snomti/image/upload/c_scale,w_100/');  // only when images are hosted at Cloudinary.com
              const description = product.description.slice(0, 60) + (product.description.length > 60 ? '...' : '');

              return <tr key={index}>
                <td><img src={imageUrlSmall} width="80px" alt={product.description} /></td>
                <td>{description}</td>
                <td>{Number(product.price).toFixed(2)} lv</td>
                <td><button className="delete-product-button" onClick={() => removeProductFromCart(product.id)}>remove</button></td>
              </tr>
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" className="total-sum">TOTAL: <span>{(Math.round(totalSum * 100) / 100).toFixed(2)}</span> lv</td>
              <td><button className="checkout-button" onClick={onCheckoutClick}>checkout</button></td>
            </tr>
          </tfoot>
        </table>
      ) : <h1>there are no products in the cart</h1>}
    </>
  );
}

export default ShoppingCart;
