import request from '@/utils/request'

// 查询合同模板列表
export function listContractTemplate(query) {
  return request({
    url: '/info/contempl/templlist',
    method: 'post',
    params: query
  })
}

// 查询合同模板详细
export function getContractTemplate(templateId) {
  return request({
    url: '/info/contractTemplate/' + templateId,
    method: 'get'
  })
}

// 新增合同模板
export function addContractTemplate(data) {
  return request({
    url: '/info/contempl/addTemplate',
    method: 'post',
    data: data
  })
}

// 加载 合同分类
export function loadcontractcate(data) {
  return request({
    url: '/info/contempl/loadcontractcate',
    method: 'post',
    data: data
  })
}

//加载 使用 部门
export function loaddept(data) {
  return request({
    url: '/info/contempl/loaddept',
    method: 'post',
    data: data
  })
}

//加载 相关 部门
export function loaddictdept(data) {
  return request({
    url: '/info/contempl/loaddictdept',
    method: 'get',
    data: data
  })
}

//检索当前用户有没有暂存 的 模板
export function searchtmptempl(data) {
  return request({
    url: '/info/contempl/searchtmptempl',
    method: 'post',
    data: data
  })
}

//效验 模板名称是否唯一性
export function vaildtemplname(data) {
  return request({
    url: '/info/contempl/vaildtemplname',
    method: 'post',
    params: data
  })
}

//加载
export function loadtempl(data) {
  return request({
    url: '/info/contempl/loadtempl',
    method: 'post',
    params: data
  })
}

//合同模板修改状态
export function changestatus(data) {
  return request({
    url: '/info/contempl/changestatus',
    method: 'post',
    params: data
  })
}

//合同模板查看
export function contemplView(data) {
  return request({
    url: '/info/contempl/view',
    method: 'post',
    params: data
  })
}
//合同模板下级
export function loadsubvers(data) {
  return request({
    url: '/info/contempl/loadsubvers',
    method: 'post',
    params: data
  })
}
// 新增合同模板
export function updTemplate(data) {
  return request({
    url: '/info/contempl/updTemplate',
    method: 'post',
    data: data
  })
}

export function getContractExport(data) {
  return request({
    url: '/info/contempl/export',
    method: 'get',
    params: data
  })
}
