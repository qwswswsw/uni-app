<template>
	<view>
		<view class="address-choose-box" v-if="JSON.stringify(address)==='{}'">
			<button type="primary" size="mini" class="btn" @click="chooseAddress">请选择收货地址</button>
		</view>
		<!-- 底部边框 -->
	<!-- 收获信息的盒子 -->
	<view class="address-info-box" v-else @click="chooseAddress">
		<view class="rowl">
			<view class="rowl-left">
				<view class="username">收获人：{{address.userName}}</view>
				</view>
				<view class="rowl-right">
					<view class="phone">电话：{{address.telNumber}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
</view>
			
			<view class="row2">
				<view class="row2-left">
					收获地址：
				</view>
				<view class="row-right">
					{{addstr}}
				</view>
			</view>
		
	</view>
	</view>
</template>

<script>
	import { mapMutations,mapState,mapGetters} from "vuex"
	export default {
		name:"my-address",
		data() {
			return {
				
			};
		},
		computed:{
			...mapState('m_user',['address']),
			...mapGetters('m_user',['addstr'])
			
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			async chooseAddress(){
				const [err,succ]=await uni.chooseAddress().catch(err=>err)
				if(err===null && succ.errMsg==='chooseAddress:ok'){
					this.updateAddress(succ)
					
				}
				
				
				
			}
		}
	}
</script>

<style lang="scss">
.address-choose-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	
	.rowl{
		display: flex;
		justify-content: space-between;
		padding-top: 5px;
		.rowl-left{
			
			
			.username{}
		}
		.rowl-right{
			display: flex;
			justify-content: space-between;
			.phone{}
		}
	}
	.row2{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left{
		white-space: nowrap;
		align-items: center;
			
		}
		.row-right{}
	}
}
</style>