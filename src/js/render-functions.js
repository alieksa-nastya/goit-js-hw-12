import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const loader = document.querySelector(".loader"); 

export function showLoader() {
    loader.classList.remove("hidden");
}

export function hideLoader() {
    loader.classList.add("hidden");
}

export function clearGallery() {
    document.getElementById("gallery").innerHTML = "";
}

export function displayImages(images) {
  const gallery = document.getElementById("gallery");

  images.forEach(image => {
      const listItem = document.createElement("li");
      listItem.classList.add("gallery-item");

      listItem.innerHTML = `
      <a href="${image.largeImageURL}" class="gallery-link">
          <img src="${image.webformatURL}" alt="${image.tags}" class="gallery-image" />
      </a>
      <div class="info">
          <p>Likes <span>${image.likes}</span></p>
          <p>Views <span>${image.views}</span></p>
          <p>Comments <span>${image.comments}</span></p>
          <p>Downloads <span>${image.downloads}</span></p>
      </div>
  `;

      gallery.appendChild(listItem);
  });

  const lightbox = new SimpleLightbox(".gallery-link", {
      captionsData: "alt",
  });
  lightbox.refresh(); 
}

export function smoothScroll() {
  const firstCard = document.querySelector(".gallery-item");
  
  if (firstCard) {
      const cardHeight = firstCard.getBoundingClientRect().height;
      window.scrollBy({
          top: cardHeight * 2,
          behavior: "smooth",
      });
  }
}

// export function markup(data, isNewSearch, isLoadMore) {
//     let { hits } = data;
//     const box = document.querySelector('.gallery');
    
//     if(!hits || hits.length === 0) {
//         iziToast.show({
//             messageColor: "#fafafb",
//             messageSize: '16px',
//             backgroundColor: '#ef4040',
//             transitionIn: 'bounceInLeft',
//             position: 'topRight',
//             closeOnClick: true,
//             message: 'Sorry, there are no images matching your search query. Please try again!'
//         });
//         box.innerHTML = '';
//         return;
//     }
    
//     const markup = hits.map(image => `
//         <li class="gallery-item">
//             <a class="gallery-link" href="${image.largeImageURL}">
//                 <img class="gallery-img" src="${image.webformatURL}" alt="${image.tags}" />
//                 <div class="gallery-div">
//                     <p>Likes</p>
//                     <p>Views</p>
//                     <p>Comments</p>
//                     <p>Downloads</p>
//                     <span>${image.likes}</span>
//                     <span>${image.views}</span>
//                     <span>${image.comments}</span>
//                     <span>${image.downloads}</span>
//                 </div>
//             </a>
//         </li>
//     `).join(' ');
    
//     if(isNewSearch) {
//         box.innerHTML = markup;
//     } else {
//         box.insertAdjacentHTML('beforeend', markup);
//     }
    
//     const lightbox = new SimpleLightbox('.gallery a', {
//         captionsData: 'alt',
//         captionDelay: 250,
//     });
//     lightbox.refresh();
    
//     if(isLoadMore && box.children.length > 0) {
//         const { height: cardHeight } = document.querySelector('.gallery-item').getBoundingClientRect();
//         window.scrollBy({top: cardHeight * 2, behavior: 'smooth'});
//     }
// }