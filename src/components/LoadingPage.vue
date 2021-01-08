<template>
    <div class="w-full h-full flex justify-center items-center bg-slategrey" >
      <div>
        <div class="circle-box">
          <div class="circle" :style="{clipPath}"></div>
        </div>
        <p style="text-align: center; color: white;">{{p}}%</p>
      </div>
    </div> 
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  name: 'LoadingPage',
  setup() {
    let calc = (rate) => {
			rate = (rate + 180) * -1
			let x = (Math.sin(rate * Math.PI/180) + 1) / 2
			let y = (Math.cos(rate * Math.PI/180) + 1) / 2
			return Math.round(x * 100) + "% " + Math.round(y * 100) + "%"
		}

		let endHandler = () => {
			console.info("结束")
			d = null
			totalTime = null
      dotData = null
      window.location.hash = '#/'
		}

		// 角度，从0 开始
		let d = 0;
		// 累加的最大值
		let totalTime = 10000;
		// 保存的环上的点数组数据
    let dotData = [];

    let p = ref('0');
    
    let clipPath = ref('');
    
    onMounted(()=>{
      let si = setInterval(() => {

        // 计算并保存当前角度的
        p.value = (d/totalTime * 100).toFixed(0);
        dotData.push(calc(d / totalTime * 360))
        // 将计算的点数据赋值给页面环元素(vue写法)
        // cycleCss = 
        // console.log(dotData)
        // div.style.clipPath = "polygon(50% 50%," + dotData.join(",") + ")"
        clipPath.value = "polygon(50% 50%," + dotData.join(",") + ")";
        if(d >= totalTime){
          clearInterval(si)
          endHandler()
        } else {
          d = d + 50;
        }
      }, 50)
    })
    return {
      p,
      clipPath
    }
  }
}
</script>

<style scoped>
.circle-box {
  border-radius: 50%;
  width: 150px;
  height: 150px;
  overflow: hidden;
  position: relative;
}

.circle-box::after {
  content: '';
  display: block;
  width: 160px;
  height: 160px;
  border: 20px solid rgba(255, 255, 255, .2);
  border-radius: 50%;
  /* background-color: skyblue; */
  position: absolute;
  top: -5px; left: -5px;
  z-index: 1;
}

.circle-box::before {
  content: '';
  display: block;
  width: 125px;
  height: 125px;
  border-radius: 50%;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto;
  z-index: 3;
  background-color: yellow;
  background-size: cover;
  background-image: url('https://tvax3.sinaimg.cn/crop.0.0.1242.1242.180/4ca9b00fly8frote8nd02j20yi0yimyu.jpg?KID=imgbed,tva&Expires=1610009213&ssig=2ZR8j6cM1%2F');
}

.circle {
  width: 160px;
  height: 160px;
  border: 20px solid rgb(165, 196, 226);
  border-radius: 50%;
  position: absolute;
  top: -5px; left: -5px;
  z-index: 2;
}

</style>
