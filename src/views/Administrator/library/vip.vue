<template>
  <div class='vip-box'>
    <Inquire :title='title' :titlesome='titlesome' :len="category"/>
    <router-link :to="'/Administrator/addvip'"><button>vip</button></router-link>
    <Export />
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
          name: '会员状态',
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
          name: '选择班级',
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
        }
      ],
      titlesome: ['会员ID', '家长手机号', '会员姓名'],
      category: 'vip-input'
    }
  },
  components: {
    Inquire,
    Export
  }
}
</script>

<style lang='scss'>
.vip-box{
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}
.inquire-box{
  display: flex;
}
</style>
