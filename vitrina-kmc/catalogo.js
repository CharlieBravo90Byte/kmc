const search = document.querySelector('#search');
const category = document.querySelector('#category');
const products = [...document.querySelectorAll('.product')];
const count = document.querySelector('#count');
const empty = document.querySelector('#empty');
const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
function filterProducts() {
  const query = normalize(search.value);
  let visible = 0;
  products.forEach(product => {
    const match = normalize(product.dataset.name).includes(query) && (!category.value || product.dataset.category === category.value);
    product.hidden = !match;
    if (match) visible++;
  });
  count.textContent = `${visible} ${visible === 1 ? 'figura' : 'figuras'}`;
  empty.hidden = visible !== 0;
}
search.addEventListener('input', filterProducts);
category.addEventListener('change', filterProducts);
filterProducts();
