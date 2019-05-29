<template>
  <div class="app-container">
    <div>
      个人中心
    </div>
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  data() {
    return {
      user: {},
    }
  }
}
</script>