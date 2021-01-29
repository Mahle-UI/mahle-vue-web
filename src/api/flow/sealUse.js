import request from '@/utils/request'

// 查询印章登记列表
export function listSealUse(query) {
  return request({
    url: '/flow/sealUse/list',
    method: 'get',
    params: query
  })
}

// 查询印章登记详细
export function getSealUse(id) {
  return request({
    url: '/flow/sealUse/' + id,
    method: 'get'
  })
}

// 新增印章登记
export function addSealUse(data) {
  return request({
    url: '/flow/sealUse/add',
    method: 'post',
    data: data
  })
}

// 修改印章登记
export function updateSealUse(data) {
  return request({
    url: '/flow/sealUse',
    method: 'put',
    data: data
  })
}

// 删除印章登记
export function delSealUse(id) {
  return request({
    url: '/flow/sealUse/' + id,
    method: 'delete'
  })
}

// 导出印章登记
export function exportSealUse(query) {
  return request({
    url: '/flow/sealUse/export',
    method: 'get',
    params: query
  })
}

// 附件
export function attachmentSealUse(data) {
  return request({
    url: '/flow/sealUse/attachment/'+data.id,
    method: 'put',
    data: data
  })
}

//已用印
export function usedSealUse(id) {
  return request({
    url: '/flow/sealUse/used/'+id,
    method: 'get'
  })
}

//是否可以用印确认
export function canUsedSealUse(id) {
  return request({
    url: '/flow/sealUse/can/used/'+id,
    method: 'get'
  })
}

// 印章下拉
export function getSealcombo() {
  return request({
    url: '/flow/sealUse/sealcombo',
    method: 'get'
  })
}
export function postCheckStorage() {
  return request({
    url: '/flow/sealUse/check/storage',
    method: 'post'
  })
}
//用印登记暂存
export function storageSealUse(data) {
  return request({
    url: '/flow/sealUse/storage',
    method: 'post',
    data: data
  })
}

//法务专员节点上传附件后调用 更新数据
export function updateAnnex(data) {
  return request({
    url: '/flow/sealUse/updateAnnex',
    method: 'post',
    params: data
  })
}
