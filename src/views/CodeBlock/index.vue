<template>
  <div class="h-full overflow-auto">
    <div class="rounded-lg m-3.5">
      <pre>
        <code :class="lang" class="line-numbers">
          {{code}}
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, nextTick, onMounted } from 'vue'
import { useNProgress } from '@/hooks/nprogress/index.js'

const props = defineProps({
  codeLang: {
    type: String,
    default: 'js'
  },
  code: {
    type: String,
    default: `
      //在 App.vue 引入这些
      import 'prismjs'
      import 'prismjs/plugins/normalize-whitespace/prism-normalize-whitespace'
      import 'prismjs/plugins/toolbar/prism-toolbar'
      import 'prismjs/plugins/toolbar/prism-toolbar.css'
      import 'prismjs/themes/prism-okaidia.css'
      import 'prismjs/plugins/line-numbers/prism-line-numbers'
      import 'prismjs/plugins/line-numbers/prism-line-numbers.css'
      import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

      //在使用的地方,可以封装成Hook
      const highlight = () => {
        nextTick(() => {
          Prism.highlightAll()
        })
      }

      onMounted(highlight)
    `
  }
})

const lang = computed(() => `language-${props.codeLang}`)

const code = computed(() => props.code)

useNProgress()

const highlight = () => {
  nextTick(() => {
    Prism.highlightAll()
  })
}

onMounted(highlight)

</script>