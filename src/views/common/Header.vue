<template>
  <el-row>
    <el-col :span="24">
      <el-menu
          :default-active="activeIndex"
          mode="horizontal"
          class="header-bar opacity"
          :ellipsis="false"
          @select="handleSelect"
      >
        <el-menu-item index="0" @click="handleTitle" style="color: white">
          MyCloud - 创意集散地
        </el-menu-item>
        <div class="flex-grow"/>
        <el-sub-menu index="1">
          <template #title>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          </template>
          <el-menu-item v-if="hasLoggedIn" index="1-1">Profile</el-menu-item>
          <el-menu-item index="1-2">Function1</el-menu-item>
          <el-menu-item index="1-3">Function2</el-menu-item>
          <el-menu-item v-if="hasLoggedIn" index="1-4">Notification</el-menu-item>
          <el-menu-item v-if="hasLoggedIn" index="1-5"><span style="color: red;">Logout</span></el-menu-item>
          <el-menu-item v-if="!hasLoggedIn" index="1-6"><span style="color: blue;">Login</span></el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import router from "@/router";
import {get, post_form} from "@/net";
import {ElMessage} from "element-plus";
import {mapState} from "vuex";

export default {
  data() {
    return {
      activeIndex: "1",
    }
  },
  methods: {
    handleTitle() {
      router.push('/')
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case '1-1': router.push('/profile'); break;
        case '1-2': this.callFunction(key); break;
        case '1-3': this.callFunction(key); break;
        case '1-4': ElMessage.info("😣施工中"); break;
        case '1-5': this.logout(); break;
        case '1-6': router.push('/login'); break;
        default: break;
      }
    },
    logout() {
      post_form('/auth/logout', null, ((response) => {
        localStorage.removeItem('jwt')
        this.$store.dispatch('handleLogoutSuccessForJwt')
        ElMessage.success(response.data.result)
        router.push('/')
      }))
    },
    callFunction(key) {
      if (key === '1-2') {
        get('/user/test/port', ((response) => {
          ElMessage.success(response.data.result + ' ' + response.data.statusMessage)
        }))
      } else if (key === '1-3') {
        get('/user/test/port2', ((response) => {
          ElMessage.success(response.data.result + ' ' + response.data.statusMessage)
        }))
      }
    }
  },
  // 用于实时响应登录后的jwt变化
  computed: {
    ...mapState(['jwt']),
    hasLoggedIn() {
      return !!this.jwt
    },
  }
}
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}

.header-bar {
  border: 0;
  border-radius: 0 0 10px 10px;
  background-color: rgba(0,0,0,50%);
}

</style>