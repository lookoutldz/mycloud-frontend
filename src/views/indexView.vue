<template>
  <div>
    <div>
      welcome!
    </div>
    <div>
      <el-button @click="logout()" type="danger" plain>登出</el-button>
    </div>
  </div>
</template>

<script setup>

import {get} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const logout = () => {
  get('/auth/logout', ((data) => {
    ElMessage.success(data.statusMessage)
    router.push('/')
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