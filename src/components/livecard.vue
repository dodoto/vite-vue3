<template>
  <div style="position:relative;width:100%;height:100%;" ref="box">
    
    <div 
      class="card" 
      :style="{top:top+'px',transition: isAnimating && 'all 400ms linear'}"
      >占位图
    </div>
    <div 
      class="card" 
      :style="{top:top+'px',transition: isAnimating && 'all 400ms linear'}"
        @touchstart="touchStart" @touchmove="touchMove" @touchcancel="touchCancel" @touchend="touchCancel">
          {{testData[activeIndex].text}}
    </div>
    <div 
      class="card" 
      :style="{top:top+'px',transition: isAnimating && 'all 400ms linear'}"
      >
      占位图
    </div>
      <p class="limit-tip">到头了</p>
      <p class="limit-tip">到尾了</p>
  </div>  
</template>

<script>
export default {
  data() {
    return {
      testData: [
        {
          text: 'this is data no 0'
        },
        {
          text: 'this is data no 1'
        },
        {
          text: 'this is data no 2'
        }
      ],
      top: 0,
			startTop:0,
			isDrag:false,
      isAnimating:false,
      activeIndex: 0
    }
  },

  computed: {
    max: function() {
      return this.testData.length - 1
    }
  },

  methods:{
			touchStart:function(e){
        e.preventDefault();
				if(this.isAnimating)return;
				
				this.isDrag=true;
				var curTouch=e.touches[0];
				this.startTop=curTouch.clientY-this.top;
				
				this.onDragStart();
			},
			touchMove:function(e){
        e.preventDefault();
				if(this.isAnimating)return;
				
				var curTouch=e.touches[0];
				this.top=curTouch.clientY-this.startTop;
				this.onDragMove({left:0,top:this.top});
			},
			touchCancel:function(e){
				
        this.isDrag=false;
				this.onDragStop({left:0,top:this.top});
        if(this.isAnimating)return;
        this.isAnimating = true;
				var that=this;
        var curTouch=e.touches[0];
        let box = this.$refs['box'];
        if(this.top > box.clientHeight/4) {
          this.top = box.clientHeight
          console.log('pull down')
          this.activeIndex > 0 && this.activeIndex--
          this.reset()
          return
        }
        if(this.top < -box.clientHeight/4) {
          this.top = -box.clientHeight
          console.log('pull up')
          this.activeIndex < this.max && this.activeIndex++
          this.reset()
          return
        }
        this.top = 0
        setTimeout(()=>{
          this.isAnimating = false
        },500)
      },
      
      reset: function(){
        setTimeout(()=>{
          // console.log(23423)
          this.isAnimating = false
          this.top = 0
        },500)
      },

			onDragStart:function(){
				this.$emit('onDragStart');
			},
			onDragMove:function(obj){
				this.$emit('onDragMove',obj);
			},
			onDragStop:function(obj){
				this.$emit('onDragStop',obj);
			},
			onThrowFail:function(){
				this.$emit('onThrowFail');
			},
			onThrowStart:function(){
				this.$emit('onThrowStart');
			},
			onThrowDone:function(){
				this.$emit('onThrowDone');
			}
		},
}
</script>

<style scoped>
.card {
  position: absolute;
  left: 0;
  width: 100%; 
  height: 100%;
  z-index: 6;
}

.card:nth-child(1) {
  background-color:yellow;
  transform: translateY(-100%);
}

.card:nth-child(2) {
  background-color:skyblue;
  transform: translateY(0);
}

.card:nth-child(3) {
  background-color:aqua;
  transform: translateY(100%);
}

.limit-tip {
  position: absolute;
  width: 100%;
  text-align: center;
  /* z-index: -1; */
}

.limit-tip:first-child {
  top: 0;
}

.limit-tip:last-child {
  bottom: 0;
}
</style>