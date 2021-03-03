<template>
  <div>
    <ul>
      <li v-for="item in datas" :key="item">
        <div :style="{fontSize:changsize()}">{{item}}</div>
      </li> 
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TestItem',
  props: ['datas'],
  updated() {
    console.log('test item updated');
  },
  methods:{
    changsize(){
      return (parseInt(Math.random()*15)+10)+'px';
    }
  }
}
</script>