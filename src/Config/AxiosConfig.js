import axios from 'axios';
import {useNavigate} from "react-router-dom";


const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // API의 기본 URL
    timeout: 5000
})
axiosInstance.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            config.headers.Authorization = '';
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

async function silentTokenUpdate() {
    const {id, token} = JSON.parse(sessionStorage.getItem('profile'));
    const {data} = await axios.post('http://localhost:8080/api/tokenUpdate',
        {id, token},
        {
            headers: {'Content-Type': 'application/json'}
        }
    )
    if(data.token === "EXPIRE"){
        sessionStorage.clear();
        window.location.href='/';
    }
}

axiosInstance.interceptors.response.use(
    response => {
        if (response.config.url !== '/login' && !response.config.url.includes('/userAmount?id=')) {
            silentTokenUpdate();
        }
        return response;
    }
)

export default axiosInstance;