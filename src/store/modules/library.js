import { 
  fetchList, 
  provice, 
  deleteone, 
  newlibrary, 
  newClass, 
  clearBook,
  editoldlibary, 
  RenewalLibrary,
  updateClassInfo,
  removeClassInfo,
  cashPledge,
  getUser,
  ReviewTypes,
  searchEduInstitution,
  checkType,
  eduInstApply,
  checkApply,
  getEduApplyByApplyId,
  upeduInstApply,
  uploadStatusInfo,
  } from '@/api/library'
import bankNames from '../../../mock/bankName'

const state = {
  libList: [],
  cityList: [],
  townList: [],
  areaList: [],
  libraryList: [],
  classList: [],
  oldLibary: [],
  RenewalLibraryList: [],
  updateClassInfoList: [],
  removeClassInfoList: [],
  cashPledgeList: [],
  getUserList:[],
  searchEduInstitutionList:[],
  bankNameList:[],
  getEduApplyByApplyIdList: [],
}

const mutations = {
  UP_LIST: (state, payload) => {
    for(var key in payload) {
      state[key] = payload[key]
    }
  }
}

const actions = {
  /** 查找图书馆列表 */
  async list({ commit }, payload) {
    let result = await fetchList(payload)
    // console.log(result)
    commit('UP_LIST', {libList:result.result})
  },
  /** 省 */
  async city({commit}) {
    let data = await provice()
    commit('UP_LIST',{cityList:data.result})
  },
  /** 市 */
  async town({commit}, payload) {
    let data = await provice(payload)
    if(!this.townList){
     this.townList = data.result
    }
    commit('UP_LIST',{townList:data.result})
  },
  /** 区 */
  async area({commit}, payload) {
    let data = await provice(payload)
    commit('UP_LIST',{areaList:data.result})
  },
  /** 删除图书馆 */
  async delete({commit},payload) {
    let data = await deleteone(payload)
    return data
  },
  /** 新建图书馆 */
  async establish({commit},payload) {
    let data = await newlibrary(payload)
    commit('UP_LIST',{libraryList:data})
  },
  /** 添加班级 */
  async addClass({commit},payload) {
    let data = await newClass(payload)
    commit('UP_LIST',{classList:data})
  },
  /** 清除书包 */
  async clearBooks({commit},payload) {
    let data = await clearBook(payload)
    return data
  },
  /** 编辑图书馆 */
  async editoldlibary({commit},payload) {
    let data = await editoldlibary(payload)
    commit('UP_LIST',{oldLibary:data.result})
  },
  /**更新图书馆、用户信息 */
  async RenewalLibrary({commit},payload){
    let data = await RenewalLibrary(payload)
    return data
  },
  /** 更新班级 */
  async updateClassInfo({commit},payload) {
    let data = await updateClassInfo(payload)
    commit('UP_LIST',{updateClassInfoList:data})
  },
  /** 删除班级 */
  async removeClassInfo({commit},payload) {
    let data = await removeClassInfo(payload)
    commit('UP_LIST',{removeClassInfoList:data})
  },
  /** 测试押金信息 */
  async cashPledge({commit},payload) {
    let data = await cashPledge(payload)
    commit('UP_LIST',{cashPledgeList:data})
  },

  /** 测试查询用户账户 */
  async getUser({commit},payload) {
    let data = await getUser(payload)
    commit('UP_LIST',{getUserList:data.result})
  },




  // 社区馆请求

  /** 设置社区馆审核类型 */
  async ReviewTypes({commit},payload) {
    let data = await ReviewTypes(payload)
    return data
  },
  /** 查询社区馆列表 */
  async searchEduInstitution({commit},payload) {
    let data = await searchEduInstitution(payload)
    commit('UP_LIST',{searchEduInstitutionList:data.result})
  },
  /** 初始获取社区馆审核类型 */
  async checkType({commit},payload) {
    let data = await checkType(payload)
    return data
  },
  /** 管理员新建社区馆 */
  async eduInstApply({commit},payload) {
    return await eduInstApply(payload)
  },
  /** 选择银行 */
  async bankNameOption({commit},payload){
    let data = bankNames
    commit('UP_LIST',{bankNameList:data})
  },
  /** 人工审核图书馆 */
  async checkApply({commit},payload) {
    return await checkApply(payload)
  },
  /** 根据申请人查找社区馆详细信息 */
  async getEduApplyByApplyId({commit},payload){
    let data = await getEduApplyByApplyId(payload)
    commit('UP_LIST',{getEduApplyByApplyIdList:data.result})
  },
  /** 根据申请人查找社区馆详细信息 */
  async upeduInstApply({commit},payload){
    return await upeduInstApply(payload)
  },
  /** 上传照片 */
  async uploadStatusInfo({commit},payload){
    return await uploadStatusInfo(payload)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

