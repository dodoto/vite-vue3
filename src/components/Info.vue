<template>
  <div style="height:200vh;">
    <div class="img"></div>
    <h4>this is info page</h4>
    <button 
      class="
      bg-green-400
        py-2 
        px-4 
        bg-emerald-500 
      text-white 
        font-semibold 
        rounded-lg 
        shadow-md 
      hover:bg-green-500
        focus:outline-none
        focus:ring-4 
        focus:ring-green-500
        focus:ring-opacity-50
      "
    >
  Hover me
</button>
  </div>
</template>

<script>
export default {
  name: 'Info',
  setup() {

  }
}
</script>

<style scoped>
.img {
  width: 100%;
  padding-bottom:25%;
  margin: auto;
  background-image: url(https://pic1.zhimg.com/v2-698eab2d320c37d94ba45270a7e402bd_r.jpg?source=1940ef5c);
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>