const showProductDetails = (productId) => {
  if (!productId) {
    return showNoProductFound();
  }

  const product = findProduct(productId);

  if (product) {
    const { divElem1 } = new ProductInfo(product);
    return divElem1;
  }
  return showNoProductFound();
};

// To get specific product by id
findProduct = (productId) => products.filter((product) => product.id === productId)[0];

// Display no result found
showNoProductFound = () => {
  const p = document.createElement('p');
  p.textContent = 'No product found';
  document.querySelector('.section01').append(p);
};

class ProductInfo {
  constructor(product) {
    this.divElem1 = document.createElement('div');
    this.divElem1.classList = 'row'
    const imgContainer = document.createElement('div');
    imgContainer.classList = 'p-0 col-sm-12 col-md-5';
    imgContainer.innerHTML = `
      <div id=${product.carouselId} class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators">
          <button type="button" data-bs-target=#${product.carouselId} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target=#${product.carouselId} data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target=#${product.carouselId} data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img 
              id=${product.images[0].id}
              src=${product.images[0].src}                         
              class="card-img-top d-block w-100" 
              alt=${product.productName}_img
            />
          </div>
          <div class="carousel-item">
            <img
              id=${product.images[1].id} 
              src=${product.images[1].src}
              class="card-img-top d-block w-100" 
              alt=${product.productName}_img
            />
          </div>
          <div class="carousel-item">
            <img 
              id=${product.images[2].id} 
              src=${product.images[2].src}
              class="card-img-top d-block w-100" 
              alt=${product.productName}_img
            />
          </div>
        </div>
      </div>`;
    const divElem2 = document.createElement('div');
    divElem2.classList = 'card-body  pt-0 col-sm-12 col-md-6 text-md-start';
    divElem2.innerHTML = `
      <div>
        <h2 class="brand fs-4 mt-1 pt-2">${product.productName}</h2>
        <p class="fs-5">
        Brand:
        <span class="fs-7">${product.brandName}</span>
        </p>
        <p class='d-flex justify-content-center justify-content-md-start'>
        <i class="fas fa-star gold-star"></i>
        <i class="fas fa-star gold-star"></i>
        <i class="fas fa-star gold-star"></i>
        <i class="fas fa-star gold-star"></i>
        <i class="far fa-star"></i>
        <span class='ms-2'>${this.calculateNumOfRatings()}</span>
        </p>
        <hr>
        <p class="price">${product.price}</p>
        <p class="prev-price">
          <s>${product.prevPrice}</s>
          <span class="discount ms-1">${this.calculateDiscount(product)}</span>
        </p> 
        <p></   
      </div>`
    this.cartBtn = document.createElement('button');
    this.cartBtn.textContent = '  Add to Cart'
    this.cartBtn.classList = 'btn btn-primary me-2 cart-icon fas fa-cart-plus';
    this.cartBtn.setAttribute('data-product', `${product.productName}`);
    this.cartBtn.setAttribute('data-bs-toggle', 'modal');
    this.cartBtn.setAttribute('data-bs-target', '#addedToCart');
    this.cartBtn.onclick = (e) => this.handleAddToCart(e, product)
    const checkoutBtn = document.createElement('button');
    checkoutBtn.onclick = (e) => this.handleBuyNow(e, product);
    checkoutBtn.textContent = 'Buy Now';
    checkoutBtn.style.fontWeight = 'bold';
    checkoutBtn.classList = 'btn btn-primary btn-sm  mt-0';
    divElem2.append(this.cartBtn, checkoutBtn);
    this.divElem1.append(imgContainer, divElem2);
  }

  //To get num random number of ratings
  calculateNumOfRatings() {
    return Math.floor(Math.random() * (10000 - 500 + 1) )+ 500;
  }

  // Calculate price discount
  calculateDiscount(product) {
    let { price } = product;
    price = Number(price.replace('$', ''));
    let { prevPrice } = product;
    prevPrice = Number(prevPrice.replace('$', ''));
    const discount = parseInt((price - prevPrice ) / prevPrice  * 100) + '%'; 
    return discount;
  }

  handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const { target: btn } = e;
    const cardContainer = btn.parentNode;
    const imageSlider = cardContainer.previousElementSibling.lastChild.children[1]
    const image = imageSlider.querySelector('.active');
    product.id = `P${Date.now()}`;
    product.imageUrl = image.children[0].currentSrc;
    saveToLocalStorage(product);
    updateCartBadge();
    displayOrder(userCartCopy);
  }

  handleBuyNow = (e, product) => {
    this.handleAddToCart(e, product);
    handlePageSwitch('product.html', 'checkout.html');
  }
}

window.onload = () => {
  const queryStr = window.location.search;
  // To get each productid in the query str
  const productId = queryStr.slice(queryStr.length - 3);
  const elem = showProductDetails(productId);
  document.querySelector('.section01').append(elem);
  
  const showRecommendedItems = () => {
    recommendedProducts.forEach((product) => {
      const { card } = new ProductCard(product);
      document.querySelector('.section2 > .row').append(card);
    })
  }
  showRecommendedItems();
};