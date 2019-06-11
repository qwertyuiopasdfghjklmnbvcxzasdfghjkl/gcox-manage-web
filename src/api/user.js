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

// 获取所有主链类型
const getSymbolTypes = function ( success, error) {
    api.get('api/bm/sysParam/symbolTypes', (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getSymbolTypes = getSymbolTypes;

// 获取所有主链类型
const getSymbolList = function ( success, error) {
    api.get('api/bm/sysParam/symbolList', (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getSymbolList = getSymbolList;

// 增加主链类型
const addSymbol = function ( data, success, error) {
    api.post('api/bm/sysParam/addSymbol', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.addSymbol = addSymbol;

// 删除主链类型
const deleteSymbol = function ( data, success, error) {
    api.post('api/bm/sysParam/deleteSymbol', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.deleteSymbol = deleteSymbol;

export default user;
