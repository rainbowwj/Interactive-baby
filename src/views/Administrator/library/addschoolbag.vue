<template>
  <div class="edit">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div class="input-column">
        <el-form-item label="选择适合年龄段" prop="region">
          <el-select v-model="ruleForm.region" placeholder="选择适合的年龄段">
            <el-option v-for="(item,i) in age" :key="i" :label="item.year" value="item.val"></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="input-line">
        <el-form-item label="借阅包资产编号" prop="name">
          <el-input v-model="ruleForm.name" placeholder="扫描借阅包资产编号"  style="background: url('../../assets/gun.jpg') no-repeat center center;"/>
        </el-form-item>
      </div>
      <div class="input-line schoolbox">
        <el-form-item label="书本1" prop="name">
          <el-input v-model="ruleForm.name" placeholder="扫描图书ISBN码" />
        </el-form-item>
        <b class="school-log">待校验</b>
      </div>
      <div class="input-line schoolbox">
        <el-form-item label="书本2" prop="name">
          <el-input v-model="ruleForm.name" placeholder="扫描图书ISBN码" />
        </el-form-item>
        <b class="school-log">待校验</b>
      </div>
      <div class="input-line schoolbox">
        <el-form-item label="书本3" prop="name">
          <el-input v-model="ruleForm.name" placeholder="扫描图书ISBN码" />
        </el-form-item>
        <b class="school-log">待校验</b>
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
      age: [
        {
          year:'0-4岁',
          val:1
        },
        {
          year:'3-5岁',
          val:2
        },
        {
          year:'4-6岁',
          val:3
        }],
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
.schoolbox{
  display: flex;
}
.school-log{
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
  color: #ccc;
}
</style>
