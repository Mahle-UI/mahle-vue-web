import request from '@/utils/request'


//追加解释
export function welcomeExplain(data) {
  return request({
    url: '/info/welcome/explain',
    method: 'post',
    params: data
  })
}

//公告
export function welcomeInfrom(data) {
  return request({
    url: '/info/welcome/infrom',
    method: 'post',
    params: data
  })
}

//我的 消息
export function welcomeNotice(data) {
  return request({
    url: '/info/welcome/notice',
    method: 'post',
    params: data
  })
}

//已读 我的 消息
export function readNotice(id) {
  return request({
    url: '/info/welcome/new/read/' + id,
    method: 'get'
  })
}
