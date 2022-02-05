import { CLEAR_MESSAGES } from '../constants/messagesConstants';

export const messagesAction = () => (dispach) =>{
    dispach({
        type: CLEAR_MESSAGES,
    });
};