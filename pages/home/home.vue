<template>
	<view>
		<!-- 应用组件 -->
		<view class="search-box">
			<my-search @myclick="gotoSeach"></my-search>
		</view>
		
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
			
		</swiper>
		
		
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key="i" @click="navclickHandler(item)">
				<image :src="item.image_src" ></image>
				
			</view>
		</view>
		
		<!-- 标题 -->
		<view class="floor-list">
			<view class="floor-item" v-for="(item,i) in floorList" :key="i" >
				<image :src="item.floor_title.image_src" ></image>
				<view class="floor-img-box">
					<!-- 左侧大盒子 -->
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix" :style="{width: item.product_list[0].image_width+'rpx'}"></image>
					</navigator>
					<!-- 右边盒子 -->
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(item2,i2) in item.product_list" :key="i2" v-if="i2!==0" :url="item2.url">
							<image :src="item2.image_src" :style="{width: item2.image_width+'rpx'}" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList:[],
				navList:[],
				floorList:[]
				
			};
		},
		onLoad(){
			this.getswiperList(),
			this.getnavList(),
			this.getfloorList()
			
		},
		methods:{
		async getswiperList(){
			const {data:res}=await uni.$http.get('/api/public/v1/home/swiperdata')
			if(res.meta.status!==200){
				return $showMsg()
				}
				this.swiperList=res.message
				uni.$showMsg('数据请求成功')
			
			},
			async getnavList(){
				const {data:res}=await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status!==200){
					return $showMsg()
				}
				this.navList=res.message
				uni.$showMsg('数据请求成功')
				
			},
			async getfloorList(){
				const {data:res}= await uni.$http.get('/api/public/v1/home/floordata')
				console.log(res)
				if(res.meta.status!==200){
					return $showMsg()
				}
				res.message.forEach(floor=>{
					floor.product_list.forEach(prod=>{
						prod.url='/subpkg/goods_list/goods_list?'+prod.navigator_url.split('?')[1]
					})
				})
				this.floorList=res.message
			},
			navclickHandler(item){
				console.log(item.name)
				if(item.name==="分类"){
					uni.switchTab({
						url:"/pages/cate/cate"
					})
				}
			},
			gotoSeach(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
			
		}
	}
</script>

<style lang="scss">
	.search-box{
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999;
	}

swiper{
	height: 330rpx;
	
	.swiper-item,image
	{
		width: 100%;
		height: 100%;
	}
}
.nav-list{
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	image{
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-list{
	.floor-item{
		image{
			width: 100%;
			height: 60rpx;
			
		}
	}
	
}
.floor-img-box{
	display: flex;
	justify-content: space-around;
.right-img-box{
	display: flex;
	justify-content: space-around;
	flex-flow: wrap;
}

}
.floor-list{
	margin: 0 10px;
}
</style>
