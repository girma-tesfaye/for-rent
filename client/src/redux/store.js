import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import loadingReducer from './reducers/loadingReducers';
import messagesReducer from './reducers/messagesReducers';
import categoryReducer from './reducers/categoryReducers';

const reducer = combineReducers({
    loading: loadingReducer,
    messages: messagesReducer,
    categories: categoryReducer
});

const initialSate = {};

const middleware = [thunk];

const store = createStore(
        reducer, 
        initialSate, 
        composeWithDevTools(applyMiddleware(...middleware))
    );

export default store;