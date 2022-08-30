<template>
	<view>
		<view class="googs-list">
			<view v-for="(goods,i) in goodsList" :key="i" @click="gotoDetail(goods)">
				<my-goods :goods="goods"></my-goods>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				queryObj:{
					query:'',
					cid:'',
					pagenum:1,
					pagesize:10,
					
				},
				goodsList:[],
				total:0,
				truesd:false
				
			};
		},
		onLoad(options) {
			console.log(options)
			this.queryObj.cid=options.cid||''
			this.queryObj.query=options.query||''
			this.getqueryObj()
		},
		methods: {
			async getqueryObj(cd) {
				this.truesd=true
				const{data:res}=await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				if(res.meta.status!==200) return uni.$showMsg()
				this.goodsList=[...res.message.goods,...this.goodsList]
				this.total=res.message.total
				this.truesd=false
				console.log(this.goodsList)
				cd&&cd()
				
			},
			gotoDetail(goods){
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			}
		},
		onReachBottom() {
			if(this.queryObj.pagenum*this.queryObj.pagesize>=this.total) return uni.$showMsg('数据加载完毕')
			if(this.truesd) return
			this.pagenum+=1
			this.getqueryObj()
		},
		onPullDownRefresh() {
			this.total=0,
			this.queryObj.pagenum=1,
			this.goodsList=[],
			this.truesd=false
			this.getqueryObj(()=>uni.stopPullDownRefresh())
			
		}
		
	}
</script>

<style lang="scss">
	
</style>
