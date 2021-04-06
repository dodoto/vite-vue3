<template>

  <div class="relative w-full h-full" :ref="setRef">
    <div 
      class="card" 
      :style="{top:top+'px',transition}"
      >
      {{prevContent}}
      <transition leave-active-class="live-card-transition" leave-to-class="live-card-fade">
        <p v-show="isTop" class="limit-tip" style="bottom:0;">
          {{refreshing ? 'loading' : '到头了,松手刷新'}}
        </p>
      </transition>
    </div>
    <div 
      class="card" 
      :style="{top:top+'px',transition}"
        @touchstart="touchStart" @touchmove="touchMove" @touchcancel="touchCancel" @touchend="touchCancel">
          {{currentContent}}
    </div>
    <div 
      class="card" 
      :style="{top:top+'px',transition}"
      >
      {{nextContent}}
      <transition leave-active-class="live-card-transition" leave-to-class="live-card-fade">
        <p v-show="isBottom" class="limit-tip" style="top:0;">到尾了</p>
      </transition>
    </div>
  </div>  
</template>

<script setup>
import { computed, defineEmit, watch, ref } from "vue"
import { useRef } from '@/hooks/ref/index.js'

const emits = defineEmit([
  'load',
  'refresh',
  'onDragStart',
  'onDragMove',
  'onDragStop'
])

let testData = ref([
  {text: 'this is data #0'},
  {text: 'this is data #1'},
  {text: 'this is data #2'}
])

let startTop = 0

const state = ref({
  top: 0,
  refreshing: false,
  isAnimating: false,
  activeIndex: 0
})

const isTop = computed(_ => {
  const { activeIndex, isAnimating } = state.value
  return activeIndex === 0
})

const isBottom = computed(_ => {
  const { activeIndex, isAnimating } = state.value
  const max = testData.value.length - 1
  return activeIndex === max
})

const top = computed(_ => state.value.top)

const transition = computed(_ => state.value.isAnimating && 'all 400ms linear')

const currentContent = computed(_ => {
  let index = state.value.activeIndex
  return testData.value[index].text
})

const prevContent = computed(_ => {
  let index = state.value.activeIndex - 1
  if(index >= 0) {
    return testData.value[index].text
  }
})

const nextContent = computed(_ => {
  let index = state.value.activeIndex + 1
  if(index <= testData.value.length - 1) {
    return testData.value[index].text
  }
})

const refreshing = computed(_ => state.value.refreshing)

const { ref:box, setRef } = useRef()

const reset = (index,top) => {
  
  if(index === -1) {
    if(top > 0) {
      console.log('refresh')
      state.value.refreshing = true
      setTimeout(()=>{
        state.value.top = 0
        testData.value = [
          {text: `this is data ${+new Date()}`},
        ]
        state.value.activeIndex = 0
      },2000)
      setTimeout(() => {
        state.value.isAnimating = false
        state.value.refreshing = false
      },2400)
      emits('refresh')
      return
    }else{
      state.value.top = 0
      setTimeout(()=>{
        state.value.isAnimating = false
      },450)
    }
  }else{
    //倒数第一个加载更多
    if(index === testData.value.length - 1) {
      console.log('load')
      testData.value.push({text:`this is data #${testData.value.length}`})
      emits('load')
    }
    setTimeout(()=>{
      state.value.isAnimating = false
      if(index >= 0)state.value.activeIndex = index
      state.value.top = 0
    },450)
  }
}

const touchStart = e => {
  // if(!refreshing.value) {
    e.preventDefault()

    const { top } = state.value

    let curTouch = e.touches[0]

    startTop = curTouch.clientY - top

    emits('onDragStart')
  // }  
}

const touchMove = e => {
    e.preventDefault()
    const { activeIndex } = state.value
    let curTouch = e.touches[0]
    state.value.top = curTouch.clientY - startTop
    if(activeIndex === 0 && state.value.top > 100) {
      state.value.top = 100
    }
    if(activeIndex === testData.value.length - 1 && state.value.top < -100) {
      state.value.top = -100 
    }
    emits('onDragMove',state.value.top)
}

const touchCancel = e => {
    const { top, activeIndex } = state.value
    emits('onDragStop',top)
    state.value.isAnimating = true

    if(top > 200 && activeIndex > 0) {
      state.value.top = box.value.clientHeight
      reset(activeIndex-1,top)
      return
    }

    if(top < -200 && activeIndex < testData.value.length - 1) {
      state.value.top = -box.value.clientHeight
      reset(activeIndex+1,top)
      return
    }

    reset(-1,top)
}

</script>

<style scoped>
.card {
  position: absolute;
  left: 0;
  width: 100%; 
  height: 100%;
  z-index: 6;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card:nth-child(1) {
  background-color:yellow;
  transform: translateY(-100%);
}

.card:nth-child(2) {
  background-color:skyblue;
  transform: translateY(0);
}

.card:nth-child(3) {
  background-color:aqua;
  transform: translateY(100%);
}

.limit-tip {
  text-align: center;
  width: 100%;
  height: 100px;
  line-height: 100px;
  background-color: white;
  position: absolute;
  pointer-events: none;
}

.live-card-transition {
  transition: all 0ms 400ms linear;
}

.live-card-fade {
  opacity: 0;
}
</style>