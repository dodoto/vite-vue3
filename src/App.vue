<template>
  <div id="app" style="overflow:hidden;">
    <!-- <router-view v-slot="{ Component }">
      <transition name="slide-fade">
        <component :is="Component" />
      </transition> 
    </router-view> -->
    <router-view />
  </div>
</template>

<script>
import Loading from './components/LoadingPage.vue';
export default {
  name: 'App'
}
</script>

<style scoped>

</style>
