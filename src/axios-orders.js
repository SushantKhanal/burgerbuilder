import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-6e86d.firebaseio.com/'
});

export default instance;