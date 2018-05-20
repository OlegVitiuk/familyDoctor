import axios from 'axios';

let apiUrl = "http://localhost:8080";

if (process.env.NODE_ENV === 'production') {
    apiUrl = "https://evening-shelf-73105.herokuapp.com";
}

export const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

