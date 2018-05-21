import {api} from 'api/index';
import {setAuthorizationToken} from "utils/index";

export const registerNewUser = user =>
    api.post('/user/register', user);

export const loginUser = data => api.post('/user/login', data).then(res =>{
    const token = res.data.token;
    localStorage.setItem('jwtToken',token);
    setAuthorizationToken(token);
});