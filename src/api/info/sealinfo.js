import request from '@/utils/request'
import qs from "qs"

// 查询印章申请列表
export function listSealinfo(query) {
  return request({
    url: '/info/seal/seallist',
    method: 'post',
    params: query
  })
}

// 查询印章申请详细
export function getSealinfo(query) {
  return request({
    url: '/info/seal/loadseal',
    method: 'post',
    params: query
  })
}

// 新增印章申请
export function addSealinfo(data) {
  return request({
    url: '/info/seal/addseal',
    method: 'post',
    data: data
  })
}

// 修改印章申请
export function updateSealinfo(data) {
  return request({
    url: '/info/seal/updseal',
    method: 'post',
    data: data
  })
}


//检索当前用户有没有暂存 的 印章
export function searchtmpseal() {
  return request({
    url: '/info/seal/searchtmpseal',
    method: 'post'
  })
}

//印章 查询保管人
export function searchkeeper(query) {
  return request({
    url: '/info/seal/searchkeeper',
    method: 'post',
    params: query
  })
}

// 导出印章
export function exportSealinfo(query) {
  return request({
    url: '/info/seal/export',
    method: 'get',
    params: query
  })
}

//印章 作废
export function sealtrash(query) {
  return request({
    url: '/info/seal/sealtrash',
    method: 'post',
    params: query
  })
}

//印章 下拉框
export function sealcombo(query) {
  return request({
    url: '/info/seal/sealcombo',
    method: 'post',
    params: query
  })
}

//印章 查看
export function getView(query) {
  return request({
    url: `/info/seal/view/${query.supplyId}/${query.type}`,
    method: 'get',
    params: query
  })
}

//返回当前 时间
export function rtncrrtime() {
  return request({
    url: '/info/seal/rtncrrtime',
    method: 'post'
  })
}

//印章 作废图片上传
export function uploadsealtrashpic(query) {
  return request({
    url: '/info/seal/uploadsealtrashpic',
    method: 'post',
    params: query
  })
}

//印章 归属
export function ownership(query) {
  return request({
    url: '/info/seal/ownership',
    method: 'post',
    params: query
  })
}

// 或者保管员
export function getSealStore(query) {
  return request({
    url: 'info/seal/getSealStore',
    method: 'get',
    params: query
  })
}

//移交操作
export function sealTransfer(query) {
  return request({
    url: 'info/seal/sealTransfer',
    method: 'post',
    params:query
  })
}
//印章 更新图片上传
export function uploadsealpic(query) {
  return request({
    url: `/info/seal/updateSealImg/${query.supplyId}/${query.fileId}`,
    method: 'post'
  })
}
