const showProductDetails = (productId) => {
  if (!productId) {
    return showNoProductFound();
  }

  const product = findProduct(productId);

  if (product) {
    const { card } = new ProductCard(product);
    return card;
  }
  return showNoProductFound();
};

// To get specific product by id
findProduct = (productId) => products.filter((product) => product.id === productId)[0];

// Display no result found
showNoProductFound = () => {
  const p = document.createElement('p');
  p.textContent = 'No result found';
  document.querySelector('.section01').append(p);
};

window.onload = () => {
  const queryStr = window.location.search;
  const productId = queryStr.slice(queryStr.length - 3);
  const elem = showProductDetails(productId);
  document.querySelector('.section01').append(elem);
};