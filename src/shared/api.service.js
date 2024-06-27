import axios from 'axios';

const url = 'http://localhost:5167/api/v1';

const api = axios.create({
    baseURL: url, headers: {
        'Content-type': 'application/json',
    }
});

export default api;