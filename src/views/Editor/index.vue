<template>
  <div class="pt-4 px-4 pb-60 h-full box-border min-h-min overflow-auto">
    <div :innerHTML="content.html" class="p-3 break-all border-gray-200 border h-full bg-white"></div>
    <div :ref="setRefs" class="h-60 -mb-60 pt-4">
    </div>
  </div>
</template>

<script setup>
import Editor from 'wangeditor'
import { onMounted, onBeforeUnmount, reactive } from 'vue'
import { useRefs } from '@/hooks/ref/index.js'

const { refs, setRefs } = useRefs()

const content = reactive({
    html: '',
    text: '',
});

let editor = null

onMounted(_ => {
  editor = new Editor(refs[0])
  Object.assign(editor.config,{
    onchange() {
      content.html = editor.txt.html()
    },
    height: 170, //菜单和输入拆分后没有生效
    zIndex: 29,
    placeholder: '输入',
    focus: false,
    // customAlert
  })
  editor.create()
})

onBeforeUnmount(_ => {
  editor.destroy()
  editor = null
})

</script>

<style>

</style>