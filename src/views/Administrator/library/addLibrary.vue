<template>
  <div class="edit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="input-line">
        <el-form-item label="登录账号:" prop="loginName">
          <el-input v-model="ruleForm.loginName"></el-input>
        </el-form-item>
        <el-form-item label="登录密码:" prop="passwd">
          <el-input v-model="ruleForm.passwd"></el-input>
        </el-form-item>
      </div>
      <div class="input-line some" style="marginLeft:-6px;">
        <el-form-item
          label="选择省份"
          style="width:200px;marginBottom:0;"
          size="small"
          prop="provices"
          inline="true">
          <el-select v-model="ruleForm.provices" @change='handleChage' placeholder="请选择">
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
          <el-select v-model="ruleForm.towns" @change='handleChagearea'  placeholder="请选择">
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
          <el-select v-model="ruleForm.regionId" placeholder="请选择">
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
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="图书馆地址:" prop="provices">
          <el-input v-model="ruleForm.address" />
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="图书馆类型:" prop="provices" style="padding:0 15px;boxSizing: borderBox;">
          <el-select v-model="ruleForm.category" placeholder="请选择">
            <el-option label="幼儿园" value="1"></el-option>
            <!-- <el-option label="社区馆" value="2"></el-option> -->
            <el-option label="小学" value="3"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="input-line" style="marginLeft:-14px;">
        <div v-if="ruleForm.category == 2" style="marginLeft:18px;">
          <el-form-item label="学年价格下限:" prop="provices">
            <el-input v-model="ruleForm.limitDisposit" />
          </el-form-item>
        </div>
        <div v-else style="display:flex;">
          <el-form-item label="收费模式:" prop="provices" style="padding:0 15px;boxSizing: borderBox;">
            <el-select v-model="ruleForm.isThirdparty" placeholder="请选择">
              <el-option label="会员费" :value="false"></el-option>
              <el-option label="服务费" :value="true"></el-option>
            </el-select>
          </el-form-item>
          
          <div v-if="ruleForm.isThirdparty == true">
            
          </div>
          <div v-else style="display:flex;">
            <el-form-item label="学期价格:" prop="semesterPayAmount">
              <el-input v-model.number="ruleForm.semesterPayAmount" />
            </el-form-item>
            <el-form-item label="学年价格:" prop="semesterPayAmount">
              <el-input v-model.number="ruleForm.yearPayAmount" />
            </el-form-item>
          </div>
        </div>
      </div>
      <div class="input-line">
        <el-form-item label="账号状态:" prop="provices">
          <el-radio-group v-model="ruleForm.isDisabled">
            <el-radio :label="0" value="0">启用</el-radio>
            <el-radio :label="1" value="1">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
      <div class="input-line">
        <el-button type="primary" @click="submitForm()" style="margin:20px">保存</el-button>
      </div>
      <div class="input-line">
        <!-- <div v-if="pattern == 2" >
          <el-form-item label="社区管理邀请码:" prop="region">
            <el-input v-model="term"/>
            <el-button type="primary" style="marginTop:10px" @click="create">生成社区馆邀请码</el-button>
          </el-form-item>
        </div> -->
        <el-form-item label="班级设置:" prop="provices">
          <div class="class-from">
            <Table />
          </div>
        </el-form-item>
      </div>
      <el-form-item class="input-end" style="marginLeft:0">
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
        loginName: '',
        passwd: '',
        provices: '',
        towns: '',
        regionId: '',
        name: '',
        address: '',
        category: '',
        isThirdparty: '',
        semesterPayAmount: '',
        limitDisposit: '',
        yearPayAmount: '',
        isDisabled: 0,
      },
      rules: {
        loginName: [
          { required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        passwd: {
          required: true, message: '密码不能为空', trigger: 'blur'
        },
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
  watch: {
    Librarytype:function (val) {
      this.pattern = val
    },
    region:function (val) {
      // console.log(val,"w")
    }
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
  async submitForm() {
     await this.establish(this.ruleForm)
     if(this.libraryList.success){
      this.$message({
        message: '添加成功',
        type: 'success'
      })
     } else {
       this.$message({
        // message: this.libraryList.logMessage,
        message: '保存失败',
        type: 'error'
      })
     }
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
.some{
  margin-top: 10px;
  margin-bottom: 20px;
}
</style>
