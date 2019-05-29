<template>
  <div class="edit">
   <!-- 新建社区馆 -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="demo-ruleForm">
      <div class="basic">
        <el-form-item label="基础信息:" prop="mobile">
          </el-form-item>
          <div class="input-line">
            <el-form-item label="登录账号:" prop="mobile">
              <el-input v-model="ruleForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="登录密码:" prop="provinceId" >
              <el-input value="111111" :disabled="true"></el-input>
            </el-form-item>
          </div>
          <div class="input-line some" style="marginLeft:-6px;">
            <el-form-item
              label="选择省份"
              style="width:280px;marginBottom:0;"
              size="small"
              prop="provinceId"
              inline="true">
              <el-select v-model="ruleForm.provinceId" @change='handleChage' placeholder="请选择">
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
              style="width:280px;marginBottom:0;" 
              size="small"
              prop="provinceId"
              inline="true">
              <el-select v-model="ruleForm.cityId" @change='handleChagearea'  placeholder="请选择">
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
              style="width:280px;marginBottom:0;" 
              size="small"
              prop="provinceId"
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
            <el-form-item label="图书馆名称:" prop="provinceId">
              <el-input v-model="ruleForm.eduName" />
            </el-form-item>
            <el-form-item label="图书馆地址:" prop="provinceId">
              <el-input v-model="ruleForm.eduAddress" />
            </el-form-item>
          </div>
          <div class="input-line" style="padding:0 13px;marginLeft:-40px;boxSizing: borderBox;">
            <el-form-item label="姓名:" prop="provinceId">
              <el-input v-model="ruleForm.applyName" />
            </el-form-item>
            <el-form-item label="身份证号:" prop="provinceId">
              <el-input v-model="ruleForm.idCard" />
            </el-form-item>
          </div>
          <div class="input-line" style="padding:0 13px;boxSizing: borderBox;">
            <el-form-item label="身份证正面:" prop="provinceId">
              <!-- action="http://118.178.134.150:8088/admin/edu/upload_status_info" 线上 -->
              <el-upload
                class="upload-demo"
                drag
                :on-change="handleidCardFront"
                :auto-upload="false"
                action="http://118.178.134.150:8088/admin/edu/upload_status_info"
                multiple>
                <div v-if="ruleForm.idCardFront">
                  <img class="idCardFront" :src="'http://bj-kbtc.oss-cn-hangzhou.aliyuncs.com/'+ruleForm.idCardFront" alt=""  @change="handleidCardFront">
                </div>
                <div v-else>
                  <i class="el-icon-upload"></i>
                </div>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="身份证反面:" prop="provinceId">
                <el-upload
                  class="upload-demo"
                  drag
                  :on-change="handleidCardBack"
                  :auto-upload="false"
                  action="http://118.178.134.150:8088/admin/edu/upload_status_info"
                  multiple>
                  <div v-if="ruleForm.idCardBack">
                    <img class="idCardFront" :src="'http://bj-kbtc.oss-cn-hangzhou.aliyuncs.com/'+ruleForm.idCardBack" alt=""  @change="handleidCardBack">
                  </div>
                  <div v-else>
                    <i class="el-icon-upload"></i>
                  </div>
                  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
          </div>
      </div>
      <div class="auditbox">
        <el-form-item label="银行卡信息:" prop="mobile">
          </el-form-item>
          <div class="input-line">
            <el-form-item label="持卡人姓名:" prop="mobile">
              <el-input v-model="ruleForm.applyName"></el-input>
            </el-form-item>
            <el-form-item
              label="选择银行:" 
              style="width:280px;marginBottom:0;"
              size="small"
              prop="provinceId"
              inline="true">
              <el-select v-model="ruleForm.bankName" placeholder="请选择">
                <el-option
                  v-for="item in bankNameList"
                  :key="item.id"
                  :label="item.title"
                  :value="item.title"
                  size='medium'
                  >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户行:" prop="provinceId">
              <el-input v-model="ruleForm.bankBranch"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号:" prop="provinceId">
              <el-input v-model="ruleForm.bankNo"></el-input>
            </el-form-item>
          </div>
          <div class="input-line bankPhotoinput" style="padding:0 13px;marginLeft:-15px;boxSizing: borderBox;">
            <el-form-item label="银行卡正面:" prop="provinceId">
              <!-- action="http://118.178.134.150:8088/admin/edu/upload_status_info" 线上 -->
              <el-upload
                class="upload-demo"
                drag
                :on-change="handlebankPhotogetFile"
                :auto-upload="false"
                action="http://118.178.134.150:8088/admin/edu/upload_status_info"
                multiple>
                <div v-if="ruleForm.bankPhoto">
                  <img class="bankPhoto" :src="'http://bj-kbtc.oss-cn-hangzhou.aliyuncs.com/'+ruleForm.bankPhoto" alt=""  @change="handlebankPhotogetFile">
                </div>
                <div v-else>
                  <i class="el-icon-upload"></i>
                </div>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>
          </div>
      </div>
      <div class="auditbox">
        <!-- <div class="input-line">
          <el-form-item label="班级设置:" prop="provinceId" style="marginLeft:-15px;">
            <div class="class-from">
              <Table />
            </div>
          </el-form-item>
        </div> -->
        <el-form-item label="学年价格下限:" prop="provinceId" style="width:400px;marginLeft:15px;">
          <el-input v-model="ruleForm.limitDisposit" />
        </el-form-item>
      </div>
      <div class="auditbox">
        <el-form-item label="收货地址信息:" prop="mobile">
        </el-form-item>
        <div class="input-line">
          <el-form-item label="收货人:" prop="mobile">
            <el-input v-model="ruleForm.takeOverName"></el-input>
          </el-form-item>
          <el-form-item label="联系电话:" prop="provinceId">
            <el-input v-model="ruleForm.takeOverMobile"></el-input>
          </el-form-item>
        </div>
        <el-form-item label="收货地址:" prop="provinceId" style="width:600px;marginLeft:15px;">
          <el-input v-model="ruleForm.takeOverAddress"></el-input>
        </el-form-item>
        
      </div>
      <div class="auditbox">
        <el-form-item label="付款信息:" style="marginLeft:-30px;">
        </el-form-item>
        <div class="input-line">
          <el-form-item label="付款状态:">
            已支付
          </el-form-item>
          <el-form-item label="付款时间:">
            {{new Date()}}
          </el-form-item>
          <el-form-item label="支付方式:">
            线下支付
          </el-form-item>
          <el-form-item label="付款金额:" prop="provinceId" style="width:300px;marginLeft:15px;">
            <el-input v-model="ruleForm.payAmount"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="auditbox">
        <div class="input-line">
          <el-form-item label="账号状态:" prop="provinceId" style="marginLeft:-30px;">
            <el-radio-group v-model="ruleForm.isDisabled">
              <el-radio :label="0" value="0">启用</el-radio>
              <el-radio :label="1" value="1">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </div>
      <!-- <div class="auditbox">
        <div>
          <el-form-item label="审核:" prop="provinceId" style="marginLeft:-58px;">
            <el-radio-group v-model="ruleForm.isDisabled" class="approve">
              <el-radio :label="0" value="0" style="marginBottom:10px;marginTop:10px">审核通过</el-radio>
              <el-radio :label="1" value="1">审核拒绝</el-radio>
              <el-input
                type="textarea"
                class="text"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="输入拒绝原因。。。"
                v-model="ruleForm.textarea2">
              </el-input>
            </el-radio-group>
          </el-form-item>
        </div>
      </div> -->
      <div class="input-line">
        <el-button type="primary" @click="submitForm()" style="margin:20px auto">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import Table from '@/components/Table'
