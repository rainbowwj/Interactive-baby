<template>
<div class="app-container">
  <div>
    <router-link to="/Administrator/LibraryAudit">
      <el-button :loading="downloadLoading" style="margin: 0px 20px 20px 0px;;" type="primary" icon="document">
        新增社区馆
      </el-button>
    </router-link>
    <el-button :loading="downloadLoading" style="margin: 0px 20px 20px 0px;;" type="primary" icon="document" @click="handleDownload">
      导出
    </el-button>
    <el-button type="primary" @click="dialogFormVisible = true">社区馆审核设置</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible" center>
      <template>
        <el-radio v-model="radio" label="1" style="display:block;marginBottom:10px">系统自动审核（默认审核通过，直接开馆）</el-radio>
        <el-radio v-model="radio" label="2">人工审核</el-radio>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ReviewSettingcancel">取 消</el-button>
        <el-button type="primary" @click="ReviewSettingensure">确 定</el-button>
      </div>
    </el-dialog>
    
  </div>
  <div>
    <el-table v-loading="listLoading" :data="this.searchEduInstitutionList.records" element-loading-text="拼命加载中" border fit highlight-current-row >
      <el-table-column align="center" label="申请时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.createDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="申请人姓名" width="135">
        <template slot-scope="scope">
          {{ scope.row.applyName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="手机号" width="95">
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图书馆名称" width="95">
        <template slot-scope="scope">
          {{scope.row.eduName}}
        </template>
      </el-table-column>
      <el-table-column label="图书馆地址" width="215" align="center">
        <template slot-scope="scope">
          {{ scope.row.eduAddress }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="身份证号" width="100">
        <template slot-scope="scope">
          {{ scope.row.idCard}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货人" width="100">
        <template slot-scope="scope">
          {{ scope.row.takeOverName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="联系电话" width="100">
        <template slot-scope="scope">
          {{ scope.row.takeOverMobile }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="收货地址" width="100">
        <template slot-scope="scope">
          {{ scope.row.takeOverAddress }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="账号状态" width="100">
        <template slot-scope="scope">
          <div v-if='scope.row.isDisabled == 0'>启用</div>
          <div v-if='scope.row.isDisabled == 1'>禁用</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付方式" width="100">
        <template slot-scope="scope">
          <div v-if='scope.row.payType == 1'>微信</div>
          <div v-if='scope.row.payType == 2'>支付宝</div>
          <div v-if='scope.row.payType == 3'>线下支付</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付金额" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.payAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付状态" width="100">
        <template slot-scope="scope">
          <div v-if='scope.row.payStatus == 1'>未支付</div>
          <div v-if='scope.row.payStatus == 2'>已支付</div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="支付时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.payDate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核人" width="100">
        <template slot-scope="scope">
          {{ scope.row.applyerName }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="审核时间" width="100">
        <template slot-scope="scope">
          {{ scope.row.applyDate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="{row}">
          <el-tag size="small" type="primary" @click="handleCheck(row.applyId)">审核</el-tag>
          <el-dialog title="审核" :visible.sync="check" center>
            <template>
              <el-radio v-model="status" label="2" style="display:block;marginBottom:10px">审核通过</el-radio>
              <el-radio v-model="status" label="3">审核拒绝</el-radio>
              <el-input
                type="textarea"
                class="text"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="输入拒绝原因。。。"
                v-model="textarea2">
              </el-input>
            </template>
            <div slot="footer" class="dialog-footer">
              <el-button @click="handleCheckCancel">取 消</el-button>
              <el-button type="primary" @click="handleCheckSure">确定</el-button>
            </div>
          </el-dialog>
          <router-link :to="'/Administrator/editcommunityLibraries/'+row.applyId + 1" class="link-type">
            <el-tag>详细信息</el-tag>
          </router-link>

          <div v-if="row.eduId">
            <el-tag @click="open(row.sysNo)">删除</el-tag>
            <router-link :to="'/Administrator/editcommunityLibraries/'+row.applyId + 2" class="link-type">
              <el-tag>编辑</el-tag>
            </router-link>
            <el-upload
              :action="UploadUrl()"
              :on-success="handleSuccess"
              :on-error ="handleError"
              multiple
              :on-progress='handleprogress'
              :data="{eduId:row.eduId}"
              :show-file-list ='false'
              style="display:inline"
              >
              <el-button size="small" type="primary">书包管理</el-button>
            </el-upload>
            <el-tag @click='clentBook(row.sysNo)'>会员管理</el-tag>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    background
    style="float:right;margin:20px;"
    layout="prev, pager, next"
    :page-size="10"
    :total="this.searchEduInstitutionList.total*1"
    @current-change="handleCurrentChange" />
</div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { parseTime } from '@/utils'

export default {
  name: 'communityFrom',
  data() {
    return {
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      currentPage: 1,
      arr: null,
      textarea2:'',
      dialogFormVisible:false,
      check:false,
      radio: '1',
      status:'2',
      applyId:'',
    }
  },
  computed:{
    ...mapState({
      searchEduInstitutionList: state=>state.library.searchEduInstitutionList
    })
  },
  async created() {
    await this.searchEduInstitution({
      pageSize:10
    })
    await this.checkType().then(res=>{
      if(res.success){
        this.radio =res.result.value
      }
    })
    this.listLoading = false
  },
  methods: {
    ...mapActions({
      searchEduInstitution: 'library/searchEduInstitution',
      delete:'library/delete',
      clearBooks:'library/clearBooks',
      ReviewTypes:'library/ReviewTypes',
      checkType:'library/checkType',
      checkApply:'library/checkApply',
    }),
    /** 审核设置 */
    //取消
    ReviewSettingcancel(){
      this.dialogFormVisible = false;
      this.$message('取消');
    },
    // 确定
    async ReviewSettingensure(){
      await this.ReviewTypes({
        value:this.radio
      }).then(res=>{
        if(res.success){
          this.$message({
            message: '更改成功',
            type: 'success'
          })
        }else{
          this.$message({
            message: '更改失败',
            type: 'error'
          })
        }
      })
      this.dialogFormVisible = false;
    },
    /** 单个的审核 */
    handleCheck(val){
      this.check = true
      this.applyId = val
    },  
    handleCheckCancel(){
      this.check = false
    },
    async handleCheckSure(val){
      var that = this;
      await this.checkApply({
        status:that.status,
        reason:that.textarea2,
        applyId:that.applyId,
        applyer:window.localStorage.getItem('id')
      }).then(res=>{
        if(res.success){
          that.textarea2 =''
          this.$message({
            message: '成功',
            type: 'success'
          })
          this.searchEduInstitution({
            pageSize:10
          })
        }else{
          that.textarea2 =''
          this.$message({
            message: '失败',
            type: 'error'
          })
        }
      })
      this.check = false
    },
     /** 分页 */
    async handleCurrentChange(val) {
      await this.searchEduInstitution({
        pageSize:10,
        currentPage:val
      })
    },
    /**导出exel  */
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['申请时间', '申请人姓名', '手机号', '图书馆名称', '图书馆地址','身份证号', '收货人', '联系电话', '收货地址', '账号状态','支付方式','支付金额','支付状态','支付时间','审核人','审核时间']
        const filterVal = ['createDate', 'applyName', 'mobile', 'eduName', 'eduAddress', 'idCard', 'takeOverName', 'takeOverMobile', 'takeOverAddress', 'isDeleted', 'payType', 'payAmount', 'payStatus', 'payDate','applyer','applyDate']
        const list = this.searchEduInstitutionList.records
        const data = this.formatJson(filterVal, list)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    /**导出exel方法  */
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    /** 删除图书馆 */
    open(cont) {
        this.$confirm('此操作将永久删除图书馆, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let upResult = await this.delete({
            eduId: cont,
          });
          await this.searchEduInstitution({
            pageSize:10
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        })
    },
    /** 导入书包 */
    handleprogress(event, file, fileList){
      this.listLoading = true // 显示login
    },
    UploadUrl:function() {
        // return "http://118.178.134.150:8088/bookbag/importBookBag"    // 测试环境
       return "http://118.178.134.150:8088/bookbag/importBookBag"    //线上环境
    },
    /**导入书包成功的回调  */
    handleSuccess(response, file, fileList){
      if(response.success){
        this.listLoading = false
        this.$message({
          message: response.logMessage,
          type: 'success'
        })
      }else{
         this.listLoading = false
         this.$message({
          message: '上传失败',
          type: 'error'
        })
      }
    },
    /**导入书包失败的回调  */
    handleError(err, file, fileList){
      console.log(err, file, fileList,"erroe")
      this.listLoading = false
         this.$message({
          message: '上传失败',
          type: 'error'
        })
    },
    
    /** 删除书包 */
    clentBook(val) {
      this.$confirm('此操作将删除所有书包，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           this.clearBooks({
              eduId: val
            }).then(res=>{
              if(res.success){
                this.$message({
                  message: res.logMessage,
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '清除失败',
                  type: 'error'
                })
              }
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
