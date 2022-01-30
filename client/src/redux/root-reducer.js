import { combineReducers } from "redux";

//import reducers
import testReducer from './test/testReducer';
import authReducer from './auth/authReducer';

export default combineReducers({
    test: testReducer,
    auth: authReducer
})