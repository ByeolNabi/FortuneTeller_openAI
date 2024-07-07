import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://study.aiclub.kr:8014/',
    headers: {
        'Content-Type': 'application/json',
    }
})

export default axiosInstance;