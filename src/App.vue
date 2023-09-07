<template>
  <Navbar/>
  <Background>
    <RouterView />
  </Background>
</template>

<script setup lang="ts">
  import { RouterView, } from 'vue-router';
  import Navbar from '@/components/Navbar.vue';
  import Background from '@/components/Background.vue';
</script>


<style lang="scss">
  @import "../node_modules/bulma/bulma";
</style>
