import { fetchPhotosByQuery } from './js/pixabay-api';
import { createGalleryCardTemplate } from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const searchFormEl = document.querySelector('.js-search-form');
const galleryEl = document.querySelector('.js-gallery');
const loader = document.querySelector('.loader');

const searchFromSubmit = event => {
  event.preventDefault();

  showLoader();

  const searchQuery = event.currentTarget.elements.user_query.value.trim();

  if (searchQuery === '') {
    hideLoader();

    iziToast.error({
      title: 'Error!',
      message: 'Sorry, there are no images matching your search query. Please try again!',
    });

    return;
  }

  fetchPhotosByQuery(searchQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          title: 'Error!',
          message: 'Sorry, there are no images matching your search query. Please try again!',
        });

        galleryEl.innerHTML = '';

        searchFormEl.reset();

        return;
      }
      const galleryTamplate = data.hits
        .map(el => createGalleryCardTemplate(el))
        .join('');

      galleryEl.innerHTML = galleryTamplate;

      new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => hideLoader());
};

const showLoader = () => loader.classList.remove('is-hidden');

const hideLoader = () => loader.classList.add('is-hidden');

searchFormEl.addEventListener('submit', searchFromSubmit);