<template>
  <el-form ref="form" :model="form" label-width="80px" class="from-box">
    <div class="from-content">
      <div class="from-input">
        <el-form-item v-for="(item, i) in title" :key="i" :label="item" >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div>
      <div class="from-option">
        <el-form-item
          v-for="(k, i) in titleSome"
          :key="i"
          :label="k.name" 
          style="width:200px;marginBottom:0;" 
          inline="true">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in k.options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
    <el-form-item class="from-btn">
      <el-button type="primary" @click="onSubmit">查询</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        type: []
      }
    }
  },
  props: {
    title: Array,
    titleSome: Array,
    len: String
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style lang="scss" scopde>
.from-box{
  width: 90%;
  display: flex;
  padding: 20px;
  .from-content{
    width: 90%;
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    .from-input{
      display: flex;
    }
    .from-option{
      display: flex;
    }
  }
  .from-btn{
    width: 10%;
  }
}
</style>

