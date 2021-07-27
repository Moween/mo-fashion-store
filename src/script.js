const seeMoreBtn = document.getElementById('see-more');
const addToCartIcons = document.querySelectorAll('button[data-product]');
const getLocalCopy = [];

let userCart = localStorage.getItem('userCart');
if (userCart) {
  userCart = JSON.parse(userCart);
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


const addToCart = (e) => {
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
  }

  saveToLocalStorage(product);  
};

const saveToLocalStorage = (item) => {
  let userCart = localStorage.getItem('userCart');
  userCart = JSON.parse(userCart);
  userCart.push(item)
  userCartCopy = [...userCart];
  localStorage.setItem('userCart', JSON.stringify(userCart));
}

window.onload = () => {
  addToCartIcons.forEach((cartIcon) => {
    cartIcon.addEventListener('click', addToCart);
  });
  seeMoreBtn.addEventListener('click', handleSeeMore);
}
