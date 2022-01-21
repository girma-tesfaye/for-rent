import { setLocalStorage, getLocalStorage } from './localStorage'
import { setCookie, getCookie } from './cookies'

export const setAuthentication = (token, user) => {
    setCookie('token', token);
    setLocalStorage('user', user);
}

export const isAuthenticated = () => {
    if (getCookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    } else {
        return false
    }
}