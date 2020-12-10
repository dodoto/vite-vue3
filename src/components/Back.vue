<template>
  
  <div class="side">
    <p>currentRoute: {{currentName}}</p>
    <div>
      <router-link to="/list">list</router-link>
    </div>
    <div>
      <router-link to="/info">info</router-link>
    </div>
  </div>
  <div class="head"></div>  
  <div class="main">
    <router-view />
  </div>
  
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'Back',
  setup() {
    const route = useRoute()
    const currentName = computed(()=> route.name)
    return {
      currentName
    }
  }
}
</script>

<style scoped>

.side {
  position:fixed;
  left:0; top:0; bottom:0;
  width:200px;
  background-color:yellow;
}

.head {
  position:fixed;
  z-index: 1;
  left:200px; top:0; right:0;
  height: 100px;
  background-color:aqua;
}

.main {
  position:absolute;
  left:200px; top:0; right:0; bottom:0;
  background-color: steelblue;
  padding-top: 100px;
}
</style>
