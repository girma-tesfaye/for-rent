import { setLocalStorage, getLocalStorage, deleteLocalStorage } from './localStorage'
import { setCookie, deleteCookie /* , getCookie */ } from './cookies'

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
}

export const isAuthenticated = () => {

    if (getLocalStorage('user')) {
        return getLocalStorage('user'); 
   } else {
       return false
   }

    /* if (getCookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    } else {
        return false
    } */
}

export const logout = (next) => {
    deleteCookie('token');
    deleteLocalStorage('user');

    next();
}