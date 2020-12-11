<template>
  
  <div class="side" :ref="setRef">
    <div @click="push('/list')" :class="routeName === 'list' ? 'link active' : 'link'">list</div>
    <div @click="push('/info')" :class="routeName === 'info' ? 'link active' : 'link'">info</div>
  </div>
  <div class="head">
    <div class="side-switch" @click="sideToggle" >click to show side</div>
  </div>  
  <div class="main">
    <router-view />
  </div>
  
</template>

<script>
import { useRef } from '../hooks/ref/index'
import { usePush, useRouteName } from '../hooks/router/index'
import { useEvent } from '../hooks/event/index'
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
    useEvent('resize',windowSizeChange)
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

.link {
  cursor: pointer;
  text-decoration: none;
  padding: 20px 0;
  opacity: 1;
  background-color: #fafafa;
  transition: all 300ms linear;
}

.link:hover {
  opacity: .5;
  color: #fff;
  background-color: #a3a3a3;
}

.active {
  color: #fff;
  background-color: #b3b3b3;
  position: relative;
}

.active::after {
  content: '';
  display: block;
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 4px;
  background-color: #939393;
}

.head {
  position:fixed;
  z-index: 1;
  left:0; top:0; right:0;
  height: 100px;
  padding-left: 200px;
  background-color: #fff;
  box-shadow: 0 0 2px 1px #aaa;
}

.side-switch {
  float: left;
  height: 100%;
  line-height: 100px;
}

.main {
  position:absolute;
  left:200px; top:0; right:0; bottom:0;
  padding-top: 100px;
}

@media screen and (max-width: 500px){
  .side {
    transform: translateX(-201px);
  }
  .main { left: 0; }
}

.show {
  transform: translateX(0);
}
</style>
