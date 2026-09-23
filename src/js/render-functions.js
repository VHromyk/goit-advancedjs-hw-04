import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');
const loaderRef = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  fadeSpeed: 300,
  overlayOpacity: 0.9,
  closeOnOverlayClick: true,
  captions: true,
});

function createGallery(images) {
  const markup = images.map(
    image => `<li class="gallery-item">
                  <a class="gallery-link" href="${image.largeImageURL}">
                     <img class="gallery-image"
                          src="${image.webformatURL}"
                          alt="${image.tags}"
                          data-source="${image.largeImageURL}"
                          data-tags="${image.tags}" />
                  </a>
                </li>`
  );

  galleryRef.insertAdjacentHTML('beforeend', markup.join(''));
  lightbox.refresh();
}

function clearGallery() {
  galleryRef.innerHTML = '';
}

function showLoader() {
  loaderRef.classList.add('is-shown');
}

function hideLoader() {
  loaderRef.classList.remove('is-shown');
}

function showLoadMoreButton() {
  loadMoreBtn.classList.remove('is-hidden');
}

function hideLoadMoreButton() {
  loadMoreBtn.classList.add('is-hidden');
}

export {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
};