<template>
  <div :style="{height}">
    <livecard />
	</div>
</template>

<script setup>
import { defineComponent } from 'vue'
import livecard from '@/views/Live/component/livecard.vue'

const height = `${window.innerHeight}px`

</script>
