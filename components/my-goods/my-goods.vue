<template>
	<view class="googs-item">
		<!-- 左 -->
	   <view class="googs-item-left">
		<radio :checked="goods.goods_state" color="#c00000" v-if="showfalse" @click='mysclick'></radio>
		<image :src="goods.goods_small_logo"  class="goods-pic"></image>
	</view>
	<!-- 右边 -->
	<view class="goods-item-right">
		<!-- 商品名字 -->
		<view class="goods-name">
			{{goods.goods_name}}
		</view>
		<!-- 商品价格 -->
		<view class="goods-info-box">
			<view class="goods-price">
				￥{{goods.goods_price|tofixed}}
			</view>
			<uni-number-box v-if="showNum" :min="1" @change="bindchange" :value="goods.goods_count"></uni-number-box>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		filters:{
			tofixed(num){
			return	Number(num).toFixed(2)
			}
		},
		props:{
			goods:{
				type:Object,
				default:{}
			},
			showfalse:{
				type:Boolean,
				default:false
			},
			showNum:{
				type:Boolean,
				default:false
			}
			
		},
		name:"my-goods",
		data() {
			return {
				
				
			};
		},
		methods:{
			mysclick(){
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			bindchange(val){
				console.log(val)
				this.$emit('num_change',{
					goods_id:this.goods.goods_id,
					goods_count:+val
				})
			}
		}
		
	}
</script>

<style lang="scss">
	.googs-item{
		display: flex;
		padding: 10px 5px;
		border-bottom: 1px solid #f0f0f0;
		.googs-item-left{
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-right: 5px;
			.goods-pic{
				width: 100px;
				height: 100px;
				display: block;
				
			}
			.goods-item-right{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.goods-name{
					font-size: 13px;
				}
				.goods-info-box{
					display: flex;
					justify-content: space-between;
					align-items: center;
					.goods-price{
						color: #c00000;
						font-size: 16px;
					}
				}
			}
		}
	}
	
	

</style>