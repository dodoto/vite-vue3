<template>
  <teleport to="body">
    <transition name="fade">
      <div class="spinner-box" v-show="loading">
        <div class="spinner"></div>
      </div>
    </transition>
  </teleport>
</template>

<script lang="ts">
// loading 效果来自于 https://tobiasahlin.com/spinkit/
import { defineComponent, onUpdated, toRefs } from 'vue'

export default defineComponent({
  name: 'GlobalLoading',
  props: {
    loading: {
      type: Boolean,
      required: true
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
.spinner-box {
  position: fixed;
  top: 0; right: 0; bottom: 0; left: 0; 
  background-color: #fff;
  z-index: 99;
}
.spinner {
  width: 40px;
  height: 40px;
  position: relative;
  margin: auto;
  top: 50%;
  transform: translateY(-50%);
}
.spinner::before {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #409EFF;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.spinner::after {
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #409EFF;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: sk-bounce 2.0s infinite ease-in-out;
  animation-delay: -1.0s;
}
</style>
