import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function createGalleryMarkup(images) {
  const markup = images
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img
            class="image-thumbnail"
            src="${webformatURL}"
            alt="${tags}"
            loading="lazy"
          />
          <div class="image-info">
            <p><b>Likes</b> ${likes}</p>
            <p><b>Views</b> ${views}</p>
            <p><b>Comments</b> ${comments}</p>
            <p><b>Downloads</b> ${downloads}</p>
          </div>
        </a>
      </li>`
    )
    .join('');

  return markup;
}

export function showErrorMessage(errorMessage) {
  iziToast.error({
    title: 'Error',
    message: errorMessage,
    position: 'topRight',
  });
}