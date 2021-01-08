<template>
<div>
  <p class="font-test">it is back page</p>
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
.font-test {
  /* font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif; */
  /* font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; */
  /* font-family: Georgia, 'Times New Roman', Times, serif; */
  font: 16px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
  /* font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYiMicro Hei",sans-serif;; */
}
</style>