<script setup>
import { Carousel, Slide } from 'vue3-carousel';


defineProps({
  images: {
    type: Array ,
    required: true
  },
});

const carouselConfig = {
  itemsToShow: 3.5,
  wrapAround: true
}
</script>

<template>
  <Carousel class="mt-8 mb-16" v-bind="carouselConfig">
    <Slide v-for="image in images" :key="images">
      <div class="select-none grid place-items-center">
        <img class="h-60" :src="image" alt="" />
      </div>
    </Slide>
  </Carousel>
</template>