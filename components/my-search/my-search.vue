<template>
	<view @click="searchBoxHandler" class="my-sreach-contaner" :style="{'background-color':bgcolor}">
		<view class="my-sreach-box" :style="{'border-radius':radius+'px'}">
			<uni-icons  type="search" size="16px" ></uni-icons>
			<text class="placeholder">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			bgcolor:{
				//背景颜色
				bgcolor: String,
				default:'#007AFF'
			},
			radius:{
				type: Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchBoxHandler(){
				this.$emit('myclick')
			}
		}
		
	}
</script>

<style lang="scss">
	.my-sreach-contaner{
		
		height: 50px;
		
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my-sreach-box{
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			height: 36px;
			background-color: #ffffff;
			
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			
		}
		.placeholder{
			font-size: 15px;
			margin-left: 5px;
		}
	}

</style>