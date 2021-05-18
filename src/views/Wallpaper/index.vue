<template>
  <div class="wallpaper" @dragover="dragoverHandler" @drop="dropHandler">
    <img src="@/assets/wallpaper.jpg" alt="">
    <ModalLoading :show="show" :tip="'Reading Folder...'"/>
  </div>
</template>

<script setup>
//firefox 直接将drop事件挂载window下并不会阻止默认事件发生
import { read } from '@/components/upload-utils.js'
import ModalLoading from '@/components/ModalLoading.vue'
import { ref } from 'vue'
import { load } from '@amap/amap-jsapi-loader'

const show = ref(false)

const dragoverHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const testAlert = () => alert(1)

const dropHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
  // let files = Array.from(e.dataTransfer.files)
  show.value = true
  let items = Array.from(e.dataTransfer.items)
  // items.forEach((item,index) => {
  //   let target = item.webkitGetAsEntry()
  //   // let name = files[index].name
  //   // console.log(name)
  //   // this.uploadItems.push({name,target})
  //   // console.log(target)
  //   let test = getReadFunc()
  //   test([target],test)
  //   read(target).then(res => console.log(res)).catch(err => console.log(err))
  // })
  let entries = items.map(item => item.webkitGetAsEntry())
  read(entries)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  .finally(() => setTimeout(() => {
    show.value = false
  },500))
  // console.log(e.dataTransfer.files)
  // read(e.dataTransfer.files).then(res => console.log(res)).catch(err => console.log(err))
}

</script>

<style>

</style>