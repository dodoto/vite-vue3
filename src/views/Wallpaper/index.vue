<template>
  <div class="wallpaper" @dragover="dragoverHandler" @drop="dropHandler">
    <img src="@/assets/wallpaper.jpg" alt="wallpaper">
    <ModalLoading :show="show" :tip="tip"/>
  </div>
</template>

<script setup>
//firefox 直接将drop事件挂载window下并不会阻止默认事件发生
import { read } from '@/components/upload-utils.js'
import ModalLoading from '@/components/ModalLoading.vue'
import { ref } from 'vue'

const show = ref(false)

const tip = ref('')

const readHandler = () => {
  tip.value = tip.value + 1
}

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
  read(entries,1000,readHandler)
  .then(res => {
    console.log(res)
    tip.value = 'Reading Complete!'
  })
  .catch(err => {
    console.log(err)
    tip.value = `Reading Failed! ${err}`
  })
  .finally(() => setTimeout(() => {
    show.value = false
  },1000))
}

</script>

<style>

</style>