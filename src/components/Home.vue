<template>
	<div style="width: 100%;height: 100%;overflow:hidden">
    <livecard />
	</div>
</template>

<script>
	import livecard from "./livecard.vue"
	export default {
		components:{
			livecard
		},
	}
</script>

<style scoped>
	
	div{
		box-sizing: border-box;
	}
	.zhihuCard{
		padding: 10px;
	}
	.zhihuCard:nth-child(1)
	{
		font-size: 18px;
	}
	.zhihuCard>div:nth-child(2)
	{
		display: flex;
		position: absolute;
		width: 100%;
		left:0px;
		bottom: 10px;
		padding:0px 10px;
	}
	.zhihuCard>div:nth-child(2)>div:nth-child(1)
	{
		flex:1;
		font-size: 14px;
		color: #666;
	}
	.zhihuCard>div:nth-child(2)>div:nth-child(2)
	{
		display: flex;
	}
	.zhihuCard>div:nth-child(2)>div:nth-child(2)>button:nth-child(2)
	{
		margin-left: 5px;
	}
	button
	{
		height: 24px;
		line-height: 24px;
		font-size: 12px;
	}
</style>