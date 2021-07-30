// Global Variables
const orderDetailsElem = document.querySelector('.order-details');
const totalElem = document.querySelector('.total');
// Local Storage Copy
let userCartCopy = [];

const handleSeeMore = (e) => {
  e.preventDefault();
  const btn = e.target;
  const secondRow = document.querySelector('#xtra-product-display');
  secondRow.classList.toggle('d-md-flex');
  btn.innerHTML = (btn.innerHTML === 'See More') ? 'See Less' : 'See More';
};

const saveToLocalStorage = (item) => {
  let userCart = localStorage.getItem('userCart');
  userCart = JSON.parse(userCart);
  userCart.push(item);
  userCartCopy = [...userCart];
  localStorage.setItem('userCart', JSON.stringify(userCart));
};

class Order {
  constructor(product) {
    this.productImg = document.createElement('div');
    this.productImg.classList = 'col-sm-12 col-md-3 p-0';
    this.productImg.innerHTML = `
      <img 
        class="order-img float-start" 
        src=${product.imageUrl} 
        alt=${product.productName}_img
      >`;
    this.productDetails = document.createElement('div');
    this.productDetails.id = 'order-details-container';
    this.productDetails.classList = 'col-sm-12 col-md-8  p-0 mb-4 position-relative';
    this.productDetails.innerHTML = `
      <h6 class="product-brand">${product.brandName}</h6>
      <p>Product Code:<u>${product.id}</u></p>
      <div>
        <p class="mb-0">Price</p>
        <div class="d-flex">
          <p class="price">${product.price}</p>
          <p class="ms-2"><s>${product.prevPrice}</s></p>
      </div>`;
    const productSpecContainer = document.createElement('div');
    productSpecContainer.classList = 'product-spec row';
    const qtyContainer = document.createElement('div');
    qtyContainer.className = 'qty col-6';
    productSpecContainer.append(qtyContainer);
    const qtyHeading = document.createElement('h6');
    qtyHeading.textContent = 'Quantity:';
    const btnContainer = document.createElement('div');
    btnContainer.classList = 'd-flex justify-content-center align-items-center';
    const plusBtn = document.createElement('span');
    plusBtn.classList = 'plus-icon me-2';
    plusBtn.innerText = '+';
    plusBtn.onclick = (e) => this.handleIncrementQty(e, product.id);
    const minusBtn = document.createElement('span');
    minusBtn.classList = 'minus-icon ms-2';
    minusBtn.innerText = '-';
    minusBtn.onclick = (e) => this.handleDecrementQty(e, product.id);
    const numOfItems = document.createElement('span');
    numOfItems.classList = `${product.id} num-of-items btn-dark pe-2 ps-2`;
    numOfItems.textContent = product.quantity;
    btnContainer.append(plusBtn, numOfItems, minusBtn);
    qtyContainer.append(qtyHeading, btnContainer);
    const itemSize = document.createElement('div');
    itemSize.className = 'size col-3';
    itemSize.innerHTML = `
      <h6>Size</h6> 
      <p class="size d05 mt-0 md-txt-sz p-1">L</p>`;
    const itemColor = document.createElement('div');
    itemColor.classList = 'item-color col-3';
    itemColor.innerHTML = ` 
      <h6>Color</h6> 
      <p class="color d05 md-txt-sz mt-0 p-1">White</p>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', `${product.id}`);
    deleteBtn.classList = 'edit-icons fas fa-trash position-absolute end-0';
    deleteBtn.onclick = this.handleDelete;
    const editBtn = document.createElement('button');
    editBtn.onclick = this.handleEdit;
    editBtn.className = 'edit-icons fas fa-pen position-absolute translate-middle-y end-0';
    productSpecContainer.append(itemSize, itemColor);
    productSpecContainer.append(deleteBtn, editBtn);
    this.productDetails.append(productSpecContainer);
  }

  handleDelete = (e) => {
    e.stopPropagation();
    const { target: { dataset: { id } } } = e;
    let userCart = localStorage.getItem('userCart');
    userCart = JSON.parse(userCart);

    // Delete Order
    userCart = userCart.filter((product) => product.id !== id);
    userCartCopy = [...userCart];

    // Reset Local Storage
    localStorage.setItem('userCart', JSON.stringify(userCart));

    displayOrder(userCartCopy);
  }

  handleEdit = (e) => {
    e.stopPropagation();
    handlePageSwitch('checkout.html', 'product.html');
  }

  handleIncrementQty = (e, productId) => {
    e.stopPropagation();
    let qtyOfProduct = document.querySelector(`.${productId}`).textContent;
    qtyOfProduct = parseInt(qtyOfProduct) + 1;
    updateProductQty(qtyOfProduct);
    document.querySelector(`.${productId}`).textContent = qtyOfProduct;
    calculateTotalPrice();
  }

  handleDecrementQty = (e, productId) => {
    e.stopPropagation();
    let qtyOfProduct = document.querySelector(`.${productId}`).textContent;
    qtyOfProduct = parseInt(qtyOfProduct);
    qtyOfProduct = (qtyOfProduct === 0) ? qtyOfProduct : qtyOfProduct - 1;
    document.querySelector(`.${productId}`).textContent = qtyOfProduct;
    calculateTotalPrice();
  }
}

const displayOrder = (cart) => {
  orderDetailsElem.innerHTML = ''; 
  if(cart.length > 0) {
    if(orderDetailsElem) {
      cart.forEach((item) => {
        const { productImg, productDetails } = new Order(item);        
        if (totalElem) {
          orderDetailsElem.append(productImg, productDetails);
        }
      });
    }
    calculateTotalPrice();    
  }else {
    const checkoutBtn = document.querySelector('#checkout');
    checkoutBtn.style.display = 'none';
    document.querySelector('.no-item-msg').classList.remove('d-none');
  }

};

const updateProductQty = (qty) => {
  let userCart = localStorage.getItem('userCart');
  userCart = JSON.parse(userCart);
  userCart = userCart.map((item) => {
    item.quantity = qty;
    return item;
  });
  userCartCopy = [...userCart];
  localStorage.setItem('userCart', JSON.stringify(userCart));
};

const calculateTotalPrice = () => {
  const totalPriceElem = document.querySelector('.total-price');
  if(totalPriceElem) {
    totalPriceElem.innerHTML = '';
    let totalPrice = 0;
    if (userCartCopy.length === 1) {
      let priceOfItem = document.querySelector('.price').innerText;
      priceOfItem = parseInt(priceOfItem.replace('$', ''));
      let qty = document.querySelector('.num-of-items').innerText;
      qty = parseInt(qty);
      totalPrice = priceOfItem * qty;
    } else if (userCartCopy.length > 1) {
      let pricesOfItems = document.querySelectorAll('.price');
      pricesOfItems = Array
        .from(pricesOfItems)
        .map((elem) => parseInt(elem.innerText.replace('$', '')));
  
      let qty = document.querySelectorAll('.num-of-items');
      qty = Array
        .from(qty)
        .map((elem) => parseInt(elem.innerText.replace('$', '')));
  
      for (let i = 0; i < pricesOfItems.length && i < qty.length; i += 1) {
        totalPrice += pricesOfItems[i] * qty[i];
      }
    } else {
      totalPrice = 0.00;
    }
    totalPriceElem.textContent = `$${totalPrice}.00`;
  }
};

const handlePageSwitch = (currentUrl, newUrl) => {
  const url = window.location.href.replace(currentUrl, newUrl);
  window.location.href = url;
};

const activateProductRouter = () => {
  const productCards = document.querySelectorAll('.card-img-top');
  productCards.forEach((card) => card.addEventListener('click', (e) => {
    const { id: cardId } = e.target;
    handlePageSwitch('index.html', `product.html?productId=${cardId}`);    
  }));
}

window.onload = () => {
  const cartBtn = document.querySelector('.modal-footer > .btn-primary');
  const seeMoreBtn = document.getElementById('see-more');
  const addToCartIcons = document.querySelectorAll('button[data-product]');
  const productSection = document.querySelector('#product-section');

  if(productSection) {
    products.forEach((product) => {
      const { card } = new ProductCard(product);
      productSection.insertBefore(card, seeMoreBtn);
    })
  }

  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', handleSeeMore);
  }

  if (cartBtn) {
    cartBtn.addEventListener('click', () => handlePageSwitch('index.html', 'cart.html'));
  }

  if (document.getElementById('checkout')) {
    document.getElementById('checkout').addEventListener('click', (e) => {
      handlePageSwitch('cart.html', 'checkout.html');
    });
  }

  let userCart = localStorage.getItem('userCart');

  if (userCart) {
    userCart = JSON.parse(userCart);
    userCartCopy = [...userCart];
  } else {
    userCart = [];
    localStorage.setItem('userCart', JSON.stringify(userCart));
  }

  displayOrder(userCartCopy);
  // activateProductRouter();
};