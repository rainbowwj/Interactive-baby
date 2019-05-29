<template>
  <div class="edit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <div class="input-line some" style="marginLeft:-6px;">
        <el-form-item
          label="选择省份"
          size="medium"
          style="width:300px;marginLeft:-40px;" 
          prop="provices"
          inline="true">
          <el-select v-model="ruleForm.provices" @change='handleChage' placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择市:" 
          style="width:300px;marginBottom:0;" 
          size="medium"
          prop="provices"
          inline="true">
          <el-select v-model="ruleForm.towns" @change='handleChagearea'  placeholder="请选择">
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
          style="width:300px;" 
          size="medium"
          prop="provices"
          inline="true">
          <el-select v-model="ruleForm.regionId" placeholder="请选择">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="addVip">
        <el-form-item label="设置会员最低价:" style="width:400px;marginBottom:0;" prop="semesterPayAmount">
          <el-input v-model="ruleForm.passwd"></el-input>
        </el-form-item>
      </div>
      <el-form-item class="input-end" style="marginLeft: 0px;">
        <router-link to="/Administrator/library"><el-button type="primary">保存</el-button></router-link>
        <router-link to="/Administrator/library"><el-button>取消</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { mapActions, mapState } from 'vuex'

export default {
  data() {
    return {
      ruleForm: {
        provices: '',
        towns: '',
        regionId: '',
      },
      rules: {
        provices: {
          required: true, message: '内容不能为空', trigger: 'blur'
        },
        semesterPayAmount:[
          { required: true, message: '内容不能为空'},
          { type: 'number', message: '内容必须为数字'}
        ]
      }
    }
  },
  async created() {
    await this.city()
  },
  components:{
    Table
  },
  computed:{
    ...mapState({
      cityList: state=>state.library.cityList,
      townList: state=>state.library.townList,
      areaList: state=>state.library.areaList,
      libList: state=>state.library.libList,
      libraryList: state=>state.library.libraryList
    })
  },
  methods: {
  ...mapActions({
    city: 'library/city',
    town: 'library/town',
    area: 'library/area',
    lists: 'library/list',
    establish: 'library/establish'
  }),
  async handleChage(value) {
    await this.town({
      parentId:value,
    })
  },
  async handleChagearea(value) {
    await this.area({
      parentId:value
    })
  },
  /** 保存新的图书馆 */
  submitForm() {

    }
  }
}
</script>

<style lang="scss" scoped>
.edit{
  width: 90%;
  margin: 20px 0 0 20px;
}
.input-line{
  display: flex;
}
.class-from{
  padding: 20px;
  box-sizing: border-box;
  border:1px solid #000;
}
.class-btn{
  display: block;
  margin: 20px  auto;
}
.input-end{
  margin-top: 40px;
  padding: 30px 20px;
  border-top:1px solid #666;
}
.some{
  margin-top: 10px;
  margin-bottom: 20px;
}
.addVip{
  width: 60%;
}
.el-form-item__content{
  margin-left: 0 !important;
}
</style>
