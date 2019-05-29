<template>
  <div class="schoolbag">
    <Inquire :title="title" :titlesome="titlesome" :len="category" :isShow='isShow'/>
     <el-button type="text" @click="open">查看图书</el-button>
    <Export :isShow='isShow'/>
  </div>
</template>

<script>
import Inquire from './components/Inquire'
import Export from './components/Export'
export default {
   data() {
    return {
       title: [
        {
          name: '借阅状态',
          options: [{
            value: '项1',
            label: '黄金糕'
          }, {
            value: '项2',
            label: '双皮奶'
          }, {
            value: '项3',
            label: '蚵仔煎'
          }, {
            value: '项4',
            label: '龙须面'
          }, {
            value: '项5',
            label: '北京烤鸭'
          }]
        },
        {
          name: '年龄段',
          options: [{
            value: '选1',
            label: '黄金糕'
          }, {
            value: '选2',
            label: '双皮奶'
          }, {
            value: '选3',
            label: '蚵仔煎'
          }, {
            value: '选4',
            label: '龙须面'
          }, {
            value: '选5',
            label: '北京烤鸭'
          }]
        },
        {
          name: '选择班级',
          options: [{
            value: '选项11',
            label: '黄金糕'
          }, {
            value: '选项12',
            label: '双皮奶'
          }, {
            value: '选项13',
            label: '蚵仔煎'
          }, {
            value: '选项14',
            label: '龙须面'
          }, {
            value: '选项15',
            label: '北京烤鸭'
          }]
        },
      ],
      titlesome: ['资产编号', '图书馆编号','会员姓名'],
      category:'inquire-box',
      isShow: true
    }
  },
  components: {
    Inquire,
    Export
  },
  methods: {
    open() {
      this.$alert('查看图书', '查看图书', {
        confirmButtonText: '关闭',
        callback: action => {
          this.$message({
            type: 'info',
            message: `成功`
          });
        }
      });
    }
  }
}
</script>

<style>
.schoolbag{
  width: 90%;
  margin: 20px 0 0 20px;
}
</style>
