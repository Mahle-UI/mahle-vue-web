import request from '@/utils/request'
import { praseStrEmpty } from "@/utils/ruoyi";


///dev-api/data/statistics/contractApprovalCompletionRate
//合同按照部门与年度分组统计审批完成率
export function contractApprovalCompletionRate(query) {
  return request({
    url: '/data/statistics/contractApprovalCompletionRate',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/contractArchiveCompletionRate
//合同按照部门与年度分组统计归档完成率
export function contractArchiveCompletionRate(query) {
  return request({
    url: '/data/statistics/contractArchiveCompletionRate',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/contractGroup
//合同按照部门与年度分组统计
export function contractGroup(query) {
  return request({
    url: '/data/statistics/contractGroup',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/contractStatistics
//合同统计分页
export function contractStatistics(query) {
  return request({
    url: '/data/statistics/contractStatistics',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/countAndRate
//数量和完成率
export function countAndRate(query) {
  return request({
    url: '/data/statistics/countAndRate',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/flashSupportHistory
//刷新流程操作历史缓存
export function flashSupportHistory(query) {
  return request({
    url: '/data/statistics/flashSupportHistory',
    method: 'get',
    params: query
  })
}

///dev-api/data/statistics/todo/quantity
//每位审批人未处理的待审批合同/印章申请的数量
export function quantity(query) {
  return request({
    url: '/data/statistics/todo/quantity',
    method: 'get',
    params: query
  })
}


//合同导出
export function exportStatisticsData(data) {
  return request({
    url: '/data/statistics/export',
    method: 'get',
    params:data
  })
}
