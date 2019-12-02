import React, { useState, useEffect } from 'react';
import './styles.css';

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const totalSum = products.reduce((acc, cur) => acc + Number(cur.price), 0);

  document.title = 'shopping cart';

  // initial products fetch, similar to componentDidMount()
  useEffect(() => {
    fetchProductsAndAddToState();
  }, []);

  function removeProductFromCart(productId) {
    fetch(`http://localhost:5000/removeProductFromCart/${productId}`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => fetchProductsAndAddToState())
      .catch((err) => console.log(err));
  }

  function onCheckoutClick() {
    fetch('http://localhost:5000/checkout', {
      method: 'GET',
      credentials: 'include'
    }).then((response) => response.json())
      .then((result) => {
        if (result.message) {
          setTimeout()
        }
      }).catch((err) => console.log(err));
  }

  function fetchProductsAndAddToState() {
    fetch('http://localhost:5000/seeShoppingCart', {
      credentials: 'include',
    }).then((result) => result.json())
      .then((productsArr) => setProducts(productsArr))
      .catch((err) => console.log(err));
  }

  return (
    <>
      {products.length > 0 ? (
        <table className="shopping-cart-table">
          {/* <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Remove from cart?</th>
            </tr>
          </thead> */}
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
              <td colSpan="3" className="total-sum">TOTAL: <span>{Math.round(totalSum * 100) / 100}</span> lv</td>
              <td><button className="checkout-button" onClick={onCheckoutClick}>checkout</button></td>
            </tr>
          </tfoot>
        </table>
      ) : <h1>there are no products in the cart</h1>}
    </>
  );
}

export default ShoppingCart;
