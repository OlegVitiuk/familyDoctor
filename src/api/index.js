import axios from 'axios';

let apiUrl = 'http://localhost:8080';

if(process.env.REACT_APP_ENV !== 'dev'){
    apiUrl  = 'https://enigmatic-journey-33069.herokuapp.com';
}

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

