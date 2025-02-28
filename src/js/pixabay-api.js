import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { markup } from "./render-functions";

const API_KEY = '49077241-9df32fcc53d001f958141ccb6';

export function getImage(input) {
    const box = document.querySelector('.gallery');
    const query = encodeURIComponent(input);
    const urlParams = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    });

    const URL = `https://pixabay.com/api/?${urlParams}`;

    return fetch(URL)
    .then(response => {
        if(!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        return markup(data);
    })
    .catch(error => {
        console.error(error);
        box.innerHTML = '';
        iziToast.show({
            messageColor: "#fafafb",
            messageSize: '16px',
            backgroundColor: 'background: #ef4040',
            transitionIn: 'bounceInLeft',
            position: 'topRight',
            closeOnClick: true,
            message: 'Sorry, an error happened. Try again',
        });
        return;
    });
}