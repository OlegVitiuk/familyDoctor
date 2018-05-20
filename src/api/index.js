import axios from 'axios';

let apiUrl = "http://localhost:8080";

console.log(process.env.NODE_ENV);
if (process.env.ENV === 'production') {
    console.log("set new Api");
    apiUrl = "https://enigmatic-journey-33069.herokuapp.com";
}

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

