import Axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        Axios.defaults.headers.common['Authorization'] = token;
    } else {
        //delete auth header
        delete Axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;