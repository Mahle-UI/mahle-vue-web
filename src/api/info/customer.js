import request from '@/utils/request'

// 查询相对方列表
export function listCustomer(query) {
  return request({
    url: '/info/obj/infolist',
    method: 'post',
    params: query
  })
}

// 查询相对方列表
export function getCustomer(query) {
  return request({
    url: '/info/obj/loadinfo',
    method: 'post',
    params: query
  })
}

// 新增相对方
export function addCustomer(data) {
  return request({
    url: '/info/obj/addinfo',
    method: 'post',
    data: data
  })
}

// 修改相对方
export function updateCustomer(data) {
  return request({
    url: '/info/obj/editinfo',
    method: 'post',
    data: data
  })
}

// 删除相对方
export function delCustomer(data) {
  return request({
    url: '/info/obj/delinfo',
    method: 'post',
    data: data
  })
}

// 导出相对方
export function exportCustomer(query) {
  return request({
    url: '/info/obj/infoexport',
    method: 'post',
    params: query
  })
}

// 相对方校验名字
export function vaildObjName(data) {
  return request({
    url: '/info/obj/vaildobjname',
    method: 'post',
    params: data
  })
}