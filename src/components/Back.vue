<template>
  <div>
    <input type="checkbox" id="menu-show" class="hidden">
    <div class="side" :ref="setRef" >
      <div
        v-for="route of routes"
        :key="route.path" 
        @click="push(route.path)"
        class="uppercase tracking-wide font-semibold hover:text-gray-500 pl-4 h-12 leading-12 text-gray-400 font-sans cursor-pointer text-sm" 
        :class="route.name === routeName && ' uppercase tracking-wide font-semibold text-blue-500 bg-blue-400 bg-opacity-25 hover:text-blue-500' "
      >
        {{route.label}}
      </div>
    </div>
    <div class="head">
      <div class="float-left m-4 sm:hidden  w-10 h-10 leading-10 text-center ">
        <label class="cursor-pointer text-white hover:text-blue-100 " for="menu-show">
          <i class="fa fa-bars fa-lg"></i>
        </label>
      </div>
    </div>  
    <div class="main">
      <router-view />
    </div>
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
    const routes = [
      {name:'list',label:'Font Family',path:'/list'},
      {name:'info',label:'info',path:'/info'},
      {name:'table',label:'tst',path:'/tst'}
    ]
    return {
      push,
      routeName,
      routes,
      setRef
    }
  }
}
</script>

<style scoped>

.side {
  position:fixed;
  z-index: 2;
  left:0; top:70px; bottom:0;
  width:200px;
  background-color: #fff;
  box-shadow: 0 0 2px 1px #aaa;
  transition: transform 300ms ease;
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

@media screen and (max-width: 640px){
  .side {
    transform: translateX(-201px);
  }
  .main { left: 0; }
  #menu-show:checked ~ .side {
    transform: translateX(0);
  }
  #menu-show:checked ~ .head label i::before {
    content: '\f00d';
  }
}

.show {
  transform: translateX(0);
  /* box-shadow: 200px 0 1px 10px rgba(0,0,0,.2); */
}
</style>
