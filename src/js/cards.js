class ProductCard {
  constructor(item) {
    this.card = document.createElement('div');
    this.card.classList = 'col-sm-12 col-md-6 mt-3 col-lg-3 p-0';
    this.card.id = item.id;
    this.card.style.cursor = 'pointer';
    const itemCard = document.createElement('div');
    itemCard.classList = 'card w-90';
    itemCard.innerHTML = `
      <div>
        <img 
          src=${item.imageUrl}                         
          class="card-img-top d-block w-100" 
          alt=${item.productName}_img
        />
      </div>
      <div class="discount-tag p-1 position-absolute top-0 end-0">${this.calculateDiscount(item.price, item.prevPrice)}</div>`;
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardBody.innerHTML = `
        <h6 class="brand">${item.brandName}</h6>
        <p class="card-text mb-0 p-0">${item.productName}</p>
        <div class="d-flex p-0 justify-content-center">
          <p class="price">${item.price}</p>
          <p class="ms-2 prev-price"><s>${item.prevPrice}</s></p>
        </div>`;
    const paragraph = document.createElement('p');
    paragraph.className = 'd-none product-info';
    paragraph.textContent = `${item.productInfo}`;
    const cartBtn = document.createElement('button');
    cartBtn.classList = 'icon position-absolute end-0 cart-icon fas fa-cart-plus';
    cartBtn.setAttribute('data-product', `${item.productName}`);
    cartBtn.setAttribute('data-bs-toggle', 'modal');
    cartBtn.setAttribute('data-bs-target', '#addedToCart');
    cartBtn.onclick = (e) => this.handleAddToCart(e, item);
    cardBody.append(cartBtn, paragraph);
    itemCard.append(cardBody);
    this.card.append(itemCard);
    this.card.onclick = (e) => this.handleProductDetails(e, item.id);
  }

  handleProductDetails = (e, productId) => {
    e.stopPropagation();
    // Routes to a new page
    handlePageSwitch(`product.html?productId=${productId}`);
  }

  calculateDiscount = (productPrice, oldPrice) => {
    const price = Number(productPrice.replace('$', ''));
    const prevPrice = Number(oldPrice.replace('$', ''));
    const discount = `${parseInt(((price - prevPrice) / prevPrice) * 100)}%`;
    return discount;
  }

  handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    product.id = `P${Date.now()}`;
    saveToLocalStorage(product);
    updateCartBadge();
    displayOrder(userCartCopy);
  }
}
