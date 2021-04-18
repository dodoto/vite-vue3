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
    @scroll="scrollHandler"
  >
    <div class="canvas-wrapper w-4/5 box-border relative m-auto" v-for="index in total" :key="index">
      <canvas :ref="setRefs" class="w-full" :data-index="index">不支持canvas</canvas>
    </div>
  </div>
</template>

<script setup>
//先渲染3页, 滚动的时候再 3 页 渲染
import { nextTick, onMounted, ref } from 'vue'
import { useNProgress } from '@/hooks/nprogress/index.js'
import { useRefs, useRef } from '@/hooks/ref/index.js'
import * as PDFJS from 'pdfjs-dist'
// import * as pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry"
const workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.js`
PDFJS.GlobalWorkerOptions.workerSrc = workerSrc

useNProgress()

const { refs, setRefs } = useRefs()

const { ref:pdfContainer, setRef } = useRef()

let total = ref(0)    //总页数

let current = 0       //渲染到第几页

let pdf = null        //pdf对象

let scrollTop = 0     //滚动的高度

let url = '../../../../static/222.pdf'

// let canvas = null

//获取pdf
const getPdf = url => {
  return new Promise((resolve,reject) => {
    PDFJS.getDocument(url)
    .promise
    .then(pdf => {
      resolve(pdf)
    })
    .catch( err => reject(err))
  })
}
//渲染pdf
const renderPdf = (current,canvas) => {
  pdf.getPage(current).then(page => {
    let scale = 1.5
    let viewport = page.getViewport({scale})
    let canvasContext = canvas.getContext('2d')
    canvas.height = viewport.height
    canvas.width = viewport.width

    let renderContext = { canvasContext, viewport }
    page.render(renderContext)
  })
}
//初始化
const init = async _ => {
  pdf = await getPdf(url)
  total.value = pdf.numPages
  nextTick(_ => {
    let canvas = refs[current]
    console.log(canvas)
    current = current + 1
    renderPdf(current,canvas)
  })
}

const scrollHandler = _ => {
  return
  // let _scrollTop = pdfContainer.value.scrollTop
  // if(_scrollTop > scrollTop) {
  //   //向下加载
  //   if(current < total.value) {
  //     current++
  //     renderPdf()
  //   }
  //   scrollTop = _scrollTop
  // }
}

onMounted(init)

onMounted(_ => {
  setTimeout(_ => {
    for(let i = 2; i <= total.value; i++) {
      nextTick(_ => {
        let canvas = refs[current]
        current = current + 1
        renderPdf(current,canvas)
      })
    }
  },1000)
})


</script>

<style>
.canvas-wrapper {
  padding-top: 53.33333%;
}
.canvas-wrapper canvas {
  margin-top: -66.66666%;
}
.canvas-wrapper::after {
  content: '';
  display: block;
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