<template>
  <div>
    <el-carousel :interval="5000" type="card" style="height: 100%">
      <el-carousel-item v-for="item in images" :key="item">
        <img :src="item" class="img" alt="alt">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import {ref} from "vue";

const images = ref([
  "image/bg01.jpg",
  "image/bg02.jpg",
  "image/bg03.jpeg",
])
</script>

<style scoped>
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>