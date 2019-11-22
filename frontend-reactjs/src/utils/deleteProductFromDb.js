function deleteProductFromDb(productId) {
  fetch(`http://localhost:5000/deleteProductFromDb/${productId}`, {
    method: 'POST',
    credentials: 'include',
  }).then(() => window.location.reload())
    .catch((err) => console.log(err));
}

export default deleteProductFromDb;
