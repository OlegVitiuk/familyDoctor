import {apiPrefix} from "../etc/config";
import axios from "axios/index";

export const registerNewUser = user =>
    axios.post(`${apiPrefix}/users`, user);