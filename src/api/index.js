import axios from 'axios';

let apiUrl = 'localhost:8080';

console.log(process.env.REACT_APP_ENV);
if(process.env.REACT_APP_ENV !== 'dev'){
    apiUrl  = 'https://enigmatic-journey-33069.herokuapp.com';
}

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

