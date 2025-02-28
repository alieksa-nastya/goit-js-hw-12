import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getImage} from './js/pixabay-api'

const form = document.querySelector('.input-list');
const loadMoreBtn = document.querySelector('.load-more');
const inputField = document.querySelector(".input");

let currentQuery = '';
let currentPage = 1;

loadMoreBtn.classList.add('hidden');

form.addEventListener('submit', async(event) => {
    event.preventDefault();

    currentQuery = inputField.value.trim();
    if(!currentQuery) {
        iziToast.show({
            messageColor: "#fafafb",
            messageSize: '16px',
            backgroundColor: '#ef4040',
            transitionIn: 'bounceInLeft',
            position: 'topRight',
            closeOnClick: true,
            message: 'Please enter the search query',
        });
        return;
    }
    currentPage = 1;
    loadMoreBtn.classList.add('hidden');
    await getImage(currentQuery, true)
});

loadMoreBtn.addEventListener('click', async() => {
    currentPage +=1;
    await getImage(currentQuery, false);
});
    
// document.querySelector('.input-list').addEventListener('submit', event => {
//     const input = document.querySelector('.input').value.trim();
//     const box = document.querySelector('.gallery');
//     event.preventDefault();

//     if(!input) {
//         iziToast.show({
//             messageColor: "#fafafb",
//             messageSize: '16px',
//             backgroundColor: 'background: #ef4040',
//             transitionIn: 'bounceInLeft',
//             position: 'topRight',
//             closeOnClick: true,
//             message: 'Please enter the search query',
//         });
//         return;
//     }
//     box.innerHTML = '<p>Wait, the image is loaded</p><span class = "loader"></span>'
//     getImage(input);
// })