import request from '@/utils/request'

 
//取消代办设置操作
export function cancelAction(data) {
  return request({
    url: '/agent/cancel/action',
    method: 'post',
    params: data
  })
}

//代办历史记录查看办理详情
export function dealInfo(query) {
  return request({
    url: '/agent/dealInfo',
    method: 'get',
    params: query
  })
}
//代办工作接收操作
export function handworkReceive(query) {
  return request({
    url: '/agent/handwork/receive',
    method: 'get',
    params: query
  })
}
//代办设置操作（可批量）
export function operateAction(data) {
  return request({
    url: '/agent/operate/action',
    method: 'post',
    params: data
  })
}
//个人代办设置列表
export function personList(query) {
  return request({
    url: '/agent/person/list',
    method: 'get',
    params: query
  })
}
//代办工作接收列表
export function receiveList(query) {
  return request({
    url: '/agent/receive/list',
    method: 'get',
    params: query
  })
}
//代办历史记录列表
export function recordList(query) {
  return request({
    url: '/agent/record/list',
    method: 'get',
    params: query
  })
}
//代办移交列表
export function transferList(query) {
  return request({
    url: '/agent/transfer/list',
    method: 'get',
    params: query
  })
}

export function agentList(query) {
  return request({
    url: '/agent/agent/list',
    method: 'get',
    params: query
  })
}