import * as api from '../api';
import { AUTH } from '../constants/actionTypes';

export const signin = (user, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(user);

        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error.response.data)
    }
}

export const signup = (user, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(user);

        dispatch({ type: AUTH, data });
        history.push('/');
    } catch (error) {
        console.log(error.response.data)
    }
}