import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { markup } from "./render-functions";

const API_KEY = '49077241-9df32fcc53d001f958141ccb6';
const PER_PAGE = 40;
let currentPage = 1;
let currentQuery = '';

export async function getImage(input, isNewSearch = false) {
    const box = document.querySelector('.gallery');
    const loadMoreBtn = document.querySelector('.load-more');

    if(isNewSearch) {
        currentPage = 1;
        currentQuery = input;
        box.innerHTML = '';
    }

    const query = encodeURIComponent(currentQuery);
    const urlParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: currentPage,
        per_page: PER_PAGE,
    });

    const URL = `https://pixabay.com/api/?${urlParams}`;

    try{
        const response = await axios.get(URL);
        const data = response.data;

        if(data.hits.length === 0) {
            throw new Error('No images found');
        }

        markup(data, isNewSearch);
        currentPage++;

        if(currentPage * PER_PAGE >= data.totalHits) {
            loadMoreBtn.classList.add('hidden');
            iziToast.show({
                messageColor: "#fafafb",
            messageSize: '16px',
            backgroundColor: '#ef4040',
            transitionIn: 'bounceInLeft',
            position: 'topRight',
            closeOnClick: true,
            message: "We're sorry, but you've reached the end of search results.",
            });
        } else {
            loadMoreBtn.classList.remove('hidden');
        }
    } catch(error) {
        console.error(error);
        box.innerHTML = '';
        iziToast.show({
                        messageColor: "#fafafb",
                        messageSize: '16px',
                        backgroundColor: '#ef4040',
                        transitionIn: 'bounceInLeft',
                        position: 'topRight',
                        closeOnClick: true,
                        message: 'Sorry, an error happened. Try again',
                    });
    }
}


//     return fetch(URL)
//     .then(response => {
//         if(!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         return markup(data);
//     })
//     .catch(error => {
//         console.error(error);
//         box.innerHTML = '';
//         iziToast.show({
//             messageColor: "#fafafb",
//             messageSize: '16px',
//             backgroundColor: 'background: #ef4040',
//             transitionIn: 'bounceInLeft',
//             position: 'topRight',
//             closeOnClick: true,
//             message: 'Sorry, an error happened. Try again',
//         });
//         return;
//     });
// }