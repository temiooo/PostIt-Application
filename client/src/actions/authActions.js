import axios from 'axios';
import * as types from './actionTypes';

export function signupSuccess(result) {
    return {type: types.SIGNUP_SUCCESS, result};
}

export function signup(userDetails) {
    return dispatch =>
        axios.post('/api/users/signup', userDetails)
        .then((result) => {
            dispatch(signupSuccess(result));
        }).catch(error => {
            toastr.error(error);
            throw(error);
        });
    };
}
