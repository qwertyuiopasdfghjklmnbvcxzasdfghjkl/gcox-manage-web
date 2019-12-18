import api from './api';

let inviteMiner = {};

//导出邀请关系报表 GET /userInvite/exportInviteModifyRecordExcel
const exportInviteModifyRecordExcel = function (data, success, error) {
    api.get('api/bm/userInvite/exportInviteModifyRecordExcel', data, (res) => {
        success && success(res);
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.exportInviteModifyRecordExcel = exportInviteModifyRecordExcel;

//邀请信息查询POST /userInvite/findUserInviteInfo
const findUserInviteInfo = function (data, success, error) {
    api.post('api/bm/userInvite/findUserInviteInfo', data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.findUserInviteInfo = findUserInviteInfo;

//邀请历史信息查询POST /userInvite/findUserInvite/{pageSize}/{page}
const findUserInvite = function (pageSize, page, data, success, error) {
    api.post(`api/bm/userInvite/findUserInvite/${pageSize}/${page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.findUserInvite = findUserInvite;

// POST /userInvite/findUserInviteRecommendLevel
const findUserInviteRecommendLevel = function (data, success, error) {
    api.post(`api/bm/userInvite/findUserInviteRecommendLevel`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.findUserInviteRecommendLevel = findUserInviteRecommendLevel;

//查询推荐人 POST /userInvite/findUserInviteRecommend
const findUserInviteRecommend = function (data, success, error) {
    api.post(`api/bm/userInvite/findUserInviteRecommend`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.findUserInviteRecommend = findUserInviteRecommend;

//查询推荐人修改记录 POST /userInvite/findUserInviteModifyRecord/{pageSize}/{page}
const findUserInviteModifyRecord = function (pageSize,page,data, success, error) {
    api.post(`api/bm/userInvite/findUserInviteModifyRecord/${pageSize}/${page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.findUserInviteModifyRecord = findUserInviteModifyRecord;

//更新推荐人信息 POST /userInvite/updateRecommend
const updateRecommend = function (data, success, error) {
    api.post(`api/bm/userInvite/updateRecommend`, data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.updateRecommend = updateRecommend;

//分页查找映射币种 POST /mappingManage/selectSymbolMappingList/{pageSize}/{page}
const selectSymbolMappingList = function (pageSize,page,data, success, error) {
    api.post(`api/bm/mappingManage/selectSymbolMappingList/${pageSize}/${page}`, data, (res) => {
        if (res.rst === 101) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.selectSymbolMappingList = selectSymbolMappingList;

//更新映射币种 POST /mappingManage/updateSymbolMapping
const updateSymbolMapping = function (data, success, error) {
    api.post(`api/bm/mappingManage/updateSymbolMapping`, data, (res) => {
        if (res.rst === 301) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.updateSymbolMapping = updateSymbolMapping;

//新增币种 POST /mappingManage/insertSymbolMapping
const insertSymbolMapping = function (data, success, error) {
    api.post(`api/bm/mappingManage/insertSymbolMapping`, data, (res) => {
        if (res.rst === 201) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.insertSymbolMapping = insertSymbolMapping;

//分页查询绑定记录 POST /mappingManage/selectBindRecordList/{pageSize}/{page}
const selectBindRecordList = function (pageSize,page,data, success, error) {
    api.post(`api/bm/mappingManage/selectBindRecordList/${pageSize}/${page}`, data, (res) => {
        if (res.rst === 101) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.selectBindRecordList = selectBindRecordList;

//更新绑定记录 POST /mappingManage/updateBindRecord
const updateBindRecord = function (data, success, error) {
    api.post(`api/bm/mappingManage/updateBindRecord`, data, (res) => {
        if (res.rst === 301) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.updateBindRecord = updateBindRecord;

//新增绑定记录POST /mappingManage/insertBindRecord
const insertBindRecord = function (data, success, error) {
    api.post(`api/bm/mappingManage/insertBindRecord`, data, (res) => {
        if (res.rst === 201) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.insertBindRecord = insertBindRecord;

//删除绑定记录POST /mappingManage/deleteBindRecord
const deleteBindRecord = function (data, success, error) {
    api.post(`api/bm/mappingManage/deleteBindRecord`, data, (res) => {
        if (res.rst === 401) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.deleteBindRecord = deleteBindRecord;

//分页查找映射总价值POST /mappingManage/selectUserSymbolMappingList/{pageSize}/{page}
const selectUserSymbolMappingList = function (pageSize,page,data, success, error) {
    api.post(`api/bm/mappingManage/selectUserSymbolMappingList/${pageSize}/${page}`, data, (res) => {
        if (res.rst === 101) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.selectUserSymbolMappingList = selectUserSymbolMappingList;

//查找规则设置POST /mappingManage/selectRuleSettingList
const selectRuleSettingList = function (data, success, error) {
    api.post(`api/bm/mappingManage/selectRuleSettingList`, data, (res) => {
        if (res.rst === 101) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.selectRuleSettingList = selectRuleSettingList;

//更新映射规则 POST /mappingManage/updateRuleSetting
const updateRuleSetting = function (data, success, error) {
    api.post(`api/bm/mappingManage/updateRuleSetting`, data, (res) => {
        if (res.rst === 301) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error)
};
inviteMiner.updateRuleSetting = updateRuleSetting;

export default inviteMiner;
