const seeMoreBtn = document.getElementById('see-more');

const handleSeeMore = (e) => {
  e.preventDefault();
  console.log(e)
  const btn = e.target;
  const secondRow = document.querySelector('#xtra-product-display');
  secondRow.classList.toggle('d-md-flex');
  btn.innerHTML = (btn.innerHTML === 'See More') ? 'See Less' : 'See More';
}

seeMoreBtn.addEventListener('click', handleSeeMore);