import { SET_CURRENT_USER } from './auth.actiontypes';

const initialState = {
    isAuthenticated: false,
    user: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: action.payload ? true : false,
                user: action.payload ? action.payload : {}
            }

        default:
            return state;
    }
}

export default authReducer;