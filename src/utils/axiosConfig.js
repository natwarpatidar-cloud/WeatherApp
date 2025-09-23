import axios from 'axios';
const axiosConfig = axios.create({
    baseURL: "http://api.weatherapi.com/v1/"
});

export default axiosConfig;