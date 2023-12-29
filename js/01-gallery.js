import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

function createGalleryItem({ preview, original, description }) {
  return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `;
}

const galleryMarkup = galleryItems.map(item => createGalleryItem(item)).join('');
galleryList.insertAdjacentHTML('beforeend', galleryMarkup);

function onEscClick(event) {
  if (event.key === 'Escape') {
      instance.close();
  }
}

galleryList.addEventListener('click', (event) => {
  event.preventDefault();
  const target = event.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
    <img src="${target.dataset.source}" width="800" height="600">
  `, {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscClick);
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscClick);
    }
  });

  instance.show();
});