class ProductCard{
  constructor(item) {
    this.card = document.createElement('div');
    this.card.classList = 'col-sm-12 col-md-6 col-lg-3 p-0';
    this.card.id = item.id;
    const itemCard = document.createElement('div');
    itemCard.classList = 'card w-90';
    itemCard.innerHTML = `
      <div id=${item.carouselId} class="carousel slide" data-bs-ride="false">
        <div class="carousel-indicators">
          <button type="button" data-bs-target=#${item.carouselId} data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target=#${item.carouselId} data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target=#${item.carouselId} data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img 
              id=${item.images[0].id}
              src=${item.images[0].src}                         
              class="card-img-top d-block w-100" 
              alt=${item.productName}_img
            />
          </div>
          <div class="carousel-item">
            <img
              id=${item.images[1].id} 
              src=${item.images[1].src}
              class="card-img-top d-block w-100" 
              alt=${item.productName}_img
            />
          </div>
          <div class="carousel-item">
            <img 
              id=${item.images[2].id} 
              src=${item.images[2].src}
              class="card-img-top d-block w-100" 
              alt=${item.productName}_img
            />
          </div>
        </div>
        <div class="discount-tag p-1 position-absolute top-0 end-0">-30%</div>
      </div>`;
      const cardBody = document.createElement('div');
      cardBody.className = 'card-body'
      cardBody.innerHTML = `
        <h6 class="brand">${item.brandName}</h6>
        <p class="card-text mb-0 p-0">${item.productName}</p>
        <div class="d-flex p-0 justify-content-center">
          <p class="price">${item.price}</p>
          <p class="ms-2 prev-price"><s>${item.prevPrice}</s></p>
        </div>`;
      const cartBtn = document.createElement('button');
      cartBtn.classList = 'icon position-absolute end-0 cart-icon fas fa-cart-plus',
      cartBtn.setAttribute('data-product', `${item.productName}`);
      cartBtn.setAttribute('data-bs-toggle', "modal");
      cartBtn.setAttribute('data-bs-target',  "#addedToCart"); 
      cartBtn.onclick = (e) => this.handleAddToCart(e, item);
      cardBody.append(cartBtn);
      itemCard.append(cardBody)
      this.card.append(itemCard);
      this.card.onclick = (e) => this.handleProductDetails(e, item.id);
  }

  handleProductDetails = (e, productId) => {
    e.stopPropagation();
    handlePageSwitch('index.html', `product.html?productId=${productId}`);
  }

  handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const { target: btn } = e;
    const cardContainer = btn.parentNode;
    const imageSlider = cardContainer.offsetParent.childNodes[1].children[1];
    const image = imageSlider.querySelector('.active');
    
    product.id = `P${Date.now()}`;
    product.imageUrl = image.children[0].currentSrc;  
    saveToLocalStorage(product);
    displayOrder(userCartCopy);
  } 
}