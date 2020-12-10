<template>
  <p>it is back page</p>
  <div>
    <div v-for="item in list" :ref="setItemRef" :key="item">{{item}}</div>
  </div>
</template>

<script>
import { ref, onBeforeUpdate, onUpdated, toRefs } from 'vue';

export default {
  setup() {
    let list = [1,2,3,4]
    let itemRefs = []
    const setItemRef = el => {
      itemRefs.push(el)
    }
    onBeforeUpdate(() => {
      itemRefs = []
    })
    onUpdated(() => {
      console.log(itemRefs)
    })
    return {
      list,
      itemRefs,
      setItemRef
    }
  }
}
</script>