<template>
  <Footer class="l-align-center">
    <div class="l-align-text">
      <el-row :gutter="20" class="foot-flex">
        <el-col :span="6"><div class="grid-content bg-purple">帮助</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">隐私</div></el-col>
        <el-col :span="6"><div class="grid-content bg-purple">条款</div></el-col>
      </el-row>
      <p class="l-mt3 l-pale">Copyright ©2019 互动宝宝</p>
    </div>
  </Footer>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.l-align-center{
  width: 258px;
  margin: 0 auto;
  color: #999;
  font-size: 14px;
  margin-top: 200px;
  .l-align-text{
    margin-left: 40px;
  }
}
</style>
