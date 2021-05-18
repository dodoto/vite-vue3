<template>
  <teleport to="body">
    <transition name="fade">
      <div class="modal-loading" v-if="show">
        <div class="modal-loading-content">{{tip}}</div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false
    },
    tip: {
      type: String,
      default: 'Loading'
    }
  },
  setup(props) {
    return {
      ...toRefs(props)
    }
  },
})
</script>

<style scoped>
.modal-loading {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0; 
  background-color: rgba(141, 141, 141, 0.35);
  text-align: center;
}
.modal-loading-content {
  position: relative;
  top: 50%; 
  transform: translateY(-50%);
  display: inline-block;
  margin: auto;
  padding: 16px;
  background-color: #fff;
  border-radius: 50px;
  font-size: 18px;
  font-weight: bold;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
