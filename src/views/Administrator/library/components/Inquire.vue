<template>
  <el-form ref="form" :model="form" label-width="100px" class="inquire">
    <div :class="len">
      <div class="inquire-select" style="marginLeft:-18px">
        <el-form-item
          label="选择省份:" 
          style="width:200px;marginBottom:0;"
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
          label="图书馆类型:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          inline="true">
          <el-select v-model="inputcontent.category" placeholder="请选择">
            <el-option
              label="全部"
              :value="4"
              > 全部</el-option>
            <el-option
              label="幼儿园"
              :value="1"
              > 幼儿园</el-option>
            <el-option
              label="社区馆"
              :value="2"
              >社区馆</el-option>
            <el-option
              label="小学"
              :value="3"
              >小学</el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="inquire-input">
        <el-form-item label="图书馆名称:"  >
          <el-input v-model="inputcontent.name"></el-input>
        </el-form-item>
        <el-form-item  label="图书馆编号:" >
          <el-input v-model="inputcontent.sysNo"></el-input>
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
        name: '',
        sysNo: ''
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
      libList: state=>state.library.libList
    })
  },
  methods: {
    ...mapActions({
      town: 'library/town',
      area: 'library/area',
      lists: 'library/list'
    }),
   async handleChage(value) {
     this.inputcontent.cityId = '',
     this.inputcontent.regionId = '',
     await this.town({
        parentId:value
      })
    },
   async handleChagearea(value) {
     await this.area({
        parentId:value
      })
    },
   async onSubmit(e) {
      this.inputcontent.pageSize = 10
      await this.lists(this.inputcontent)
    },
   async ondelete(){
     for(let k in this.inputcontent) {
       this.inputcontent[k] = ''
     }
     await this.lists({
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

