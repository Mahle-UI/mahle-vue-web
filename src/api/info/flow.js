import request from '@/utils/request'

// 流程操作按钮 
export function getFlowOperateButton(query) {
  return request({
    url: '/flow/operate/button',
    method: 'get',
    params: query
  })
}

//提交/退回/退回提交等操作
export function getFlowOperateOperate(query) {
  return request({
    url: '/flow/operate/operate',
    method: 'get',
    params: query
  })
}

export function getProcesHandler(query) {
  return request({
    url: '/info/proces/handler/'+query.workId,
    method: 'get',
    params: query
  })
}
