import request from '@/utils/request'

// 查询合同查询列表
export function listContract(query) {
  return request({
    url: '/info/continfo/contractlist',
    method: 'post',
    data: query,
    params:{pageNum:query.pageNum,pageSize:query.pageSize}
  })
}
//合同分类
export function loadcontractcate() {
  return request({
    url: '/info/continfo/loadcontractcate',
    method: 'post'
  })
}
//语言
export function loadcontractlangs() {
  return request({
    url: '/info/continfo/loadcontractlangs',
    method: 'post'
  })
}
//签约主体
export function loadsigndept() {
  return request({
    url: '/info/continfo/loadsigndept',
    method: 'get'
  })
}
 //相对方
 export function loadobjcombo() {
  return request({
    url: '/info/continfo/loadobjcombo',
    method: 'post'
  })
}
//加载 币种
export function loadcurrencycombo() {
  return request({
    url: '/info/continfo/loadcurrencycombo',
    method: 'post'
  })
}
//税种
export function loadtaxcombo() {
  return request({
    url: '/info/continfo/loadtaxcombo',
    method: 'post'
  })
}
//相关部门
export function loaddeptcombo() {
  return request({
    url: '/info/continfo/loaddeptcombo',
    method: 'get',
  })
}
//查询申请人
export function searchapplyman(query) {
  return request({
    url: '/info/continfo/searchapplyman',
    method: 'post',
    params: query
  })
}
//查询模板
export function searchcontempname(query) {
  return request({
    url: '/info/continfo/searchcontempname',
    method: 'post',
    params: query
  })
}
//查询主协议
export function searchmastercontract(query) {
  return request({
    url: '/info/continfo/searchmastercontract',
    method: 'get',
    params: query
  })
}
//检索当前用户有没有暂存 的 合同
export function searchtmpcontract(query) {
  return request({
    url: '/info/continfo/searchtmpcontract',
    method: 'post',
    params: query
  })
}
//合同的 查看
export function getView(query) {
  return request({
    url: '/info/continfo/view',
    method: 'post',
    params:query
  })
}
//合同添加
export function addcontractinfo(data) {
  return request({
    url: '/info/continfo/addcontractinfo',
    method: 'post',
    data:data
  })
}
//合同的 归档操作
export function archiveoperation(data) {
  return request({
    url: '/info/continfo/archiveoperation',
    method: 'post',
    data:data
  })
}
//效验 合同名
export function chkcontractname(query) {
  return request({
    url: '/info/continfo/chkcontractname',
    method: 'post',
    params:query
  })
}
//历史合同 获得合同编号
export function inithistorycontractno() {
  return request({
    url: '/info/continfo/inithistorycontractno',
    method: 'post'
  })
}
//合同下载
export function downloadcontractinfo(query) {
  return request({
    url: '/info/continfo/downloadcontractinfo',
    method: 'post',
    responseType: 'blob',
    params:query
  })
}
//合同文件的 更新
export function updcontractfile(data) {
  return request({
    url: '/info/continfo/updcontractfile',
    method: 'post',
    params:data
  })
}

//添加 简易的相对方
export function addsimpleobj(data) {
  return request({
    url: '/info/continfo/addsimpleobj',
    method: 'post',
    params:data
  })
}

//合同修改
export function updcontractinfo(data) {
  return request({
    url: '/info/continfo/updcontractinfo',
    method: 'post',
    data:data
  })
}
//合同导出
export function exportContract(data) {
  return request({
    url: '/info/continfo/linkexport',
    method: 'post',
    data:data
  })
}
//归档结束
export function changearchiveend(data) {
  return request({
    url: '/info/continfo/changearchiveend',
    method: 'post',
    params:data
  })
}
export function loadsupplyman() {
  return request({
    url: '/info/continfo/loadsupplyman',
    method: 'post'
  })
}
export function addexplan(data) {
  return request({
    url: '/info/continfo/addexplan',
    method: 'post',
    params:data
  })
}
///dev-api/page/office/copy/temp/{id}
//合同模板复制
export function getPageOfficeCopyTemp(data) {
  return request({
    url: `/page/office/copy/temp/${data.id}`,
    method: 'get',
    params:data
  })
}

///dev-api/info/msg/confirm
//追加解释 _确认按钮
export function msgConfirm(data) {
  return request({
    url: '/info/msg/confirm',
    method: 'post',
    params:data
  })
}
///dev-api/info/msg/launchmsg
//添加追加解释
export function msgLaunchmsg(data) {
  return request({
    url: '/info/msg/launchmsg',
    method: 'post',
    params:data
  })
}
///dev-api/info/msg/loadmsg
//加载追加解释
export function msgLoadmsg(data) {
  return request({
    url: '/info/msg/loadmsg',
    method: 'post',
    params:data
  })
}
//info/continfo/isexistmanager
//判断有没有经理
export function continfoIsexistmanager(data) {
  return request({
    url: '/info/continfo/isexistmanager',
    method: 'post',
    params:data
  })
}

export function downloadfile(query) {
  return request({
    url: '/info/file/downloadfile',
    method: 'post',
    responseType: 'blob',
    params:query
  })
}

export function continfoTransfer(query) {
  return request({
    url: 'info/continfo/transfer',
    method: 'post',
    params:query
  })
}

export function continfoSearchowner(query) {
  return request({
    url: 'info/continfo/searchowner',
    method: 'post',
    params:query
  })
}
