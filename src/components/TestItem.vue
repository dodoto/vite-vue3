<template>
  <div class="test-item" @click="close">
    {{txt}}
  </div>
</template>

<script setup>

import { defineProps, defineEmit } from 'vue'

//定义属性
const props = defineProps({
  txt: {
    type: String,
    require: true
  },
  id: {
    type: Number,
    require: true
  }
})

//定义事件
const emit = defineEmit(['close'])

const close = () => {
  emit('close',props.id)
}

</script>

<style>
.test-item {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin: 10px auto;
  background-color: slategray;
  line-height: 40px;
  text-align: center;
  color: whitesmoke;
  cursor: pointer;
  user-select: none;
  transition: all 300ms ease;
}
</style>