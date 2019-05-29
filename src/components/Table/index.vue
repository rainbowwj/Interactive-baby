<template>
  <div>
    <el-row>
			<el-col :span="24">
				<el-table size="mini" :data="tableArr" border style="width: 100%" highlight-current-row>
					<el-table-column type="index"></el-table-column>
					<el-table-column v-for="(v,i) in master_user.columns" :prop="v.field" :label="v.title" :width="v.width" :key="i">
							<template slot-scope="scope">
								<span v-if="scope.row.isSet">
										<el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[v.field]">
										</el-input>
								</span>
								<span v-else>{{scope.row[v.field]}}</span>
							</template>
					</el-table-column>
					<el-table-column label="操作" width="100">
							<template slot-scope="scope">
								<span v-if="scope.row.isSet" class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,true)">
									保存
								</span>
								<span v-else class="el-tag el-tag--info el-tag--mini" style="cursor: pointer;" @click="handleamend(scope.row,scope.$index,true)">
									修改
								</span>
								<span v-if="!scope.row.isSet" class="el-tag el-tag--danger el-tag--mini" style="cursor: pointer;" @click="handleRemove(scope.row,scope.$index,true)">
									删除
								</span>
								<span v-else class="el-tag  el-tag--mini" style="cursor: pointer;" @click="pwdChange(scope.row,scope.$index,false)">
									取消
								</span>
							</template>
					</el-table-column>
				</el-table>
			</el-col>
    </el-row>
    <el-button  class="class-btn" @click="addMasterUser">添加班级</el-button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { constants, close, closeSync } from 'fs';
export default {
  data() {
    return {
      master_user: {
        sel: null,//选中行   
        columns: [
            { field: "type", title: "班级名称", width: 120 },
            { field: "addport", title: "人数", width: 150 },
            { field: "user", title: "毕业时间", width: 120 },
            { field: "pwd", title: "邀请码", width: 120 },
        ]
      },
    tableArr: [],
    }
  },
  computed:{
    ...mapState({
      libraryList: state=>state.library.libraryList,
      classList: state=>state.library.classList,
      updateClassInfoList: state=>state.library.updateClassInfoList,
      removeClassInfoList: state=>state.library.removeClassInfoList
    })
  },
  methods: {
    ...mapActions({
      addClass: 'library/addClass',
      updateClassInfo: 'library/updateClassInfo',
      removeClassInfo: 'library/removeClassInfo'
    }),
    //读取表格数据
    readMasterUser() {
        this.tableArr.map(i => {
            i.id = Math.random()*10 //generateId.get();//模拟后台插入成功后有了id
            i.isSet=false;//给后台返回数据添加`isSet`标识
            return i;
        });
    },
    //添加账号
    addMasterUser() {
        for (let i of this.tableArr) {
            if (i.isSet) return this.$message.warning("请先保存当前编辑项");
        }
        /**
         * j代表的是插入的每一条数据
         */
        let j = { id: 0, "type": "", "addport": "", "user": "", "pwd": "待生成", "info": "", "isSet": true, "_temporary": true };
        this.tableArr.push(j);
        this.master_user.sel = JSON.parse(JSON.stringify(j));
    },
    //保存
    pwdChange(row, index, cg) {
        let that = this
        //点击修改 判断是否已经保存所有操作
        for (let i of this.tableArr) {
            if (i.isSet && i.id != row.id) {
                this.$message.warning("请先保存当前编辑项");
                return false;
            }
        }
        //是否是取消操作
        if (!cg) {
            if (!this.master_user.sel.id) this.tableArr.splice(index, 1);
            return row.isSet = !row.isSet;
        }
        //提交数据
        if (row.isSet) {
            //项目是模拟请求操作  
            ( async function () {
            
                let data = JSON.parse(JSON.stringify(that.master_user.sel));

                for (let k in data) row[k] = data[k];
                let eduId = that.libraryList.result.eduId   
                if(row.amend){ // 如果是修改按钮
                  await that.updateClassInfo({
                    Name: data.type,
                    KiddieCount: data.addport,
                    KindergartenId:eduId,
                    GraduateDate: data.user.replace(/\D/g,"/"),
                    sysNo:data.sysNo
                  })
                  if(that.updateClassInfoList.success){
                    that.$message({
                          type: 'success',
                          message: "保存成功!"
                      });
                  }else{
                    that.$message({
                          type: 'error',
                          message: "保存失败!"
                      });
                  }
                }else{
                  // 新建班级
                  await that.addClass({
                    Name: data.type,
                    KiddieCount: data.addport,
                    KindergartenId:eduId,
                    GraduateDate: data.user.replace(/\D/g,"/")
                  })
                  if(that.classList.success) {
                      that.tableArr[index].pwd=that.classList.result.invitationCode
                      that.tableArr[index].sysNo=that.classList.result.sysNo
                      that.$message({
                          type: 'success',
                          message: "保存成功!"
                      });
                    }else{
                      that.$message({
                          type: 'error',
                          message: "保存失败!"
                      });
                    }
                }
                //然后这边重新读取表格数据
                that.readMasterUser();
                row.isSet = false;
            })();
        } else {
            that.master_user.sel = JSON.parse(JSON.stringify(row));
            row.isSet = true;
        }
    },
		// 修改
    handleamend(row, index, cg){
      row.amend = true
      let that = this
        //点击修改 判断是否已经保存所有操作
        for (let i of this.tableArr) {
            if (i.isSet && i.id != row.id) {
                this.$message.warning("请先保存当前编辑项");
                return false;
            }
        }
        //是否是取消操作
        if (!cg) {
            if (!this.master_user.sel.id) this.tableArr.splice(index, 1);
            return row.isSet = !row.isSet;
        }
        that.master_user.sel = JSON.parse(JSON.stringify(row));
        row.isSet = true;
    },
		// 删除
    async handleRemove(row, index, cg){
			console.log(row,index, cg,"删除")
			console.log(this.tableArr.splice(index,1))
     	await this.removeClassInfo({
        sysNo:row.sysNo
      })
      if(this.removeClassInfoList.success) {
				this.tableArr.splice(index,1)
        this.$message({
            type: 'success',
            message: "删除成功!"
        });
      }else{
        this.$message({
            type: 'error',
            message: "删除失败!"
        })
      }
    }
  }
}
</script>


<style scoped>
 .el-table-add-row {
    margin-top: 10px;
    width: 100%;
    height: 34px;
    border: 1px dashed #c1c1cd;
    border-radius: 3px;
    cursor: pointer;
    justify-content: center;
    display: flex;
    line-height: 34px;
}
</style>
