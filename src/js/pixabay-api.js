import axios from "axios";

const API_KEY = "49001064-c7b72e374a4ae6399075933f6";
const BASE_URL = "https://pixabay.com/api/";

export let currentPage = 1; 

export function resetPage() {
    currentPage = 1;  
}

export async function fetchImages(query) {
    const params = {
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
        page: currentPage,
    };

    try {
        const response = await axios.get(BASE_URL, { params });
        currentPage += 1; 
        return response.data;
    } catch (error) {
        console.error("Error fetching images:", error);
        throw error;
    }
}
// import axios from "axios";
// import iziToast from "izitoast";
// import "izitoast/dist/css/iziToast.min.css";
// import { markup } from "./render-functions";

// const API_KEY = '49077241-9df32fcc53d001f958141ccb6';
// const PER_PAGE = 40;
// let currentPage = 1;
// let currentQuery = '';

// export async function getImage(input, isNewSearch = false, isLoadMore = false) {
//     const gallery = document.querySelector('.gallery');
//     const loadMoreBtn = document.querySelector('.load-more');
//     const loaderContainer = document.querySelector('.loader-container');

//     if(isNewSearch) {
//         currentPage = 1;
//         currentQuery = input;
//         gallery.innerHTML = '';
//     }

//     if(loaderContainer) {
//         loaderContainer.classList.remove('hidden');
//     } else {
//         console.error('Loader container is not found');
//     }
    
//     loadMoreBtn.classList.add('hidden');

//     const query = encodeURIComponent(currentQuery);
//     const urlParams = new URLSearchParams({
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: currentPage,
//         per_page: PER_PAGE,
//     });

//     const URL = `https://pixabay.com/api/?${urlParams}`;

//     try {
//         const response = await axios.get(URL);
//         const data = response.data;

//         if(data.hits.length === 0) {
//             throw new Error('No images found');
//         }

//         markup(data, isNewSearch, isLoadMore);
//         currentPage++;

//         const totalPages = Math.ceil(data.totalHits / PER_PAGE);

//         if(currentPage > totalPages) {
//             loadMoreBtn.classList.add('hidden');
//             if(!isNewSearch && data.totalHits > PER_PAGE) {
//                 iziToast.show({
//                     messageColor: "#fafafb",
//                     messageSize: '16px',
//                     backgroundColor: '#ef4040',
//                     transitionIn: 'bounceInLeft',
//                     position: 'topRight',
//                     closeOnClick: true,
//                     message: "We're sorry, but you've reached the end of search results.",
//                 });
//             }
//         } else {
//             loadMoreBtn.classList.remove('hidden');
//         }
//     } catch(error) {
//         console.error(error);
//         gallery.innerHTML = '';
//         iziToast.show({
//             messageColor: "#fafafb",
//             messageSize: '16px',
//             backgroundColor: '#ef4040',
//             transitionIn: 'bounceInLeft',
//             position: 'topRight',
//             closeOnClick: true,
//             message: 'Sorry, an error happened. Try again',
//         });
//     } finally {
//         if(loaderContainer) {
//             loaderContainer.classList.add('hidden');
//         } else {
//             console.error('Cannot hide loader: container is not found')
//         }
//     }
// }