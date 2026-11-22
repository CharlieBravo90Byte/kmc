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

const dialog = document.querySelector('.figure-dialog');
const detailImage = document.querySelector('#detail-image');
const thumbs = document.querySelector('.thumbnails');
const previous = document.querySelector('.photo-prev');
const next = document.querySelector('.photo-next');
let currentFigure;
let currentName;
let photoIndex = 0;
const priceText = price => typeof price === 'number' ? new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP', maximumFractionDigits: 0 }).format(price) : 'Consultar precio';

function showPhoto(index) {
  const photos = currentFigure.fotos;
  photoIndex = (index + photos.length) % photos.length;
  detailImage.src = `vitrina-kmc/img/${photos[photoIndex]}`;
  detailImage.alt = `${currentName}, foto ${photoIndex + 1} de ${photos.length}`;
  document.querySelector('.photo-count').textContent = `${photoIndex + 1} / ${photos.length}`;
  previous.hidden = next.hidden = photos.length < 2;
  thumbs.replaceChildren();
  photos.forEach((photo, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver foto ${i + 1} de ${currentName}`);
    button.setAttribute('aria-pressed', String(i === photoIndex));
    const image = document.createElement('img');
    image.src = `vitrina-kmc/img/${photo}`;
    image.alt = '';
    button.append(image);
    button.addEventListener('click', () => showPhoto(i));
    thumbs.append(button);
  });
}

products.forEach(product => {
  const data = figuras[product.dataset.name];
  if (!data) return;
  const name = product.querySelector('h2').textContent;
  product.querySelector('.product-content span').textContent = priceText(data.precio);
  const image = product.querySelector('img');
  const imageButton = document.createElement('button');
  imageButton.type = 'button';
  imageButton.className = 'product-image-button';
  imageButton.setAttribute('aria-label', `Ver fotos y detalles de ${name}`);
  image.replaceWith(imageButton);
  imageButton.append(image);
  const detailButton = document.createElement('button');
  detailButton.type = 'button';
  detailButton.className = 'view-detail';
  detailButton.textContent = 'Ver fotos y detalles';
  product.querySelector('.product-content a').before(detailButton);
  function openDetail() {
    currentFigure = data;
    currentName = name;
    document.querySelector('#detail-title').textContent = name;
    document.querySelector('#detail-category').textContent = product.dataset.category;
    document.querySelector('.detail-price').textContent = priceText(data.precio);
    document.querySelector('.detail-description').textContent = data.descripcion;
    document.querySelector('.detail-contact').href = product.querySelector('.product-content a').href;
    showPhoto(0);
    dialog.showModal();
  }
  imageButton.addEventListener('click', openDetail);
  detailButton.addEventListener('click', openDetail);
});
previous.addEventListener('click', () => showPhoto(photoIndex - 1));
next.addEventListener('click', () => showPhoto(photoIndex + 1));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
