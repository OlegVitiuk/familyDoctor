import axios from 'axios';

const localApi = 'localhost:8080';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || localApi,
    headers: {
        'Content-Type': 'application/json',
    },
});

