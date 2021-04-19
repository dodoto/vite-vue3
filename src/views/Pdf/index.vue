<template>
  <div 
    class="
      h-full 
      p-4 
      box-border 
      overflow-x-hidden 
      overflow-y-auto
    "
    :ref="setRef"
    @scroll="debounceScroll"
  >
    <div class="w-4/5 box-border relative m-auto overflow-hidden" v-for="index in total" :key="index" :style="{height:`${canvasHeight}px`}">
      <canvas v-if="index >= startPage && index <= endPage" :ref="getCanvas" class="w-full" :data-page="index">不支持canvas</canvas>
      <div v-else class="custom-loading"></div>
      <div class="absolute top-0 left-0">第{{index}}页</div>
    </div>
  </div>
</template>

<script setup>
//渲染5页，之后滚动从 current - 5 到 current + 5 进行渲染
import { computed, defineProps, nextTick, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, ref, watch, watchEffect } from 'vue'
import { useNProgress } from '@/hooks/nprogress/index.js'
//遇到问题，自定义setRefs会娶不到refs
import { useRefs, useRef } from '@/hooks/ref/index.js'
import { useDebounce } from '@/hooks/debounce&throttle/index.js'
import { useEvent } from '@/hooks/event/index.js'
import * as PDFJS from 'pdfjs-dist'
// import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`
PDFJS.GlobalWorkerOptions.workerSrc = workerSrc

useNProgress()

const { url, minRender } = defineProps({
  url: {
    type: String,
    default: '../../../../static/222.pdf'
  },
  minRender: {
    type: Number,
    default: 5
  }
})

let canvas = []

const getCanvas = el => canvas.push(el)

const { ref:pdfContainer, setRef } = useRef()

let whScale = 1

const PDFState = reactive({
  pdf: null,       //pdf 实例
  currentPage: 0,
  canvasHeight: 0, 
})

const startPage = computed(() => {
  let index = PDFState.currentPage - minRender
  if(index < 0) index - 0
  return index
})

const endPage = computed(() => {
  let index = PDFState.currentPage + minRender
  return index
})

const total = computed(() => {
  const { pdf } = PDFState
  if(!pdf) return 0
  return pdf.numPages
})

const canvasHeight = computed(() => PDFState.canvasHeight)

//获取pdf
const getPDF = (url) => {
  PDFJS.getDocument(url)
  .promise
  .then(pdf => PDFState.pdf = pdf)
  .catch(err => console.log(err))
}

getPDF(url)

const scroll = () => {
  let scrollTop = pdfContainer.value.scrollTop
  let index = Math.floor(scrollTop / canvasHeight.value)
  PDFState.currentPage = index
}

const debounceScroll = useDebounce(scroll,100,false)

const resize = () => {
  for(let item of canvas) {
    if(item) {
      const { width } = item.getBoundingClientRect()
      PDFState.canvasHeight = width / whScale
      break
    }
  }
}

const debounceResize = useDebounce(resize,100,false)

useEvent('resize',debounceResize)

onBeforeUpdate(() => {
  canvas = []
})

const getCanvasHeight = (canvas) => {
  const { width } = canvas.getBoundingClientRect()
  PDFState.canvasHeight = width / whScale
}
//页码从1开始
const renderPDF = (currentPage,canvas) => {
  PDFState.pdf.getPage(currentPage)
  .then(page => {
    let scale = 1.5
    let viewport = page.getViewport({scale})
    let canvasContext = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    whScale = viewport.width / viewport.height
    if(!canvasHeight.value) getCanvasHeight(canvas)
    let renderContext = { canvasContext, viewport }
    page.render(renderContext)
  })
} 

watch(
  () => PDFState.pdf,
  () => {
    nextTick(() => {
      // console.log(canvas)
      for(let index = 0; index < canvas.length;index++) {
        renderPDF(index+1,canvas[index])
      }
    })
  }
)

watch(
  () => PDFState.currentPage,
  () => {
    let oldCanvas = canvas
    nextTick(() => {
      let newCanvas = canvas
      newCanvas.forEach(item => {
        if(!item) return
        let has = false
        oldCanvas.forEach(oldItem => {
          if(item === oldItem) has = true          
        })
        if(!has) {
          let index = parseInt(item.dataset.page)
          console.log(index)
          renderPDF(index,item)
        }
      })
    })
  }
)

</script>

<style>
.custom-loading {
  width: 50px; height: 50px;
  border-radius: 50%;
  border: 5px solid skyblue;
  border-top-color: steelblue;
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  margin: auto;
  z-index: -1;
  animation: standing 1s linear infinite;
}

@keyframes standing {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>