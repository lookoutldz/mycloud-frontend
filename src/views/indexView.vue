<template>
  <div>
    welcome!
  </div>
  <div>
    <el-button @click="logout()" type="danger" plain>登出</el-button>
  </div>
</template>

<script setup>

import {get} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const logout = () => {
  get('/user/auth/logout', ((data) => {
    ElMessage.success(data.statusMessage)
    router.push('/login')
  }))
}

</script>

<script>
export default {
  name: "indexView"
}
</script>

<style scoped>

</style>