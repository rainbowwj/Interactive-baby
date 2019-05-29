<template>
  <el-form ref="form" :model="form" label-width="100px" class="inquire">
    <div :class="len">
      <div class="inquire-select" style="marginLeft:-18px">
        <el-form-item
          label="选择省份:" 
          style="width:200px;marginBottom:0;marginLeft:2px;"
          inline="true">
          <el-select v-model="inputcontent.provinceId" @change='handleChage' placeholder="请选择">
            <el-option
              v-for="item in title"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择市:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          inline="true">
          <el-select v-model="inputcontent.cityId" @change='handleChagearea'  placeholder="请选择">
            <el-option
              v-for="item in townList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择区:" 
          style="width:200px;marginBottom:0;" 
          inline="true">
          <el-select v-model="inputcontent.regionId" placeholder="请选择">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
         <el-form-item
          label="收费类型:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          inline="true">
          <el-select v-model="inputcontent.isThirdparty" placeholder="请选择">
            <el-option
              label="全部"
              :value="3"
              > 全部</el-option>
            <el-option
              label="会员费"
              :value="0"
              > 会员费</el-option>
            <el-option
              label="服务费"
              :value="1"
              >服务费</el-option>
          </el-select>
         </el-form-item>
         <el-form-item
          label="支付状态:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          inline="true">
          <el-select v-model="inputcontent.payStatus" placeholder="请选择">
            <el-option
              label="全部"
              :value="4"
              > 全部</el-option>
            <el-option
              label="未付款"
              :value="1"
              >未付款</el-option>
            <el-option
              label="已付款"
              :value="2"
              >已付款</el-option>
          </el-select>
        </el-form-item>
          <el-form-item
          label="支付方式:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          inline="true">
          <el-select v-model="inputcontent.payType" placeholder="请选择">
            <el-option
              label="全部"
              :value="4"
              > 全部</el-option>
            <el-option
              label="微信"
              :value="1"
              > 微信</el-option>
            <el-option
              label="支付宝"
              :value="2"
              >支付宝</el-option>
            <el-option
              label="线下支付"
              :value="3"
              >线下支付</el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="inquire-input">
        <el-form-item label="图书馆名称:"  >
          <el-input v-model="inputcontent.eduName"></el-input>
        </el-form-item>
        <el-form-item  label="图书馆编号:" >
          <el-input v-model="inputcontent.eduId"></el-input>
        </el-form-item>
        <el-form-item style="height:100%">
          <el-button type="primary" @click="onSubmit">查询</el-button>
          <el-button type="primary" @click="ondelete">重置</el-button>
        </el-form-item>
      </div>
    </div>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { constants } from 'fs';
export default {
  data() {
    return {
      inputcontent: {
        provinceId: '',
        cityId: '',
        regionId: '',
        isThirdparty: '',
        category: '',
        eduName: '',
        eduId: '',
        payStatus:'',
        payType:'',
      },
      form: {
        name: '',
        region: '',
        type: [],
      }
    }
  },
  props: {
    title: Array,
    titlesome: Array,
    len: String
  },
   computed:{
    ...mapState({
      townList: state=>state.library.townList,
      areaList: state=>state.library.areaList,
      searchEduInstitutionList: state=>state.library.searchEduInstitutionList
    })
  },
  methods: {
    ...mapActions({
      town: 'library/town',
      area: 'library/area',
      searchEduInstitution: 'library/searchEduInstitution'
    }),
    // 省
    async handleChage(value) {
     this.inputcontent.cityId = '',
     this.inputcontent.regionId = '',
     await this.town({
        parentId:value
      })
    },
    // 市
    async handleChagearea(value) {
     await this.area({
        parentId:value
      })
    },
    // 查询社区馆信息
    async onSubmit(e) {
      this.inputcontent.pageSize = 10
      await this.searchEduInstitution(this.inputcontent)
    },
    // 重置
    async ondelete(){
      for(let k in this.inputcontent) {
        this.inputcontent[k] = ''
      }
      await this.searchEduInstitution({
        pageSize:10,
      })
    }
  }
}
</script>
<style lang="scss">
.inquire{
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.inquire-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  .inquire-select{
    display: flex;
  }
  .inquire-input{
    display: flex;
    margin-top: 10px;
  }
}
.vip-input{
  width: 100%;
  display: flex;
  .inquire-select{
    display: flex;
  }
  .inquire-input{
    display: flex;
  }
}
</style>

