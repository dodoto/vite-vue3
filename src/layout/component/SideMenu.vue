<template>
  <div v-for="route of routes" :key="route.name">
    <div
      v-ripple
      class="
        uppercase 
        tracking-wide 
        font-semibold 
        h-10
        leading-10
        font-sans 
        cursor-pointer 
        text-sm
        m-2
        pl-4
        rounded
        relative
        overflow-hidden
        select-none
      " 
      :class="
        route.name === routeName ?
        'text-white bg-blue-400' :
        'text-gray-300 hover:text-gray-400 '
      "
      @click="push(route.path)"
    >
      {{route.name}}
    </div>
  </div>
</template>

<script setup>
import { useRouteName, useRoutes, usePush } from '@/hooks/router/index.js'

const routeName = useRouteName()

const routes = useRoutes()[0]['children']

const push = usePush()

</script>