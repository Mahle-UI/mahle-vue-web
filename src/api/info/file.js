import request from '@/utils/request'

// 删除文件
export function deleteFile(query) {
  return request({
    url: '/info/file/delete',
    method: 'post',
    params: query
  })
}
