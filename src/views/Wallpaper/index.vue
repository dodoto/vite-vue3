<template>
  <div class="wallpaper">
    <img src="@/assets/wallpaper.jpg" alt="">
  </div>
</template>

<script setup>

import { read, getReadFunc } from '@/components/upload-utils.js'

import { useEvent } from '@/hooks/event/index.js'

const dragoverHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
}

const dropHandler = (e) => {
  e.preventDefault()
  e.stopPropagation()
  // let files = Array.from(e.dataTransfer.files)
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
  read(entries).then(res => console.log(res)).catch(err => console.log(err))
  // console.log(e.dataTransfer.files)
  // read(e.dataTransfer.files).then(res => console.log(res)).catch(err => console.log(err))
}

useEvent('dragover',dragoverHandler)

useEvent('drop',dropHandler)

</script>

<style>

</style>