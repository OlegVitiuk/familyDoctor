import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
import jwt from 'jsonwebtoken';
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/index';
import logger from 'redux-logger'
import {setAuthorizationToken} from "utils";
import {SET_CURRENT_USER} from "constants/index";

export const history = createHistory()

const initialState = {}
const enhancers = []
const middleware = [
    thunk,
    routerMiddleware(history),
    logger
]

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
)

const token = localStorage.jwtToken;
if (token) {
    const user = jwt.decode(token);
    setAuthorizationToken(token);
    store.dispatch({type: SET_CURRENT_USER, user});
}

export default store