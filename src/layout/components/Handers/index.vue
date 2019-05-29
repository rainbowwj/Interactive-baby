<template>
  <div class="hander-box">
    <div class="hander-left">
      <img src="@/assets/sign.png" alt="">
      <h5>互动宝宝运营管理后台</h5>
    </div>
    <div class="hander-right">
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="hander-content">
          <div class="avatar-wrapper">
            <img src="@/assets/hand.jpg" class="user-avatar">
          </div>
          <div class="hander-text">
            <span>超级管理员</span>
            <div class="hander-tit">
              <b>admin</b>
              <b>退出</b>
            </div>
          </div>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ $t('navbar.profile') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.set') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeToken } from '@/utils/auth'
export default {
  computed: {
    ...mapGetters([
      'avatar'
    ])
  },
  methods: {
    async logout() {
      removeToken()
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      await this.$store.dispatch('user/logout')
      
    }
  }
}
</script>

<style lang="scss" scoped>
$bg:#283443;

.hander-box {
  width: 100%;
  height: 64px;
  padding: 0 40px;
  box-sizing:border-box;
  background: $bg;
  display:flex;
  position: fixed;
  top: 0;
  z-index: 99;
  justify-content: space-between;
  align-items: center;
  .hander-left {
    display:flex;
    align-items: center;
    justify-content: center;
    img {
      width: 48px;
      height: 34px;
      margin: 0 auto;
    }
    h5 {
      color:#fff;
      font-size: 16px;
    }
  }
}
.hander-content {
  display: flex;
  align-items: center;
  .hander-text {
    display: flex;
    color: #fff;
    flex-direction: column;
    margin-left: 10px;
    span {
      padding: 2px 4px;
      box-sizing: border-box;
      background: #4c99cd;
      border-radius: 10px;
      font-size: 8px;
      text-align: center;
    }
    b {
      font-weight:normal
    }
    .hander-tit{
      margin-top: 5px;
      b:last-child{
        border-left: 1px solid #fff;
        padding-left: 4px;
      }
    }
  }
}
.avatar-container {
  margin-right: 30px;

  .avatar-wrapper {
    margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
