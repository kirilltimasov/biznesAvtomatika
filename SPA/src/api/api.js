import * as axios from "axios";
import userApi from "./userApi";
import departmentApi from "./departmentApi";

const webApi1 = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5000/api/',
});

const webApi2 = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:5001/api/',
});

const API = {
    user: userApi(webApi1),
    department: departmentApi(webApi2),
};

export default API;