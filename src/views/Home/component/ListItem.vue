<template>
  <div class="list-item border-b border-gray-300 py-2 mt-2">
      <div class="float-left text-blue-400 cursor-pointer hover:text-blue-500" @click="checked">
        <!-- <input id="complete" type="checkbox" class="align-middle outline-none" @change="checked"> -->
        <i class="fa fa-close"></i>
      </div>
      <div class="content ml-4  pl-1 text-gray-500 text-ta overflow-hidden overflow-ellipsis">{{text}}</div>
  </div>
</template>

<script>
import { toRefs } from 'vue'
export default {
  props: {
    id: {
      type: Number,
      require: true
    },
    text: {
      type: String,
      require: true
    }
  },
  setup(props,context) {

    let { text, id } = props

    let checked = () => {
      context.emit('checked',id)
    }

    return {
      // text,
      checked,
      ...toRefs(props)
    }
  }
}
</script>

<style scoped>

</style>