import { AUTH_CONSTANT_REDUX } from '../constant/authConstant';

const initialState = {
    isLoggedIn: false,
    admin: {
        id: '',
        token: '',
        name: '',
        email: '',
    }
};

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_CONSTANT_REDUX.LOGIN_USER:
            return {
                isLoggedIn: true,
                admin: {
                    id: payload.id,
                    token: payload.userSessionToken,
                    name: payload.userName,
                    email: payload.userEmail
                }
            };
        case AUTH_CONSTANT_REDUX.LOGOUT_USER:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
