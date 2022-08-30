<template>
	<view class="my-settle-container">
		<label class="radio" @click="changAllState">
			<radio color="#c00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		
		
		
		<view class="amount-box">
			合计：<text class="amount">￥:{{checknum}}</text>
		</view>
		<view class="but-settle" @click="settlement">
			结算（{{checkedCout}}）
		</view>
	</view>
</template>

<script>
	import { mapGetters,mapMutations,mapState} from "vuex"
	export default {
		name:"my-settle",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['token']),
			...mapGetters('m_user',['addstr']),
			...mapGetters('m_cart',['checkedCout','total','checknum']),
			isFullCheck(){
				return this.total===this.checkedCout
			}
		},
		methods:{
			...mapMutations('m_cart',['updataAllGoodsState']),
			changAllState(){
				this.updataAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCout) return uni.$showMsg('请选择结束商品')
				if(!this.addstr) return uni.$showMsg('请选择收货地址')
				if(!this.token) return uni.$showMsg('请先登录')
			}
		}
	}
</script>

<style lang="scss">
.my-settle-container{
	position: fixed;
	left:0;
	bottom: 0;
	width: 100%;
	height: 50px;
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	padding-left: 5px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
			font-weight: bold;
		}
	}
	.but-settle{
		background-color: #c00000;
		height: 50px;
		color: white;
		line-height: 50px;
		min: width 100px;
		text-align: center;
		padding: 0 10px;
		
	}
}
</style>