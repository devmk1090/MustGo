import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://loaclhost:3030',
    withCredentials: true,
});

export default axiosInstance;