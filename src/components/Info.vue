<template>
  <div class="filter-blur relative h-full bg-cover bg-no-repeat bg-center">
    <input type="checkbox" name="content-toggle" id="content-toggle" class="hidden">
    <label 
      for="content-toggle" 
      class="drop cursor-pointer text-white absolute text-center w-4 h-4 left-0 right-0 mx-auto"
    >
		  <i class="fa fa-arrow-down"></i>
	  </label>
    <div class="
      content relative w-80 h-40  top-1/2 left-1/2 rounded transform 
      ease-linear duration-300 overflow-hidden box-border shadow-2xl"
    >
		  <label for="content-toggle" class="close cursor-pointer text-white absolute ">
			  <i class="fa fa-close"></i>
		  </label>
      <div class="absolute top-8 bottom-4 w-full overflow-hidden overflow-ellipsis box-border px-4 font-sans text-lg text-gray-700 ">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        Blanditiisitaquequodpraesentiumexplicaboincidunt? 
        Dolores beatae nam at sed dolorum ratione dolorem nisi velit cum.
      </div>
	  </div>
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
		.filter-blur {
			background-image: url('../assets/wallpaper.jpg');
		}

		#content-toggle:checked ~ .content {
			transform: translate(-50%,-50%);
		}

		#content-toggle:checked ~ .drop {
			display: none;
		}

		.content {
      z-index: 1;
      transform: translate(-50%,-100vh);
		}
		.content:after {
		    content: '';
		    position: absolute;
		    top: 0;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    background-color: #fff;
		    background-image: url('../assets/wallpaper.jpg');
		    background-size: cover;
		    background-repeat: no-repeat; 
		    background-attachment: fixed;
		    background-position: center center;
		    filter: blur(28px);
		    z-index: -1;

		}

		.close {
			right: 10px; top: 10px;
			line-height: 0;
		}

		.drop {
			top: 10px;
			animation: beat 1s ease-in-out 0s infinite;
		}

		@keyframes beat {
			0% { transform: scale(1) translateY(0px); }
			50% { transform: scale(1.2) translateY(2px); }
			100% { transform: scale(1) translateY(0px); }
		}
</style>