import request from '@/utils/request'

// 待我审批
export function listProces(query) {
  return request({
    url: '/info/proces/todo/list',
    method: 'post',
    params: query,
    data: query
  })
}
// 我的申请
export function applyList(query) {
  return request({
    url: '/info/proces/apply/list',
    method: 'post',
    params: query,
    data: query
  })
}
// 我已审批
export function hadDoneList(query) {
  return request({
    url: '/info/proces/hadDone/list',
    method: 'post',
    params: query,
    data: query
  })
}
// 我已审批
export function getFlowType(hostId) {
  return request({
    url: '/info/proces/getFlowType/' + hostId,
    method: 'get'
  })
}
