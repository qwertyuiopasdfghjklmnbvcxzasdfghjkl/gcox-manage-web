import api from './api'

let finance = {}

// 财务管理--提币审核
const getAuditingList = function (curPage, data, success, error) {
    api.post(`api/bm/financialManage/withdrawAuditing/findWithdrawAuditingList/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
          success && success(res.data, res.total)
        } else {
          error && error(res.msg)
        }
    }, error)
  }
finance.getAuditingList = getAuditingList

// 财务管理--提币审核统计数据
const findTotalWithdrawAuditingData = function (success, error) {
  api.get('api/bm/financialManage/withdrawAuditing/findTotalWithdrawAuditingData', (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findTotalWithdrawAuditingData = findTotalWithdrawAuditingData

// 财务管理--审核提币清单
const updateWithdrawAuditing = function (data, success, error) {
  api.post('api/bm/financialManage/withdrawAuditing/updateWithdrawAuditing', data, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.updateWithdrawAuditing = updateWithdrawAuditing

// 财务管理--充值监控数据
const findRechargeMonitorList = function (curPage, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findRechargeMonitorList/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findRechargeMonitorList = findRechargeMonitorList

// 财务管理--日提币统计数据
const findWithdrawStatisticsList = function (curPage, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findWithdrawStatisticsList/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findWithdrawStatisticsList = findWithdrawStatisticsList

// 财务管理--实时对账数据
const findRealTimeCheckingList = function (curPage, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findRealTimeCheckingList/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findRealTimeCheckingList = findRealTimeCheckingList

// 财务管理--资金池情况
const findCapitalPoolList = function (curPage, ase, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findCapitalPoolList/10/${curPage}/${ase}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findCapitalPoolList = findCapitalPoolList

// 财务管理--手续费转账
const findServiceFeeAccountList = function (curPage, ase, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findServiceFeeAccountList/10/${curPage}/${ase}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findServiceFeeAccountList = findServiceFeeAccountList

// 财务管理--异常交易数据
const findAbnormalExchangeList = function (curPage, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/findAbnormalExchangeList/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findAbnormalExchangeList = findAbnormalExchangeList


// // 财务管理--异常交易数据
// const getExchangeList = function ( success, error) {
//   api.get(`api/bm/financialManage/financialStatistics/findRechargeMonitorList/10/1`, (res) => {
//     if (res.rst === 1) {
//       success && success(res.data)
//     } else {
//       error && error(res.msg)
//     }
//   }, error)
// }
// finance.getExchangeList = getExchangeList

// 财务管理--平账管理--漏记
const ledgerAdd = function (data, success, error) {
  api.post(`api/bm/account/ledger/add`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.ledgerAdd = ledgerAdd


// 财务管理--平账管理--多记
const ledgerReduce = function (data, success, error) {
  api.post(`api/bm/account/ledger/reduce`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.ledgerReduce = ledgerReduce


// 财务管理--平账管理--平差
const ledgerBalance = function (data, success, error) {
  api.post(`api/bm/account/ledger/balance`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.ledgerBalance = ledgerBalance


// 财务管理--平账管理--错记
const ledgerFix = function (data, success, error) {
  api.post(`api/bm/account/ledger/fix`, data, (res) => {
    if (res.rst === 1) {
      success && success(res.data)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.ledgerFix = ledgerFix

// 财务管理--主地址币种
const getAdminWithdrawAccountInfo = function (curPage, success, error) {
  api.get(`api/bm/financialManage/financialStatistics/getAdminWithdrawAccountInfo/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.getAdminWithdrawAccountInfo = getAdminWithdrawAccountInfo


// 财务管理--用户总资产数据
const findUserAssetList = function (curPage, ase, success, error) {
  api.get(`/api/bm/financialManage/financialStatistics/findUserAssetList/10/${curPage}/${ase}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findUserAssetList = findUserAssetList


// 财务管理--用户充值记录
const findRechargeRecords = function (curPage, success, error) {
  api.get(`/api/bm/financialManage/financialStatistics/findRechargeRecords/10/${curPage}`, (res) => {
    if (res.rst === 1) {
      success && success(res.data, res.total)
    } else {
      error && error(res.msg)
    }
  }, error)
}
finance.findRechargeRecords = findRechargeRecords

export default finance