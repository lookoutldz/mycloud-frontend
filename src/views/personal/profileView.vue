<template>
  <div>
    <Carousel />
    <CardBoard />
  </div>
</template>

<script>
import Carousel from "@/components/Carousel.vue";
import {defineComponent} from "vue";
import CardBoard from "@/components/CardBoard.vue";

export default defineComponent({
  name: "Profile",
  components: {
    CardBoard,
    Carousel,
  }
})
</script>

<style>

</style>