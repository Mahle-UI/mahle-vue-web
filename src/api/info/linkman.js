import request from '@/utils/request'

// 查询联系人列表
export function listLinkman(query) {
  return request({
    url: '/info/obj/linklist',
    method: 'post',
    params: query
  })
}


// 查询联系人列表
export function getLinkman(query) {
  return request({
    url: '/info/obj/loadlink',
    method: 'post',
    params: query
  })
}
 

// 新增联系人
export function addLinkman(data) {
  return request({
    url: '/info/obj/addlink',
    method: 'post',
    data: data
  })
}

// 修改联系人
export function updateLinkman(data) {
  return request({
    url: '/info/obj/udplink',
    method: 'post',
    data: data
  })
}

// 删除联系人
export function delLinkman(data) {
  return request({
    url: '/info/obj/dellink',
    method: 'post',
    data: data
  })
}

// 导出联系人
export function exportLinkman(query) {
  return request({
    url: '/info/linkman/export',
    method: 'post',
    params: query
  })
}

// 联系人校验名字
export function vaillinkmobile(data) {
  return request({
    url: '/info/obj/vaillinkmobile',
    method: 'post',
    params: data
  })
}