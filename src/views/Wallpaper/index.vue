<template>
  <div class="wallpaper">
    <img src="@/assets/wallpaper.jpg" alt="" style="width:100%">
  </div>
</template>

<script setup>

import { read, getReadFunc } from '@/components/upload-utils.js'

import { onBeforeUnmount, onMounted } from 'vue'

const dragoverHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const dropHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
  let files = Array.from(e.dataTransfer.files)
  let items = Array.from(e.dataTransfer.items)
  items.forEach((item,index) => {
    let target = item.webkitGetAsEntry()
    let name = files[index].name
    // this.uploadItems.push({name,target})
    let test = getReadFunc()
    test([target],test)
    read(target).then(res => console.log(res)).catch(err => console.log(err))
  })
}

onBeforeUnmount(()=>{
  document.removeEventListener('dragover',dragoverHandler,false)
  document.removeEventListener('drop',dropHandler,false)
})

onMounted(()=>{
  document.addEventListener('dragover',dragoverHandler,false)
  document.addEventListener('drop',dropHandler,false)
})

</script>

<style>

</style>