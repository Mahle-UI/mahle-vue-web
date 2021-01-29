import request from '@/utils/request'
 

//公章外借详情
export function getView(id) {
  return request({
    url: '/flow/sealBorrow/'+id,
    method: 'get'
  })
}

//公章外借新增
export function addSealBorrow(data) {
  return request({
    url: '/flow/sealBorrow/add',
    method: 'post',
    params: data
  })
}

//检索当前用户有没有暂存的公章外借申请
export function checkSaveSealBorrow(data) {
  return request({
    url: '/flow/sealBorrow/check/save',
    method: 'post',
    params: data
  })
}

//公章外借修改
export function editSealBorrow(data) {
  return request({
    url: '/flow/sealBorrow/edit',
    method: 'put',
    params: data
  })
}

//公章外借列表
export function listSealBorrow(query) {
  return request({
    url: '/flow/sealBorrow/list',
    method: 'get',
    params: query
  })
}

// 导出印章
export function exportSealBorrow(query) {
  return request({
    url: '/flow/sealBorrow/export',
    method: 'get',
    params: query
  })
}