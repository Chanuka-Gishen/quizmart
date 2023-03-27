import { AUTH_CONSTANT_REDUX } from '../constant/authConstant';

const loginUser = (payload) => {
    return {
        type: AUTH_CONSTANT_REDUX.LOGIN_USER,
        payload
    };
};

const logoutUser = () => {
    return {
        type: AUTH_CONSTANT_REDUX.LOGOUT_USER
    };
};

const authAction = {
    loginUser,
    logoutUser
};

export default authAction;
