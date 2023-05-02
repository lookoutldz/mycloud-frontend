<template>
  <div class="login">
    <div class="background-container">
      <div class="background" v-for="(bg, index) in backgrounds" :key="index" :style="{ zIndex: index, backgroundImage: `url(${bg})`, opacity: bgOpacity[index] }"></div>
    </div>
    <div>
<!--      <login-view />-->
    </div>
  </div>
</template>


<script setup>
import {onBeforeUnmount, onMounted, ref} from "vue";
import LoginView from "@/views/auth/loginView.vue";

const backgrounds = ref([
    '/image/bg01.jpg',
    '/image/bg02.jpg',
    '/image/bg03.jpeg',
])
const bgOpacity = ref([1,0,0])
const currentBgIndex = ref(0)
const bgInterval = ref(null)

function startBackgroundInterval() {
  bgInterval.value = setInterval(() => {
    fadeBackground();
  }, 5000);
}

function fadeBackground() {
  let nextBgIndex = currentBgIndex.value + 1;
  if (nextBgIndex >= backgrounds.value.length) {
    nextBgIndex = 0;
  }
  const bgOpacity1 = bgOpacity.value.slice();
  bgOpacity1[currentBgIndex.value] = 0;
  bgOpacity1[nextBgIndex] = 1;
  bgOpacity.value = bgOpacity1;
  currentBgIndex.value = nextBgIndex;
}

onMounted(() => {
  startBackgroundInterval()
})

onBeforeUnmount(() => {
  clearInterval(bgInterval.value);
})

</script>

<script>
export default {
  name: "welcomeView",
}
</script>

<style>
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: 0;
  transition: opacity 1s ease-out;
}

.background:first-child {
  opacity: 0.8;
}

</style>

