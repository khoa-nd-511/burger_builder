import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burgerbuilder-bbc3c.firebaseio.com/'
});

export default instance;