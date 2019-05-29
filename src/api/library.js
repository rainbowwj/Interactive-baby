import request from '../utils/request.js'
import qs from 'qs'
// 图书馆

/** 查找图书馆列表 */
export function fetchList(query) {
  return request.get('/admin/manage/searchEduInstitution',{params:{...query}})
}
/** 编辑图书馆 */
export function editoldlibary(query) {
  return request.get('/admin/manage/findManageUserBySysNo',{params:{...query}})
}
/**更新图书馆、用户信息 */
export function RenewalLibrary(query) {
  return request.post('/admin/manage/updateManageUser',qs.stringify({...query}))
}

/** 新建图书馆 */
export function newlibrary(query) {
  console.log(qs.stringify({...query}),"ssssssssssss")
  return request.post('/admin/manage/saveManageUser',qs.stringify({...query}))
}
/**删除图书馆*/
export function deleteone(query){
  return request.post('/book/admin/claerEdu',qs.stringify({...query}))
}
/** 查找省份 */
export function provice(query){
  return request.get('admin/regionInfo/findRegionInfo',{params:{...query}})
}

// 班级
/** 添加班级 */
export function newClass(query) {
  return request.post('/admin/manage/saveClassInfo',qs.stringify({...query}))
}
/** 更新班级 */
export function updateClassInfo(query) {
  return request.post('admin/manage/updateClassInfo',qs.stringify({...query}))
}
/** 删除班级 */
export function removeClassInfo(query){
  return request.get('/admin/manage/removeClassInfo',{params:{...query}})
}


/** 删除书包 */
export function clearBook(query) {
  return request.post('/bookbag/claerBookBag',qs.stringify({...query}))
}


/** 测试押金信息 */
export function cashPledge(query){
  return request.get('/admin/edu/get_deposit_info',{params:{...query}})
}

/** 测试查询用户账户 */
export function getUser(query){
  return request.get('/admin/edu/get_user_ac',{params:{...query}})
}



// 社区馆
/** 初始获取社区馆审核类型 */
export function checkType(query) {
  return request.get('/paramConfig/checkType/get',{params:{...query}})
}
/** 设置社区馆审核类型 */
export function ReviewTypes(query) {
  return request.post('/paramConfig/checkType/up',qs.stringify({...query}))
}
/** 查询社区馆列表 */
export function searchEduInstitution(query){
  return request.get('/apply/searchEduInstitution',{params:{...query}})
}
/** 管理员新建社区馆 */
export function eduInstApply(query) {
  return request.post('/apply/admin/eduInstApply',qs.stringify({...query}))
}
/** 人工审核图书馆 */
export function checkApply(query) {
  return request.post('/apply/check',qs.stringify({...query}))
}

/** 根据申请人查找社区馆详细信息 */
export function getEduApplyByApplyId(query){
  return request.get('/apply/getEduApplyByApplyId',{params:{...query}})
}
/** 详细审核编辑社区馆信息*/
export function upeduInstApply(query) {
  return request.post('/apply/up/eduInstApply',qs.stringify({...query}))
}

/** 上传照片 */
export function uploadStatusInfo(query) {
  return request.post('/admin/edu/upload_status_info',qs.stringify({...query}))
}