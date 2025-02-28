import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export function markup(data, isNewSearch) {
    let { hits } = data;
    const box = document.querySelector('.gallery');

    if(!hits || hits.length === 0) {
        iziToast.show({
            messageColor: "#fafafb",
            messageSize: '16px',
            backgroundColor: '#ef4040',
            transitionIn: 'bounceInLeft',
            position: 'topRight',
            closeOnClick: true,
            message: 'Sorry, there are no images matching your search query. Please try again!'
        });
        box.innerHTML = '';
        return;
    }
    const markup = hits.map(image => 
            ` <li class="gallery-item">
        <a class="gallery-link" href="${image.largeImageURL}">
            <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}">
            <div class="gallery-div">
                <p>Likes</p>
                <p>Views</p>
                <p>Comments</p>
                <p>Downloads</p>
                <span>${image.likes}</span>
                <span>${image.views}</span>
                <span>${image.comments}</span>
                <span>${image.downloads}</span>
            </div>
        </a>
    </li>`).join(' ');

    if(isNewSearch) {
        box.innerHTML = markup;
    } else {
        box.insertAdjacentHTML('beforeend', markup);
    }

    const lightbox = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
    });
    lightbox.refresh();

    const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
    window.scrollBy({top: cardHeight * 2, behavior: 'smooth'});
}