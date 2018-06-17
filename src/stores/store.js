import {createStore, applyMiddleware, compose} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory'
import rootReducer from '../reducers/index';
import logger from 'redux-logger'
import {setAuthorizationToken} from "utils";
import {SET_USER,SET_AUTHORIZATON} from "constants/index";
import {getUserInfo} from "api/user";

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
    setAuthorizationToken(token);
    getUserInfo(token).then((user)=>{
        store.dispatch({type: SET_USER, user});
        store.dispatch({type: SET_AUTHORIZATON, user});
    });
}

export default store