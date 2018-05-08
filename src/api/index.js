import axios from 'axios';

const localApi = "http://localhost:8080";
const remoteApi = "https://evening-shelf-73105.herokuapp.com";

export const api = axios.create({
    baseURL: localApi,
    headers: {
        'Content-Type': 'application/json',
    },
});

