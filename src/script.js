const seeMoreBtn = document.getElementById('see-more');
const addToCartIcons = document.querySelectorAll('button[data-product]');
const total = document.querySelector('.total');
let userCartCopy = [];

let userCart = localStorage.getItem('userCart');
if (userCart) {
  userCart = JSON.parse(userCart);
  userCartCopy = [...userCart];
} else {
  userCart = [];
  localStorage.setItem('userCart', JSON.stringify(userCart));
}

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
    this.card = document.createElement('div');
    this.card.className = 'br-bottom';
    this.card.innerHTML = `
      <img class="order-img float-start" src=${product.imageUrl} alt=${product.productName}_img>
      <h6 class="product">${product.brandName}</h6>
      <p>Product Code:<u>${product.id}</u></p>
      <div>
        <p>Price</p>
        <div>
          <p>${product.price}</p>
          <p><s></s></p>
      </div>`;
    const productSpecContainer = document.createElement('div');
    productSpecContainer.classList = 'product-spec row';
    const qtyContainer = document.createElement('div');
    qtyContainer.class = 'qty col-6';
    productSpecContainer.append(qtyContainer);
    const qtyHeading = document.createElement('h6');
    qtyHeading.textContent = 'Quantity';
    const btnContainer = document.createElement('div');
    btnContainer.classList = 'd-flex';
    const plusBtn = document.createElement('button');
    plusBtn.classList = 'plus-icon icon';
    plusBtn.innerText = '+';
    const minusBtn = document.createElement('button');
    minusBtn.classList = 'minus-icon icon';
    minusBtn.innerText = '-';
    const numOfItems = document.createElement('span');
    numOfItems.className = 'nu-of-items';
    numOfItems.innerText = '8';
    btnContainer.append(plusBtn, numOfItems, minusBtn);
    qtyContainer.append(qtyHeading, btnContainer);
    const itemSize = document.createElement('div');
    itemSize.className = 'size col-3';
    itemSize.innerHTML = `
      <h6>Size</h6> 
      <p class="size d05">L</p>`;
    const itemColor = document.createElement('div');
    itemColor.classList = 'item-color col-3';
    itemColor.innerHTML = ` 
      <h6>Color</h6> 
      <p class="color d05">White</p>`;
    const deleteBtn = document.createElement('button');
    deleteBtn.classList = 'icon fas fa-trash';
    const editBtn = document.createElement('button');
    editBtn.className = 'icon fas fa-pen';
    productSpecContainer.append(itemSize, itemColor);
    productSpecContainer.append(deleteBtn, editBtn);
    this.card.append(productSpecContainer);
  }

  handleDelete = (e) => {
    e.stopPropagation();
  }

  handleEdit = (e) => {
    e.stopPropagation();
  }

  handleIncrementQty = (e) => {
    e.stopPropagation();
  }

  handleDecrementQty = (e) => {
    e.stopPropagation();
  }

  handleSelectColor = (e) => {
    e.stopPropagation();
  }

  handleSelectSize = (e) => {
    e.stopPropagation();
  }
}

const displayOrder = (cart) => {
  cart.forEach((item) => {
    const { card } = new Order(item);

    if (total) {
      document.querySelector('.order-details').insertBefore(card, total);
    }
  });
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
  displayOrder(userCartCopy);
};
