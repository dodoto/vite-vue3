<template>
<div>
  <p>it is back page</p>
  <div>
    <div v-for="item in list" :ref="setRefs" :key="item" >{{item}}</div>
  </div>
</div>

</template>

<script>
import { ref, onBeforeUpdate, onUpdated, toRefs } from 'vue';
import { useRefs } from '../hooks/ref/index'
export default {
  setup() {
    let list = [1,2,3,4]
    let { refs, setRefs } = useRefs()
    onUpdated(() => {
      console.log(refs)
    })
    return {
      list,
      setRefs
    }
  }
}
</script>

<style scoped>

</style>