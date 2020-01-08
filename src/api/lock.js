import api from './api'
let lock = {
    // 锁仓数据统计
    getStatistics( success, error){
        api.get(`api/bm/stake/statistics`,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },

    // 挖矿帐户列表
    getAccounts(data, success, error){
        api.get(`api/bm/stake/accounts`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },

    // 额外解锁查询
    getUnlock(data, success, error){
        api.get(`api/bm/stake/unlock_target`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 锁仓记录
    getRecord(data, success, error){
        api.get(`api/bm/stake/record`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 分发记录
    getDispense(data, success, error){
        api.get(`api/bm/stake/dispense/record`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 取消锁仓 api/bm/cancelStake/selectCancelStake/{pageSize}/{page}
    selectCancelStake(pageSize,page,data, success, error){
        api.post(`api/bm/cancelStake/selectCancelStake/${pageSize}/${page}`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 新增锁仓 api/bm/cancelStake/insertCancelStake
    insertCancelStake(data, success, error){
        api.post(`api/bm/cancelStake/insertCancelStake`,data,(res) => {
            if (res.rst === 201) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    }
}
export default lock
