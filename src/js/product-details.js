const showProductDetails = (productId) => {
  if(!productId) {
    return showNoProductFound();
  }

  const product = findProduct(productId);

  if(product) {
    const { card } = new ProductCard(product);
    document.querySelector('.section01').append(card);
  }else {
    showNoProductFound();
  }
};

// To get specific product by id
findProduct = (productId) => {
  return products.filter((product) => {
    return product.id === productId;
  })[0];
};

// Display no result found
showNoProductFound = () => {
  const p = document.createElement('p');
  p.textContent = 'No result found';
  document.querySelector('.section01').append(p);
};

window.onload = () => {
  const queryStr = location.search;
  const productId = queryStr.slice(queryStr.length - 3);
  showProductDetails(productId);
};