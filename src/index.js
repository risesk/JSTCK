'use strict';
import './style.css';

const form = document.forms.contactform;
const email = form.elements.email;
const formId = 'mgeelbqg';

function sendEmail (event) {
    event.preventDefault();

    fetch('https://formspree.io/' + formId, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
        email: email.value
    })
    })
    .then((res) => {
        if (res.ok) {
        email.value.textContent = "";
        alert('Запрос на регистрацию выполнен успешно!');
        return 
        }
    return Promise.reject(`Что-то пошло не так: ${res.status}`)
    })
    .catch((err) => {
        alert(err);
    })
}

form.addEventListener('submit', sendEmail);