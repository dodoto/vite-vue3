<template>
  
  <div class="side" :ref="setRef"  @click="sideToggle">
    <div 
      @click="push('/list')" 
      class=" hover:text-gray-700 pl-4 h-12 leading-12 text-gray-500 font-sans font-medium cursor-pointer text-sm" 
      :class="routeName === 'list' && ' text-blue-600 bg-blue-500 bg-opacity-25 hover:text-blue-600' "
    >
      Font Family
    </div>
    <div 
      @click="push('/info')"
      class=" hover:text-gray-700 pl-4 h-12 leading-12 text-gray-500 font-sans font-medium cursor-pointer text-sm" 
      :class="routeName === 'info' && ' text-blue-600 bg-blue-500 bg-opacity-25 hover:text-blue-600' "
    >
      info
    </div>

  </div>
  <div class="head">
    <div class="float-left m-5" @click="sideToggle" >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </div>
  </div>  
  <div class="main">
    <router-view />
  </div>
  
</template>

<script>
import { useRef } from '../hooks/ref/index'
import { usePush, useRouteName } from '../hooks/router/index'
import { useEvent, useResizeObserver } from '../hooks/event/index'
export default {
  name: 'Back',
  setup() {
    const push  = usePush()
    const routeName = useRouteName()
    let { ref, setRef } = useRef()
    const sideToggle = () => {
      let dom = ref.value
      let className = dom.classList[1];
      className === 'show' ? 
      dom.classList.remove('show') : dom.classList.add('show')
    }
    const windowSizeChange = () => {
      if(ref.value.classList[1] === 'show') {
        ref.value.classList.remove('show')
      }
    }
   
    // useEvent('resize',windowSizeChange)  
    useResizeObserver(windowSizeChange,document.body)
    return {
      push,
      routeName,
      sideToggle,
      setRef
    }
  }
}
</script>

<style scoped>

.side {
  position:fixed;
  z-index: 2;
  left:0; top:0; bottom:0;
  width:200px;
  background-color: #fff;
  box-shadow: 0 0 2px 1px #aaa;
  transition: transform 300ms linear;
}

.head {
  position:fixed;
  z-index: 1;
  left:0; top:0; right:0;
  height: 70px;
  background-color: #1976d2;
  box-shadow: 0 0 2px 1px #aaa;
}

.main {
  position:absolute;
  left:200px; top:0; right:0; bottom:0;
  padding-top: 70px;
}

@media screen and (max-width: 500px){
  .side {
    transform: translateX(-201px);
  }
  .main { left: 0; }
}

.show {
  transform: translateX(0);
  /* box-shadow: 200px 0 1px 10px rgba(0,0,0,.2); */
}
</style>
