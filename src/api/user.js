import api from './api';
import qs from 'qs';
import util from '@/libs/util.js';
import { resolve } from 'tinymce';

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
const getSymbolList = function (data, success, error) {
    api.get('api/bm/sysParam/symbolList', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
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

// 更新主链状态
const updateSymbol = function ( data, success, error) {
    api.post('api/bm/sysParam/updateSymbol', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.updateSymbol = updateSymbol;

// 获取国际化语言
const getLang = function ( data, success, error) {
    api.get('/api/v2/language', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getLang = getLang;

// 获取国际化语言 语种
const getLangType = function ( success, error) {
    api.get('/api/v2/language/type/list', (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getLangType = getLangType;

// 获取google状态
const getGoogleStatus = function ( success, error) {
    api.post('/api/bm/google/list', (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getGoogleStatus = getGoogleStatus;

// 获取获取Google验证码
const getSecretKey = function (id, success, error) {
    api.post(`/api/bm/google/getSecretKey/${id}`, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
user.getSecretKey = getSecretKey;

// 绑定Google验证码
const bindGoogle = function (data, success, error) {
    api.post(`/api/bm/google/bindGoogle`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg||res.error||res.exception);
        }
    }, error)
};
user.bindGoogle = bindGoogle;

// 解绑Google验证码
const unbindGoogle = function (data, success, error) {
    api.post(`/api/bm/google/unbindGoogle`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg||res.error||res.exception);
        }
    }, error)
};
user.unbindGoogle = unbindGoogle;

// Google状态查询

const googleAuthEnable = function (name, success, error) {
    fetch(`${util.baseURL}api/bm/google/googleAuthEnable/${name}`,{
        method: "POST",
        credentials: 'omit',
    }).then(res=>{
        return res.json()
    }).then((data) => {
        if (data.rst === 1) {
            success && success(data);
        } else {
            error && error(data.msg||data.error||data.exception);
        }
    }).catch((error)=> {
        error(error.message)
    })
};
user.googleAuthEnable = googleAuthEnable;


export default user;
