<template>
  <input type="checkbox" class="hidden" id="aside-show" v-model="checked">

  <header class="header fixed left-52 right-0 h-20 bg-gray-600 z-40 transition-all">
    <header-menu></header-menu>
  </header>

  <div class="fixed top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75 z-40" v-if="checked" @click="checked = false"></div>
  <aside class="aside fixed z-50 bottom-0 top-0 left-0 w-52 transition-transform bg-gray-600">
    <side-menu ></side-menu>
  </aside>

  <main class="main ml-52 h-full pt-20 box-border transition-all">
    <router-view v-slot="{ Component }">
      <transition appear name="fade-transform" mode="out-in">
        <component :is="Component"/>
      </transition>
    </router-view>
  </main>
</template>

<script setup>
// setRef 的收集顺序 从上到下, 从里到外
import SideMenu from './component/SideMenu.vue'
import HeaderMenu from './component/HeaderMenu.vue'
import { ref } from 'vue'
import { onBeforeRouteUpdate, onBeforeRouteLeave } from 'vue-router'
import { useEvent } from '@/hooks/event/index.js'

const checked = ref(false)

const resizeHandler = _ => {
  if(window.innerWidth > 500) {
    checked.value = false
  }
}

useEvent('resize',resizeHandler)

onBeforeRouteUpdate(_ => {
  if(checked.value) checked.value = false
})

</script>

<style>
.aside {
  color: whitesmoke;
}

#aside-show:checked ~ .aside {
  transform: translateX(0);
}

#aside-show:checked ~ .side-menu-toggle label i::after {
  content: "\f0cd";
}

@media screen and (max-width:500px) {
  .side-menu-toggle {
    display: block;
  }
  .header {
    left: 0;
  }
  .main {
    margin-left: 0;
  }
  .aside {
    transform: translateX(-100%);
  }
}
</style>
