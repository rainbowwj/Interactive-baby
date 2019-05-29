<template>
<div class="app-container">
  <!-- 测试查询用户账户 -->
  <div>
    <el-form style="width:300px;display:flex;"  class="demo-form-inline">
      <el-input v-model="iphone" placeholder="手机查询"></el-input>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <div>
      <div v-for="(item,i) in this.getUserList" :key="i">
        <ol class="iphonename">
          <li>手机号:{{item.mobile}}</li>
          <li>余额:{{item.balance}}</li>
          <li>锁定金额:{{item.lockedAmount}}</li>
          <li>预授权冻结金额:{{item.frozenAmount}}</li>
          <li>每笔订单金额:{{item.payAmount}}</li>
          <li>订单号:{{item.orderNo}}</li>
          <li>订单时间:{{item.payTime}}</li>
          <li>交易前金额:{{item.beforeAmount}}</li>
          <li>机构名称:{{item.eduName}}</li>
        </ol>
      </div>
    </div>
    
  </div>


  <h5>社区馆会员最低价设置</h5>
  <div>
    <router-link to="/Administrator/addSetFloorPrice">
      <el-button :loading="downloadLoading" style="margin: 0px 20px 20px 0px;;" type="primary" icon="document">
        新增
      </el-button>
    </router-link>
    <!-- <el-button :loading="downloadLoading" style="margin: 0px 20px 20px 0px;;" type="primary" icon="document" @click="handleDownload">
      导出
    </el-button> -->
  </div>
  <div>
    <el-table v-loading="listLoading" :data="this.libList.records" element-loading-text="拼命加载中" border fit highlight-current-row >
      <el-table-column align="center" label="添加时间" width="120">
        <template slot-scope="scope">
          {{ scope.row.sysNo }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地区" width="210">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格" width="95">
        <template slot-scope="scope">
          {{ scope.row.thirdparty? '服务费': '会员费' }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="添加人" width="95">
        <template slot-scope="scope">
          <div v-if='scope.row.category == 1'>幼儿园</div>
          <div v-if='scope.row.category == 2'>社区馆</div>
          <div v-if='scope.row.category == 3'>小学</div>
        </template>
      </el-table-column>
      <el-table-column label="最后编辑人" width="300" align="center">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="最后编辑时间" width="220">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="{row}">
          <router-link :to="'/Administrator/editlibrary/'+row.sysNo" class="link-type">
            <el-tag>编辑</el-tag>
          </router-link>
          <el-tag @click="open(row.sysNo)">删除</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-pagination
    background
    style="float:right;margin:20px;"
    layout="prev, pager, next"
    :page-size="10"
    :total="this.libList.total*1"
    @current-change="handleCurrentChange" />
</div>
</template>

<script>
import { fetchList } from '@/api/article'
import { mapActions, mapState } from 'vuex'
import { parseTime } from '@/utils'
import { constants } from 'fs';
// options components
export default {
  name: 'ExportExcel',
  data() {
    return {
      iphone: '',
      listLoading: true,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      currentPage: 1,
      arr: null 
    }
  },
  computed:{
    ...mapState({
      libList: state=>state.library.libList,
      getUserList: state=>state.library.getUserList,
    })
  },
  async created() {
    await this.lists({
      pageSize:10
    })
    this.listLoading = false
  },
  methods: {
    ...mapActions({
      lists: 'library/list',
      delete:'library/delete',
      clearBooks:'library/clearBooks',
      getUser:'library/getUser',
    }),
    /**  <!-- 测试查询用户账户 --> */
    async onSubmit() {
      await this.getUser({
         mobile:this.iphone,
         currentPage:1,
         pageSize:1000
      })
    },
    /** 分页 */
    async handleCurrentChange(val) {
      console.log(this.libList.records,"sssssssssssssss")
      await this.lists({
        pageSize:10,
        currentPage:val
      })
    },
    /**导出exel  */
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['图书馆编号', '图书馆名称', '收费类型', '图书馆地址', '创建时间']
        const filterVal = ['sysNo', 'name', 'thirdparty', 'discription', 'createDate']
        const list = this.libList.records
        console.log(list,"sss")
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
          console.log('w')
          return parseTime(v[j])
        } else {
          console.log(v,'sw')
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
          await this.lists({
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

<style lang="scss">
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
h5{
  font-size: 24px;
}
.iphonename{
  list-style: none;
  display: flex;
  li{
    margin-right: 18px;
  }
}
</style>
