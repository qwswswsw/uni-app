<template>
	<view class="goods-item" v-if="cart.length!=0">
		
		<my-address></my-address>
		
		
		
		<view class="cart-title">
			<!-- 左边 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右边 -->
			<text class="cart-title-text">购物车</text>
		</view>
			<uni-swipe-action>
				<block v-for="(item,i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClichHandler(item)">
					<my-goods @num_change="numberchangeHandler" :showNum="true" :goods="item" :showfalse="true" @radio-change="radiochangeHandler">
					</my-goods>
				</uni-swipe-action-item>
				</block>
			</uni-swipe-action>
		<my-settle></my-settle>
	</view>
	<view class="empty-cart" v-else>
		<image src="../../static/购物车.jpg" class="empty-img"></image>
		<text class="tip-text">赶紧去消费</text>
	</view>
</template>

<script>
	import { mapGetters,mapState,mapMutations} from "vuex"
	export default {
		computed:{
			...mapGetters('m_cart',['total']),
			...mapState('m_cart',['cart']),
			
		},
		data() {
			return {
				options:[{
					text:'删除',
				style:{
					backgroundColor:'#c00000'
				}
				}]
				
			};
		},
		onShow() {
			this.setBadge()
		},
		methods:{
			...mapMutations('m_cart',['updataeGoodsState','removeGoodsById']),
			...mapMutations('m_cart',['updataeGoodsCount']),
			setBadge(){
				uni.setTabBarBadge({
					index:2,
					text:this.total+''
				})
				
			},
			radiochangeHandler(e){
				this.updataeGoodsState(e)
				
			},
			numberchangeHandler(e){
				console.log(e)
				this.updataeGoodsCount(e)
			},
			swipeItemClichHandler(item){
				console.log(item)
				this.removeGoodsById(item.goods_id)
			}
		},
		watch:{
			total() {
				this.setBadge()
			}
		}
		
	}
</script>

<style lang="scss">
	
.cart-title{
	padding-left: 5px;
	background-color: #c00000;
	border-bottom: 1px solid #c00000;
	height: 40px;
	align-items: center;
	display: flex;
	justify-content: space-between;
	.cart-title-text{
		font-size: 14px;
	}
}
.goods-item{
	padding-bottom: 50px;
}
.empty-cart{
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 150px;
	.empty-img{
		width: 90px;
		height: 90px;
	}
	.tip-text{
		font-size: 12px;
		color: gray;
		margin-top: 15px;
		
	}
}
</style>
