<template>
  <div class="list bg-blue-100 h-full w-full p-6">
    <div class="m-auto p-8 shadow-2xl rounded bg-white w-80">

      <div class="border-b border-gray-300">
        <form>
          <input
            class="outline-none py-2 w-11/12"
            placeholder="start typing here" 
            v-model="text"
          />
          <button type="submit" style="outline:none;" class="w-1/12" @click="submit">
            <i class="fa fa-plus text-blue-400 hover:text-blue-500"></i>
          </button>
        </form>
      </div>
      <transition-group name="list" tag="div">
        <list-item 
          v-for="item of data" 
          :key="item.id" 
          :id="item.id" 
          :text="item.text" 
          :ref="setRefs"
          @checked="checkedHandler"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { ref, reactive, nextTick } from 'vue';
import { useRefs } from '@/hooks/ref/index';
import ListItem from './ListItem.vue';
export default {
  components: { ListItem },
  setup() {
    let list = [1,2,3,4]
    let { refs, setRefs } = useRefs()

    let data = reactive([{id:1,text:'ceshi 1'},{id:2,text:'ceshi 2'}])

    let text = ref('')

    let submit = () => {
      if(text.value.trim()) {
        data.push({id: new Date().getTime(),text:text.value})
        nextTick(()=>{
          text.value = ''
        })
      }
    }

    let checkedHandler = (id) => {
      let index = data.findIndex(item => item.id === id)
      data.splice(index,1)
      // data 必须不能改变引用地址 map这种生成新的对象会导致数据变化视图没有变化
    }

    return {
      list,
      setRefs,
      text,
      submit,
      checkedHandler,
      // ...toRefs(data)
      data
    }
  }
}
</script>

<style scoped>

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to
/* .list-leave-active for below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}

.list-radius {
  border-radius: 20% 5% 20% 5%/5% 20% 25% 20%;
}

.v-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}


</style>