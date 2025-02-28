import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getImage} from './js/pixabay-api'

document.querySelector('.input-list').addEventListener('submit', event => {
    const input = document.querySelector('.input').value.trim();
    const box = document.querySelector('.gallery');
    event.preventDefault();

    if(!input) {
        iziToast.show({
            messageColor: "#fafafb",
            messageSize: '16px',
            backgroundColor: 'background: #ef4040',
            transitionIn: 'bounceInLeft',
            position: 'topRight',
            closeOnClick: true,
            message: 'Please enter the search query',
        });
        return;
    }
    box.innerHTML = '<p>Wait, the image is loaded</p><span class = "loader"></span>'
    getImage(input);
})