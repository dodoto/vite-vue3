<template>
  <div class="hello">
    <test-item :datas="datas"></test-item>
    <input type="text" v-model="tests">
    {{tests}}
  </div>
</template>
<script>
import TestItem from './TestItem.vue';
export default {
  name: 'HelloWorld',
  components: { TestItem },
  created() {console.log('test')},
  data () {
    return {
      datas:['one','two','three','one','two','three','one','two','three'],
      fz:'',
      tests:'',
    }
  },
}
</script>
