<template>
  <div>
    <input type="checkbox" id="menu-show" class="hidden">
    <div class="side fixed left-0 bottom-0 z-10 transition-transform bg-white " :ref="setRef" >
      <label
        for="menu-show"
        v-for="route of routes"
        :key="route.path" 
        @click="push(route.path)"
        class="
          block
          uppercase 
          tracking-wide 
          font-semibold 
          pl-4 h-10
          leading-10
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
      </label>  
    </div>
    <div class="head bg-blue-400 fixed z-10 top-0 left-0 right-0">
      <div class="float-left m-4 sm:hidden  w-10 h-10 leading-10 text-center ">
        <label class="cursor-pointer text-white hover:text-blue-100 " for="menu-show">
          <i class="fa fa-bars fa-lg"></i>
        </label>
      </div>
    </div>  
    <div class="main">
      <div style="height:900px;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { useRef } from '@/hooks/ref/index'
import { usePush, useRouteName } from '@/hooks/router/index'
export default {
  name: 'Back',
  setup() {
    const push  = usePush()
    const routeName = useRouteName()
    let { ref, setRef } = useRef()
    const routes = [
      {name:'list',label:'list',path:'/list'},
      {name:'filter',label:'filter',path:'/filter'},
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
  box-shadow: 0 3px 3px 0px #aaa;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1), clip-path 150ms 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.head {
  height: 70px;
  box-shadow: 0 0 2px 1px #aaa;
}

.main {
  padding-left: 250px;
  padding-top: 70px;
}

@media screen and (max-width: 640px){
  .side {
    /* transform: translateX(-251px); */
    clip-path: inset(0px 50% 50% 0px round 0px 0px 0px 0);;
  }
  .main { padding-left: 0 }
  #menu-show:checked ~ .side {
    /* transform: translateX(0); */
    clip-path: inset(0px 0px 0px 0px round 0px 0px 0px 0px);;
  }
  #menu-show:checked ~ .head label i::before {
    content: '\f00d';
  }
}

</style>
