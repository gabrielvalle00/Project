import axios from 'axios';

const api = axios.create({
    baseURL: 'http://', // Altere para a URL do seu backend
});

export default api;