<template>
	<view>
		<view class="sreach-box">
			<uni-search-bar  @input="input" :radius="100" :cancelButton="none"></uni-search-bar>
		</view>
		<!-- 搜索列表 -->
		<view class="sugg-list" v-if="searchResults.length!==0">
			<view class="sugg-item" v-for="(item,i) in searchResults" :key="i" @click="clickgetSearchList(item)">
				<view class="goods-name">
					{{item.goods_name}}
				</view>
				<uni-icons type="arrowright" size="16"></uni-icons>
			</view>
		</view>
		<!-- 关键字 -->
		<view class="history-box"  v-else>
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17" @click="deletes"></uni-icons>
			</view>
			
			<view class="history-list" >
				<uni-tag :text="item" v-for="(item,i) in histories" :key="i" @click="gotoGoodsList(item)"></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			this.historyList=JSON.parse(uni.getStorageSync('kw')||'[]')
			
		},
		data() {
			return {
				timer:null,
				kw:'',
				searchResults:[],
				historyList:[]
				
			};
		},
		methods:{
			input(e){
				clearTimeout(this.timer)
				this.timer=setTimeout(()=>{
					console.log(e)
					this.kw=e
					this.timer=null
					this.getSearchList()
					
				},500)
			},
			deletes(){
				this.historyList=[]
				uni.setStorageSync('kw','[]')
				
			},
			async getSearchList(){
				if(this.kw===''){
					this.searchResults=''
				}
				const {data:res}=await uni.$http.get('/api/public/v1/goods/qsearch?query='+this.kw)
				console.log(res)
				if(res.meta.status!==200) return uni.$showMsg
				this.searchResults=res.message
				this.saveSearchHistory()
			},
			clickgetSearchList(item){
				console.log(item)
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+item.goods_id
				})
			},
			saveSearchHistory(){
				 const set=new Set(this.historyList)
				 set.delete(this.kw)
				 set.add(this.kw)
				 this.historyList=Array.from(set)
				 uni.setStorageSync('kw',JSON.stringify(this.historyList))
				 
			},
			gotoGoodsList(kw){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+kw
				})
			}
			
		},
		computed:{
			histories(){
			return [...this.historyList].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.sreach-box{
		position: sticky;
		top: 0;
		left: 0;
		z-index: 999;
	}
	.sugg-list{
		padding: 0 5px;
		
		.sugg-item{
			font-size: 12px;
			padding: 13px 0;
			border-bottom: 1px solid #efefef;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-name{
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				
			}
			
		}
	}
	.history-box{
		padding: 0 5px;
		.history-title{
			display: flex;
			justify-content: space-between;
			height: 40px;
			align-items: center;
			font-size: 13px;
			border-bottom: 1px solid #efefef;
		}
		.history-list{
			display: flex;
			flex-flow: wrap;
			uni-tag{
				margin-top: 5px;
				margin-right: 5px;
			}
			
		}
	}
	

</style>
