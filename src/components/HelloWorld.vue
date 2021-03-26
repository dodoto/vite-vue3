<template>
  <!-- <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Documentation</a> |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button @click="state.count++">count is: {{ state.count }}</button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p> -->
  <div class="btn add" @click="add">add</div>
  <div class="btn remove" @click="remove()">remove</div>
  <transition-group 
    tag="div" 
    class="list"
    enter-from-class="enter"
    leave-to-class="leave-to"
    leave-active-class="leave-active"
  >
    <test-item 
      @close="remove"
      v-for="item of data"
      :key="item.id"
      :txt="item.txt"
      :id="item.id"
    />
  </transition-group>
</template>

<script setup>
import TestItem from './TestItem.vue'
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })

const data = reactive([
  {txt:'test1',id:1},
  {txt:'test2',id:2}
])

const add = () => {
  data.push({txt:'test3',id:new Date().getTime()})
}

const remove = (id) => {
  if(id) {
    let index = data.findIndex(item => item.id === id)
    data.splice(index,1)
  }else{
    data.shift()
  }
}

</script>

<style scoped>

.btn {
  width: 200px;
  height: 40px;
  border-radius: 5px;
  margin: 10px auto;
  line-height: 40px;
  text-align: center;
  color: white;
  cursor: pointer;
  user-select: none;
}

.add {
  background-color: skyblue;
}

.remove {
  background-color: steelblue;
}

.list {
  position: relative;
}

.leave-active {
  opacity: 0;
  position: absolute;
}

.enter {
  opacity: 0;
  transform: translateY(-10px);
}

.leave-to {
  transform: scale(0);
  /* opacity: 0; */
  
}
</style>