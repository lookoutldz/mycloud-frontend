<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden">
    <el-container style="height: 100%">
      <!--   Header   -->
      <el-header >
        <el-row>
          <el-col :span="24">
            <el-menu
                :default-active="activeIndex"
                mode="horizontal"
                style="border: none;"
                :ellipsis="false"
                @select="handleSelect"
            >
              <el-menu-item index="0">
                MyCloud
              </el-menu-item>
              <div class="flex-grow"/>
              <el-sub-menu index="1">
                <template #title>
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                </template>
                <el-menu-item index="1-1">Profile</el-menu-item>
                <el-menu-item index="1-2">Notification</el-menu-item>
                <el-menu-item index="1-3"><span style="color: red;">Logout</span></el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-col>
        </el-row>
      </el-header>
      <!--   Main   -->
      <el-main style="height: 100%">
        <div style="height: 100%">
          <el-carousel :interval="5000" type="card" style="height: 100%">
            <el-carousel-item v-for="item in images" :key="item">
              <img :src="item" class="img" alt="alt">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-main>
    </el-container>
  </div>

</template>

<script setup>

import {get} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  if (key === '1-3') {
    logout()
  }
}
const images = ref([
    "image/bg01.jpg",
    "image/bg02.jpg",
    "image/bg03.jpeg",
])

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
.flex-grow {
  flex-grow: 1;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
