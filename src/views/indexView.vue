<template>
  <div class="index">
    <el-container>
      <el-header><Header /></el-header>
      <el-container>
        <el-aside class="aside"><LeftAside /></el-aside>
        <el-main>
          <router-view v-slot="{Component}">
            <transition name="el-fade-in-linear" mode="out-in">
              <component :is="Component"/>
            </transition>
          </router-view>
        </el-main>
        <el-aside class="aside"><RightAside /></el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/views/common/Header.vue";
import LeftAside from "@/views/common/LeftAside.vue";
import Main from "@/views/common/Main.vue"
import RightAside from "@/views/common/RightAside.vue"
import {mapState} from "vuex";

export default {
  name: "indexView",
  components: {
    Header,
    LeftAside,
    Main,
    RightAside,
  },
  computed: {
    ...mapState({
      isMobile: (state) => state.isMobile
    }),
    aside() {
      return this.isMobile ? 'aside-mobile' : ''
    }
  }
}
</script>

<style scoped>

@media (max-width: 480px) {
  .index {
    width: 100vw;
    height: 100vh;
    background: url("/image/legends-of-zelda-links-awakening-4k-phone-wallpaper-2160x3840-54.jpg");
    background-size: 100% 100%;
  }
  .aside {
    display: none;
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .index {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    background: url("/image/legends-of-zelda-links-awakening-4k-phone-wallpaper-2160x3840-54.jpg");
    background-size: 100% 100%;
  }
  .aside {
    width: 10%;
  }
}

@media (min-width: 1025px) {
  .index {
    width: 100vw;
    height: 100vh;
    overflow-x: hidden;
    background: url("/image/legends-of-zelda-links-awakening-4k-wallpaper-3840x2160-54.jpg");
    background-size: 100% 100%;
  }
  .aside {
    width: 20%;
  }
}
</style>