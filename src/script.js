// Global Variables
const seeMoreBtn = document.getElementById('see-more');
const addToCartIcons = document.querySelectorAll('button[data-product]');
const orderDetails = document.querySelector('.order-details');
const total = document.querySelector('.total');
let userCartCopy = [];

const handleSeeMore = (e) => {
  e.preventDefault();
  const btn = e.target;
  const secondRow = document.querySelector('#xtra-product-display');
  secondRow.classList.toggle('d-md-flex');
  btn.innerHTML = (btn.innerHTML === 'See More') ? 'See Less' : 'See More';
};

const handleAddToCart = (e) => {
  e.preventDefault();
  e.stopPropagation();

  const { target: btn } = e;
  const cardContainer = btn.parentNode;
  const imageSlider = cardContainer.offsetParent.childNodes[1].children[1];
  const image = imageSlider.querySelector('.active');

  const product = {
    id: `P${Date.now()}`,
    brandName: cardContainer.querySelector('.brand').innerText,
    imageUrl: image.children[0].currentSrc,
    price: cardContainer.querySelector('.price').innerText,
    prevPrice: cardContainer.querySelector('.prev-price').innerText,
    productName: cardContainer.querySelector('.card-text').innerText,
  };

  saveToLocalStorage(product);
  displayOrder(userCartCopy);
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
    this.productImg.classList = 'col-sm-12 col-md-3';
    this.productImg.innerHTML = `
      <img 
        class="order-img float-start" 
        src=${product.imageUrl} 
        alt=${product.productName}_img
      >`;
    this.productDetails = document.createElement('div');
    this.productDetails.classList = 'col-sm-12 col-md-9  pb-4 position-relative';
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
    plusBtn.onclick = this.handleIncrementQty;
    const minusBtn = document.createElement('span');
    minusBtn.classList = 'minus-icon ms-2';
    minusBtn.innerText = '-';
    minusBtn.onclick = this.handleDecrementQty;
    const numOfItems = document.createElement('span');
    numOfItems.classList = 'num-of-items btn-dark pe-2 ps-2';
    numOfItems.textContent = '1';
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
  }

  handleIncrementQty = (e) => {
    e.stopPropagation();
    let qtyOfProduct = document.querySelector('.num-of-items').textContent;
    qtyOfProduct = parseInt(qtyOfProduct);
    qtyOfProduct += 1;
    // Fix this bug later
    document.querySelectorAll('.num-of-items').forEach((elem) => elem.textContent = qtyOfProduct);
    calculateTotalPrice();
  }

  handleDecrementQty = (e) => {
    e.stopPropagation();
    let qtyOfProduct = document.querySelector('.num-of-items').textContent;
    qtyOfProduct = parseInt(qtyOfProduct);
    qtyOfProduct = (qtyOfProduct <= 0) ? qtyOfProduct : qtyOfProduct - 1;
    // Fix this bug later
    document.querySelectorAll('.num-of-items').forEach((elem) => elem.textContent = qtyOfProduct);
    calculateTotalPrice();
  }
}

const displayOrder = (cart) => {
  orderDetails.innerHTML = '';
  cart.forEach((item) => {
    const { productImg, productDetails } = new Order(item);

    if (total) {
      orderDetails.append(productImg, productDetails);
    }
  });
  calculateTotalPrice();
};

const calculateTotalPrice = () => {
  document.querySelector('.total-price').innerHTML = '';
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
  document.querySelector('.total-price').textContent = `$${totalPrice}.00`;
};

window.onload = () => {
  if (addToCartIcons) {
    addToCartIcons.forEach((cartIcon) => {
      cartIcon.addEventListener('click', handleAddToCart);
    });
  }

  if (seeMoreBtn) {
    seeMoreBtn.addEventListener('click', handleSeeMore);
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
};
