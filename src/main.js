
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages, resetPage, currentPage } from "./js/pixabay-api";  
import { showLoader, hideLoader, displayImages, clearGallery, smoothScroll } from "./js/render-functions";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const loader = document.querySelector(".loader");
const loadMoreButton = document.getElementById("load-more"); 

let searchQuery = ""; 

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    searchQuery = input.value.trim(); 

    if (searchQuery === "") {
        iziToast.error({
            title: "Error",
            message: "Please enter a search query!",
            position: "topRight",
        });
        return;
    }

    clearGallery();
    loadMoreButton.classList.add("hidden"); 
    showLoader(loader);
    resetPage(); 

    try {
        const response = await fetchImages(searchQuery);
        const images = response.hits;
        const totalPages = Math.ceil(response.totalHits / 40);  

        if (images.length === 0) {
            iziToast.error({
                title: "Error",
                message: "No images found. Try another search!",
                position: "topRight",
            });
        } else {
            displayImages(images); 

            if (currentPage < totalPages) { 
                loadMoreButton.classList.remove("hidden");  
            } else {
                loadMoreButton.classList.add("hidden");  
            }
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again later!",
            position: "topRight",
        });
    } finally {
        hideLoader(loader);
    }
});

loadMoreButton.addEventListener("click", async () => {
    loadMoreButton.classList.add("hidden");
    showLoader(loader);

    try {
        const response = await fetchImages(searchQuery);
        const images = response.hits;
        const totalPages = Math.ceil(response.totalHits / 40);

        if (images.length === 0 || currentPage >= totalPages) { 
            iziToast.info({
                title: "Info",
                message: "We're sorry, but you've reached the end of search results.",
                position: "topRight",
            });
            return;
        } else {
            displayImages(images);
            smoothScroll();

         
            if (currentPage < totalPages) { 
                loadMoreButton.classList.remove("hidden");  
            } else {
                loadMoreButton.classList.add("hidden");  
                iziToast.info({
                    title: "Info",
                    message: "No more images to load.",
                    position: "topRight",
                });
            }
        }
    } catch (error) {
        iziToast.error({
            title: "Error",
            message: "Something went wrong. Please try again later!",
            position: "topRight",
        });
    } finally {
        hideLoader(loader);
    }
});

// const form = document.querySelector('.input-list');
// const loadMoreBtn = document.querySelector('.load-more');
// const inputField = document.querySelector(".input");
// const loaderContainer = document.querySelector('.loader-container'); // Added missing declaration

// if (!loaderContainer) {
//     console.warn('Loader container not found in DOM');
// }

// let currentQuery = '';

// loadMoreBtn.classList.add('hidden');

// form.addEventListener('submit', async(event) => {
//     event.preventDefault();
    
//     currentQuery = inputField.value.trim();
//     if(!currentQuery) {
//         iziToast.show({
//             messageColor: "#fafafb",
//             messageSize: '16px',
//             backgroundColor: '#ef4040',
//             transitionIn: 'bounceInLeft',
//             position: 'topRight',
//             closeOnClick: true,
//             message: 'Please enter the search query',
//         });
//         return;
//     }
//     loadMoreBtn.classList.add('hidden');
//     await getImage(currentQuery, true)
// });

// loadMoreBtn.addEventListener('click', async() => {
//     await getImage(currentQuery, false, true);
// });