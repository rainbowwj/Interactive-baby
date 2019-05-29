<template>
  <div>
    <Froms :title="title" :titleSome="titleSome"/>
    <Export />
  </div>
</template>

<script>
import Froms from '@/components/From'
import Export from '@/views/Administrator/library/components/Export'
export default {
  data() {
    return{
      title:['会员ID', '用户登录手机号', '登录用户名', '宝宝姓名'],
      titleSome: [
        {
          name: '选择省份',
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
          name: '选择市',
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
          name: '选择区',
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
        {
          name: '选择图书馆',
          options: [{
            value: '选项21',
            label: '黄金糕'
          }, {
            value: '选项22',
            label: '双皮奶'
          }, {
            value: '选项23',
            label: '蚵仔煎'
          }, {
            value: '选项24',
            label: '龙须面'
          }, {
            value: '选项25',
            label: '北京烤鸭'
          }]
        },
        {
          name: '选择班级',
          options: [{
            value: '选项31',
            label: '黄金糕'
          }, {
            value: '选项32',
            label: '双皮奶'
          }, {
            value: '选项33',
            label: '蚵仔煎'
          }, {
            value: '选项34',
            label: '龙须面'
          }, {
            value: '选项35',
            label: '北京烤鸭'
          }]
        }
      ],
    }  
  },
  components: {
    Froms,
    Export
  }
}
</script>

<style>

</style>