import { mapActions, mapState } from 'vuex'
import { close } from 'fs';


export default {
  data() {
    return {
      text: '',
      ruleForm: {
        mobile: '',
        provinceId: '',
        cityId: '',
        regionId: '',
        bankName:'',
        eduName: '',
        eduAddress: '',
        applyName: '',
        idCard: '',
        bankBranch: '',
        bankNo: '',
        takeOverName:'',
        takeOverMobile: '',
        takeOverAddress: '',
        payAmount:'',
        limitDisposit: '',
        idCardFront: '',
        idCardBack: '',
        bankPhoto: '',
        isDisabled: 0,
        textarea2:'',
        applyer:window.localStorage.getItem('id'),
        applyId:window.localStorage.getItem('id')
      },
      rules: {
        mobile: [
          { required: true, message: '账号不能为空', trigger: 'blur'}
        ],
        provinceId: {
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
    await this.bankNameOption() 
  },
  components:{
    Table
  },
  computed:{
    ...mapState({
      cityList: state=>state.library.cityList,
      townList: state=>state.library.townList,
      areaList: state=>state.library.areaList,
      bankNameList: state=>state.library.bankNameList,
    })
  },
  methods: {
  ...mapActions({
    city: 'library/city',
    town: 'library/town',
    area: 'library/area',
    eduInstApply: 'library/eduInstApply',
    bankNameOption: 'library/bankNameOption',
    uploadStatusInfo: 'library/uploadStatusInfo',
  }),
  // 省
  async handleChage(value) {
    await this.town({
      parentId:value,
    })
  },
  // 市
  async handleChagearea(value) {
    await this.area({
      parentId:value
    })
  },
  // 身份证正面
   handleidCardFront(file, fileList){
    this.getBase64(file.raw).then(res => {
      this.uploadStatusInfo({
        file:res
      }).then(res=>{
        if(res.success){
          this.ruleForm.idCardFront = res.result
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }else{
           this.$message({
            message: '上传失败',
            type: 'error'
          })
        }
      })
    });
  },
  // 身份证反面
   handleidCardBack(file, fileList){
    this.getBase64(file.raw).then(res => {
      this.uploadStatusInfo({
        file:res
      }).then(res=>{
        if(res.success){
          this.ruleForm.idCardBack = res.result
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }else{
           this.$message({
            message: '上传失败',
            type: 'error'
          })
        }
      })
    });

  },
  // 银行卡
  handlebankPhotogetFile(file, fileList){
    this.getBase64(file.raw).then(res => {
      this.uploadStatusInfo({
        file:res
      }).then(res=>{
        if(res.success){
          this.ruleForm.bankPhoto = res.result
          this.$message({
            message: '上传成功',
            type: 'success'
          })
        }else{
           this.$message({
            message: '上传失败',
            type: 'error'
          })
        }
      })
    });

  },
  /** 保存新的图书馆 */
  async submitForm() {
     await this.eduInstApply(this.ruleForm).then(res=>{
        if(res.success){
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.$router.push('/administrator/communityLibrariesList')
        } else {
          this.$message({
            message: res.logMessage,
            // message: '保存失败',
            type: 'error'
          })
        }
     })
    },
    getBase64(file) {
      return new Promise(function(resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function() {
          imgResult = reader.result;
        };
        reader.onerror = function(error) {
          reject(error);
        };
        reader.onloadend = function() {
          resolve(imgResult);
        };
      });
   },
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
  padding: 30px 20px;
  border-top:1px solid #666;
}
.some{
  margin-top: 10px;
  margin-bottom: 20px;
}
.auditbox{
  border-top: 8px solid #d7d7d7;
  padding: 30px 14px;
  box-sizing: border-box;
}
.approve{
  display:flex;
  flex-direction:column;
}
.text{
  width: 300px;
  margin-top: 18px;
}
.bankPhotoinput{
  position: relative;
}
.bankPhoto,.idCardFront,.idCardBack{
  width: 360px;
  height: 180px;
  border:1px dashed #ccc;
  position: absolute;
  top: -1px;
  left: -1px;
  z-index: 10;
  border-radius: 6px;
}
</style>
