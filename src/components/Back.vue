<template>
  <div>
    <input type="checkbox" id="menu-show" class="hidden">
    <div class="side fixed left-0 bottom-0 z-10 transition-transform bg-white " :ref="setRef" >
      <div
        v-for="route of routes"
        :key="route.path" 
        @click="push(route.path)"
        class="
          uppercase 
          tracking-wide 
          font-semibold 
          pl-4 h-12 leading-12 
          font-sans 
          cursor-pointer 
          text-sm
          m-2
          rounded
        " 
        :class="
          route.name === routeName ?
          'text-white bg-blue-400' :
          'text-gray-300 hover:text-gray-400 '
        "
      >
        {{route.label}}
      </div>
    </div>
    <div class="head bg-blue-400 fixed z-10 top-0 left-0 right-0">
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
      {name:'list',label:'list',path:'/list'},
      {name:'info',label:'info',path:'/info'},
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
  top:70px;
  width:250px;
  box-shadow: 0 3px 3px 0px gray;
}

.head {
  height: 70px;
  box-shadow: 0 0 2px 1px #aaa;
}

.main {
  position:absolute;
  left:250px; top:0; right:0; bottom:0;
  padding-top: 70px;
}

@media screen and (max-width: 640px){
  .side {
    transform: translateX(-251px);
  }
  .main { left: 0; }
  #menu-show:checked ~ .side {
    transform: translateX(0);
  }
  #menu-show:checked ~ .head label i::before {
    content: '\f00d';
  }
}

</style>
