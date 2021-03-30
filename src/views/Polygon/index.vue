<template>
  <div class="polygon-view">
    <div class="h-60 relative bg-blue-500 overflow-hidden">
      <div v-for="(item,index) of blocks" :key="index" class="absolute opacity-75" :class="item.className"></div>
    </div>

    <div class="h-96 relative my-48 bg-blue-300 transition-all" :ref="setRef">
      <img class="h-full w-full object-cover" src="@/assets/wallpaper.jpg">
    </div>

    <div class="five-star h-48 w-48 mx-auto my-32 bg-gray-400"></div>

    <noscript>
      clipt-path 变形的关键在于坐标点数量前后要一致.
    </noscript>
  </div>
</template>

<script setup>
import { useRef } from '@/hooks/ref/index.js'
import { useEvent } from '@/hooks/event/index.js'
import { useThrottle } from '@/hooks/debounce&throttle/index.js'

const blocks = [
  {className: 'block1 ani1'},
  {className: 'block2 ani2'},
  {className: 'block3 ani3'},
  {className: 'block4'},
  {className: 'block5 ani3'}
]

const { ref, setRef } = useRef()

const scrollHandler_ = function() {
  let el = ref.value
  const { offsetTop, clientWidth, clientHeight } = el 
  let percent = window.scrollY / offsetTop * 2
  let radius = percent * Math.sqrt(clientWidth ** 2 + clientHeight ** 2)
  el.style["clip-path"] = `circle(${radius}px at 0% 0%)`
}

const scrollHandler = useThrottle(scrollHandler_,100,true)

useEvent('scroll',scrollHandler)


</script>

<style>
@import url('./index.css');
</style>