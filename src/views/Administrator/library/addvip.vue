<template>
  <div class="edit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="input-line">
        <div v-for="(item,i) in title" :key="i">
          <el-form-item :label="item" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
        </div>
      </div>
      <div class="input-line">
        <el-form-item label="图书馆" prop="name">
          互动宝宝图书馆
        </el-form-item>
      </div>
      <div class="input-column">
        <div v-for="(item,i) in province" :key="i">
          <el-form-item :label="item" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
      <div class="input-line">
        <el-form-item label="家庭住址" prop="region" style="padding:0 15px;boxSizing: borderBox;">
          <el-form-item :label="item" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="会员类型" prop="region" style="padding:0 15px;boxSizing: borderBox;">
           <el-button>半年</el-button>
           <el-button>一年</el-button>
           <el-button>其他</el-button>
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="会员费用" prop="name">
          150元
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="账号状态" prop="region">
          <el-radio-group v-model="radio">
            <el-radio :label="3">启用</el-radio>
            <el-radio :label="6">禁用</el-radio>
          </el-radio-group>
          <b class="forbidden">禁用状态下该会员无法继续享受会员服务</b>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="会员头像">
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg/gif件，且不超过500kb</div>
            <div class="addvip-img">
              <img src="http://img3.imgtn.bdimg.com/it/u=1777251953,97481680&fm=26&gp=0.jpg" alt="">
            </div>
          </el-upload>
        </el-form-item>
      </div>
      <el-form-item class="input-end" style="marginLeft:0">
        <router-link :to="'/Administrator/vip/0'"><el-button type="primary" @click="submitForm('ruleForm')" style="marginLeft:0">保存</el-button></router-link>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import ImageCropper from '@/components/ImageCropper'
export default {
  components: { ImageCropper},
  data() {
    return {
      title: ['手机号','会员姓名'],
      province: ['会员班级', '年龄段'],
      charge: ['收费模式', '学期价格', '学年价格'],
      ruleForm: {
        name: '',
        region: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入内容', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活地区', trigger: 'change' }
        ],
      },
      radio: 3,
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
.input-column{
  display: flex;
  flex-direction: column;
}
.forbidden{
  display: block;
  color: #666;
  font-size: 12px;
}
.addvip-img{
  width: 150px;
  height: 150px;
  margin-top: 20px;
  img{
    width: 100%;
    height: auto;
  }
}
</style>
