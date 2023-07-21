<template>
  <el-row :gutter="20">
    <el-col :span="colSpan" v-for="(i, index) of 10" :key="index" class="card-margin" @click="handleClick(i)">
      <el-card shadow="always" class="change-color"> Slot {{i}} 敬请期待 </el-card>
    </el-col>
  </el-row>
</template>

<script setup>
import {computed} from "vue";

const colSpan = computed(() => {
  let width = window.innerWidth
  if (width <= 480) {
    return 24
  } else if (width <= 1024) {
    return 12
  } else {
    return 8
  }
})

const handleClick = (key) => {
  console.log(key)
}

</script>

<style scoped>
.card-margin {
  margin: 10px 0;
}
.change-color {
  border: none;
  color: white;
  background-color: rgba(0,0,0,50%);
}
.change-color:hover {
  border: none;
  color: black;
  background-color: white;
}

</style>