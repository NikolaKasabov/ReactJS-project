function addProductToCart(productId) {
  fetch(`http://localhost:5000/addProductToCart/${productId}`, {
    method: 'POST',
    credentials: 'include',
  }).then((result) => result.json())
    .then((json) => {
      if (json.error) {
        alert(json.error);
      } else if (json.message) {
        alert(json.message);
      }
    })
    .catch((err) => console.log(err));
}

export default addProductToCart;
