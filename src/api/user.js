import api from './api';
import qs from 'qs';

let user = {};

const login = function (data, success, error) {
    api.post('api/bm/login/jwt', qs.stringify(data), (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.login = login;

const logout = function (success, error) {
    api.post('api/bm/logout/jwt', (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.logout = logout;


const updateUserPwd = function (data, success, error) {
    api.post('api/bm/bmUser/updateUserPwd', data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.updateUserPwd = updateUserPwd;

export default user;
