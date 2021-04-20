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
    <!-- <button
      @click="jumpTo" 
      class="
        absolute
        top-24
        left-56
        py-2 
        px-4 
        text-white 
        font-semibold 
        rounded-lg 
        shadow-md 
        bg-green-500 
        active:bg-green-700
        focus:outline-none"
    >
      click to jump
    </button> -->
    <div class="w-4/5 relative m-auto overflow-hidden " v-for="index in total" :key="index" :style="{height:`${canvasHeight}px`}">
      <canvas v-if="index >= startPage && index <= endPage" :ref="getCanvas" class="w-full" :data-page="index">不支持canvas</canvas>
      <div v-else class="custom-loading"></div>
      <!-- <div v-if="index >= startPage && index <= endPage" class="text-layer absolute top-0 left-0 w-full h-full"></div> -->
    </div>
  </div>
</template>

<script setup>
//渲染5页，之后滚动从 current - 5 到 current + 5 进行渲染
import { computed, defineProps, nextTick, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, reactive, ref, watch, watchEffect } from 'vue'
import { useNProgress } from '@/hooks/nprogress/index.js'
//遇到问题，自定义setRefs会取不到refs
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
    default: 4
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
  if(index < 0) index = 0
  return index
})

const endPage = computed(() => {
  let index = PDFState.currentPage + minRender
  if(index > total) index = total
  return index
})

const total = computed(() => {
  const { pdf } = PDFState
  if(!pdf) return 0
  return pdf.numPages
})

const canvasHeight = computed(() => PDFState.canvasHeight)

const jumpTo = () => {
  const container = pdfContainer.value
  const { canvasHeight } = PDFState
  container.scrollTo(0,90 * canvasHeight)
}

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

const keepPosition = (oldHeight) => {
  let scale = oldHeight / PDFState.canvasHeight
  const container = pdfContainer.value
  let scrollTop = container.scrollTop
  let newScrollTop = scrollTop / scale
  //scrollTo是绝对滚动（以view的内容的中心为原点），而scrollBy是相对滚动 会在原来基础上叠加
  container.scrollTo(0,newScrollTop)
}

const resize = () => {
  let oldHeight = PDFState.canvasHeight
  //重置高度
  for(let item of canvas) {
    if(item) {
      const { width } = item.getBoundingClientRect()
      PDFState.canvasHeight = width / whScale
      break
    }
  }
  nextTick(() => {
    keepPosition(oldHeight)
  })
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

const renderTextLayer = (textContent,el,viewport) => {
  PDFJS.renderTextLayer({
    textContent,
    container: el,
    viewport,
    textDivs: []
  })
}

//页码从1开始
const renderPDF = (currentPage,canvas) => {
  PDFState.pdf.getPage(currentPage)
  .then(page => {
    let scale = 1
    let viewport = page.getViewport({scale})
    let canvasContext = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width
    whScale = viewport.width / viewport.height
    if(!canvasHeight.value) getCanvasHeight(canvas)
    let renderContext = { canvasContext, viewport }
    page.render(renderContext)     //下面开始渲染文字图层
    // .promise
    // .then(() => page.getTextContent())
    // .then(textContent => {
    //   let viewport = page.getViewport({
    //     scale:0.8,
    //   })
    //   let sibling = canvas.parentNode.children[1]
    //   renderTextLayer(textContent,sibling,viewport)
    // })
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
          renderPDF(index,item)
        }
      })
    })
  }
)

</script>

<style>

.text-layer > span {
  position: absolute;
  line-height: 1;
}

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