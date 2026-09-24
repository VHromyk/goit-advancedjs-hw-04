import { getImagesByQuery } from './js/pixabay-api.js';
import {
  clearGallery,
  createGallery,
  hideLoader,
  showLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import 'izitoast/dist/css/iziToast.min.css';
import iziToast from 'izitoast';

const formRef = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more-btn');

function showToast(message, color) {
  iziToast.show({ color, message, position: 'topRight' });
}

let page = 1;
let query = '';
let loadedCount = 0;

formRef.addEventListener('submit', async e => {
  e.preventDefault();

  const formData = new FormData(formRef);
  const newQuery = formData.get('search-text').trim();
  if (!newQuery) return;

  query = newQuery;
  formRef.reset();
  page = 1;
  loadedCount = 0;

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const resp = await getImagesByQuery({ query, page });

    if (resp.hits.length === 0) {
      showToast(
        'Sorry, there are no images matching your search query. Please try again!',
        'yellow'
      );
      return;
    }

    createGallery(resp.hits);
    loadedCount += resp.hits.length;
    page += 1;

    if (loadedCount >= resp.totalHits) {
      hideLoadMoreButton();
      showToast("We're sorry, but you've reached the end of search results.", 'yellow');
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showToast(error.message, 'red');
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  hideLoadMoreButton();
  showLoader();

  try {
    const resp = await getImagesByQuery({ query, page });

    const { height } = document.querySelector('.gallery-item').getBoundingClientRect();

    createGallery(resp.hits);

    window.scrollBy({ top: height * 2, behavior: 'smooth' });

    loadedCount += resp.hits.length;
    page += 1;

    if (loadedCount >= resp.totalHits) {
      showToast("We're sorry, but you've reached the end of search results.", 'yellow');
    } else {
      showLoadMoreButton();
    }
  } catch (error) {
    showToast(error.message, 'red');
  } finally {
    hideLoader();
  }
});