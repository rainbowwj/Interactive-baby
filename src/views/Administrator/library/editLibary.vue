<template>
  <div class="edit">
    <el-form :model="mainObj" :rules="rules" ref="mainObj" label-width="100px" class="demo-ruleForm">
      <div class="input-line">
        <el-form-item label="登录账号:" prop="loginName">
          <el-input v-model="mainObj.loginName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="登录密码:" prop="name">
          <el-input v-model="mainObj.pwd"></el-input>
        </el-form-item> -->
      </div>
      <div class="input-line some" style="marginLeft:-6px;">
        <el-form-item
          label="选择省份" 
          style="width:200px;marginBottom:0;" 
          size="small"
          prop="provices"
          inline="true">
          <el-select v-model="mainObj.provices" @change='handleChage' placeholder="请选择">
            <el-option
              v-for="item in cityList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              size='medium'
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择市:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          prop="provices"
          inline="true">
          <el-select v-model="mainObj.towns" @change='handleChagearea'  placeholder="请选择">
            <el-option
              v-for="item in townList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              size='medium'
              >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="选择区:" 
          style="width:200px;marginBottom:0;" 
          size="small"
          prop="provices"
          inline="true">
          <el-select v-model="mainObj.areas" @change='handleChageEnd' placeholder="请选择">
            <el-option
              v-for="item in areaList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
              size='medium'
              >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="input-line" style="padding:0 13px;boxSizing: borderBox;">
        <el-form-item label="图书馆名称:" prop="provices">
          <el-input v-model="mainObj.name" />
        </el-form-item>
        <el-form-item label="图书馆地址:" prop="provices">
          <el-input v-model="mainObj.address" />
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="图书馆类型:" prop="provices" style="padding:0 15px;boxSizing: borderBox;">
          <el-select v-model="mainObj.category" placeholder="请选择">
            <el-option label="幼儿园" value="1"></el-option>
            <!-- <el-option label="社区馆" value="2"></el-option> -->
            <el-option label="小学" value="3"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="input-line" style="marginLeft:-14px;">
        <div v-if="mainObj.category == 2" style="marginLeft:18px;">
          <el-form-item label="学年价格下限:" prop="provices">
            <el-input v-model="mainObj.limitDisposit" />
          </el-form-item>
        </div>
        <div v-else style="display:flex;">
          <el-form-item label="收费模式:" prop="provices" style="padding:0 15px;boxSizing: borderBox;">
            <el-select v-model="mainObj.isThirdparty" placeholder="请选择">
              <el-option label="会员费" :value="false"></el-option>
              <el-option label="服务费" :value="true"></el-option>
            </el-select>
          </el-form-item>  
        <div v-if="mainObj.isThirdparty == true"></div>
          <div v-else style="display:flex;">
            <el-form-item label="学期价格:" prop="semesterPayAmount">
              <el-input v-model.number="mainObj.semesterPayAmount" />
            </el-form-item>
            <el-form-item label="学年价格:" prop="semesterPayAmount">
              <el-input v-model.number="mainObj.yearPayAmount" />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="input-line">
        <el-form-item label="账号状态:" prop="provices">
          <el-radio v-model="mainObj.isDisabled" label="0">启用</el-radio>
          <el-radio v-model="mainObj.isDisabled" label="1">禁用</el-radio>
        </el-form-item>
      </div>
      <!-- <div class="input-line">
        <el-button type="primary" @click="submitForm('ruleForm')" style="margin:20px">保存</el-button>
      </div> -->
      <div class="input-line">
        <el-form-item label="班级设置:" prop="provices">
          <div class="class-from">
            <EditTable :classInfo="this.oldLibary.classInfoList"/>
          </div>
        </el-form-item>
      </div>
      <el-form-item class="input-end" style="marginLeft:0">
        <el-button type="primary" @click="submitForm()">保存</el-button>
        <router-link to="/Administrator/library"><el-button>取消</el-button></router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import EditTable from '@/components/EditTable'
import { mapActions, mapState } from 'vuex'
import { constants, copyFile, copyFileSync, close } from 'fs';
import libraryVue from './library.vue';

export default {
  data() {
    return {
      mainObj:{
        loginName: '',
        pwd: '',
        provices: '',
        towns: '',
        areas: '',
        isThirdparty: '',
        limitDisposit: '',
        name: '',
        address: '',
        category: '',
        semesterPayAmount: '',
        yearPayAmount: '',
        isDisabled: ''
      },
      rules: {
        loginName: [
          { required: true, message: '账号不能为空', trigger: 'blur'}
        ],
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
    // 进入详情的信息
    await this.editoldlibary({
      SysNo:this.$route.params.id
    })
    //省
    await this.city()
    // 市
    await this.town({
      parentId:this.oldLibary.provinceId
    })
    // 区
    await this.area({
      parentId:this.oldLibary.cityId
    })
    // 进入详情的信息数据
    this.mainObj = {
      ...this.oldLibary
    }
    //获取到具体的省份
    this.mainObj.provices = this.cityList.filter(item=>{
      return item.id === this.oldLibary.provinceId
    })[0].id
    //获取到具体的市
    this.mainObj.towns = this.townList.filter(item=>{
      return item.id === this.oldLibary.cityId
    })[0].id
    //获取到具体的区
    this.mainObj.areas = this.areaList.filter(item=>{
      return item.id=== this.oldLibary.regionId
    })[0].id
  },
  components:{
    EditTable
  },
  computed:{
    ...mapState({
      cityList: state=>state.library.cityList,
      townList: state=>state.library.townList,
      areaList: state=>state.library.areaList,
      libraryList: state=>state.library.libraryList,
      oldLibary: state=>state.library.oldLibary,
    })
  },
  methods: {
    ...mapActions({
      city: 'library/city',
      town: 'library/town',
      area: 'library/area',
      establish: 'library/establish',
      editoldlibary:'library/editoldlibary',
      RenewalLibrary:'library/RenewalLibrary',
    }),
    async handleChage(value) {
      this.mainObj.towns = ''
      this.mainObj.areas = ''
      await this.town({
        parentId:value,
      })
    },
    async handleChagearea(value) {
      await this.area({
        parentId:value
      })
    },
    async handleChageEnd(value){
      await this.area({
        parentId:value
      })
    },
    /** 保存更新后的图书馆 */
    async submitForm(v) {
      this.mainObj.regionId = this.mainObj.areas
      await this.RenewalLibrary(this.mainObj).then(res=>{
        if(res.success){
          this.$message({
            type:'success',
            message:"保存成功"
          })
          this.$router.push('/Administrator/library')
        }else{
          this.$message({
            type:'error',
            message:"保存失败"
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
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
  padding: 30px 20px;
  border-top:1px solid #666;
}
.el-form-item /deep/ {
  margin-left:0;
}
.some{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
