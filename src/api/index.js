import axios from 'axios';

let apiUrl = 'localhost:8080';

console.log(process.env.REACT_APP_ENV);
console.log(process.env.ENV);
if(process.env.REACT_APP_ENV){
    apiUrl  = 'https://enigmatic-journey-33069.herokuapp.com';
}

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

