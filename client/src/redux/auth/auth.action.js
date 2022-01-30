import Axios from 'axios';

import setAuthToken from '../../utils/setAuthToken';

import jwt_decode from "jwt-decode";

import { SET_CURRENT_USER } from "./auth.actiontypes";

export const registerUser = (userData, navigate) => {
    return (dispatch) => {
        //register user
        Axios.post("/api/users/register", userData).then(res => {
            console.log(res.data);
            navigate("/login");
        })
            .catch(err => console.log(err))
    }
}

export const loginUser = (userData) => {
    return (dispatch) => {
        //login user
        Axios.post("/api/users/signin", userData).then((res) => {
            console.log(res.data);
            //get token that is sent from the backend
            const { token } = res.data;

            //save token in localStorage
            localStorage.setItem('jwtToken', token);

            //set the Axios header with token
            setAuthToken(token);

            //decode user data feom token
            const decoded_data = jwt_decode(token);

            //save user data to store
            dispatch(setCurrentUser(decoded_data))
        })
            .catch(err => console.log(err))
    }
}

export const logoutUser = () => {
    return (dispatch) => {
        //remove token from localStorage
        localStorage.removeItem('jwtToken');

        //remove auth header
        setAuthToken(false);

        //clear Store
        dispatch(setCurrentUser(false))
    }
}


export const setCurrentUser = (decoded_data) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded_data
    }
}