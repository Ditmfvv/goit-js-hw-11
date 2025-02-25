import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

let lightbox; 

const searchFromSubmit = event => {
  event.preventDefault();

  showLoader();

  const searchQuery = event.currentTarget.elements.user_query.value.trim();

  if (searchQuery === '') {
    hideLoader();
    iziToast.error({
      title: 'Error!',
      message: 'Please enter a search term!',
    });
    return;
  }

  fetchPhotosByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error!',
          message: 'Sorry, no images found for your search query.',
        });

        galleryEl.innerHTML = '';
        searchFormEl.reset();
        return;
      }

      const galleryTemplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryEl.innerHTML = galleryTemplate;

      
      if (lightbox) {
        lightbox.refresh();
      } else {
        lightbox = new SimpleLightbox('.gallery a', {
          captionsData: 'alt',
          captionDelay: 250,
        });
      }
    })
    .catch(err => {
      iziToast.error({
        title: 'Error!',
        message: 'Something went wrong. Please try again later.',
      });
      console.error(err);
    })
    .finally(() => hideLoader());
};

const showLoader = () => loader.classList.remove('is-hidden');

const hideLoader = () => loader.classList.add('is-hidden');

searchFormEl.addEventListener('submit', searchFromSubmit);