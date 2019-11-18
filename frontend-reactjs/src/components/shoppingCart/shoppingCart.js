import React, { useState, useEffect } from 'react';
import './styles.css';

function ShoppingCart() {
  const [products, setProducts] = useState([]);
  const totalSum = products.reduce((acc, cur) => acc + +cur.price, 0);

  // initial products fetch, similar to componentDidMount()
  useEffect(() => {
    fetchProducts();
  }, []);

  function removeProductFromCart(productId) {
    fetch(`http://localhost:5000/removeProductFromCart/${productId}`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => fetchProducts())
      .catch((err) => console.log(err));
  }

  function fetchProducts() {
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
          <thead>
            <tr>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Remove from cart?</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td><img src={product.imageUrl} width="100px" alt={product.description} /></td>
                <td>{product.description}</td>
                <td>{product.price} lv.</td>
                <td><button onClick={() => removeProductFromCart(product.id)}>Remove product</button></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4" className="total-sum">Total: {Math.round(totalSum * 100) / 100} lv.</td>
            </tr>
          </tfoot>
        </table>
      ) : <h1>There are no products in the cart.</h1>}
    </>
  );
}

export default ShoppingCart;
