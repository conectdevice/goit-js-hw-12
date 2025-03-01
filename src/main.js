import { fetchImages } from './js/pixabay-api.js';
import { createGalleryMarkup, showErrorMessage } from './js/render-functions.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load More';
loadMoreBtn.classList.add('load-more', 'hidden');
document.body.append(loadMoreBtn);

const loader = document.createElement('div');
loader.classList.add('loader', 'hidden');
loader.textContent = 'Loading...';
document.body.append(loader);

let query = '';
let page = 1;
const perPage = 15;
let lightbox;

lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function toggleLoadMoreButton(show) {
  loadMoreBtn.classList.toggle('hidden', !show);
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function clearGallery() {
  gallery.innerHTML = '';
}

function renderGallery(images) {
  gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(images));
  lightbox.refresh();
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  query = event.target.elements['search-query'].value.trim();

  if (!query) {
    showErrorMessage('Please enter a search query!');
    return;
  }

  page = 1;
  clearGallery();
  showLoader(); 

  try {
    const data = await fetchImages(query, page, perPage);
    if (data.hits.length === 0) {
      showErrorMessage('Sorry, no images found. Try a different query.');
    } else {
      renderGallery(data.hits);
      toggleLoadMoreButton(data.hits.length === perPage);
    }
  } catch (error) {
    showErrorMessage('An error occurred. Please try again.');
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  toggleLoadMoreButton(false);
  showLoader();

  try {
    const data = await fetchImages(query, page, perPage);
    renderGallery(data.hits);

    const cardHeight = gallery.firstElementChild?.getBoundingClientRect().height || 0;
    if (cardHeight) {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (data.hits.length < perPage || data.totalHits <= page * perPage) {
      toggleLoadMoreButton(false);
      showErrorMessage("We're sorry, but you've reached the end of search results.");
    } else {
      toggleLoadMoreButton(true);
    }
  } catch (error) {
    showErrorMessage('An error occurred. Please try again.');
  } finally {
    hideLoader();
  }
});