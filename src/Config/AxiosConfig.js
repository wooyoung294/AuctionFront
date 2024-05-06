import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_AUCTION_API_URL, // API의 기본 URL
    timeout: 10000
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
    const {data} = await axios.post(process.env.REACT_APP_AUCTION_API_URL+'/tokenUpdate',
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
        if (response.config.url !== '/login'
            && response.config.url !== '/createUser'
            && !response.config.url.includes('/userAmount?id=')
            && !response.config.url.includes('/duplicateId')
        ) {
            silentTokenUpdate();
        }
        return response;
    }
)

export default axiosInstance;
