<template>
	<view class="login-container"> 
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<button type="primary" class="btn-login" open-type="getUserInfo" @getuserinfo="getUserInfo">一键登录</button>
		<view class="tips-text">
			登录后享受更多权益
		</view>
	</view>
</template>

<script>
	import { mapMutations } from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['upstateInfo']),
			getUserInfo(e){
				console.log(e)
				if(e.detail.errMsg==='getUserInfo:fail auth deny') return uni.$showMsg('您取消了登录授权')
				console.log(e.detail.userInfo)
				this.upstateInfo(e.detail.userInfo)
				this.getToken(e.detail)
			},
			async getToken(info){
				
			const [err,res]= await uni.login().catch(err=>err)
			
			if(err||res.errMsg!=='login:ok') return uni.$showMsg('登陆失败！')
			console.log(res.code)
			console.log(info)
			
			const query={
				code:res.code,
				encryptedData:info.encryptedData,
				iv:info.iv,
				rawData:info.rawData,
				signature:info.signature
			    }
			const {data:loginResult}=await uni.$http.post('/api/public/v1/users/wxlogin',query)
			if(loginResult.meta.status!==200) return uni.$showMsg('登陆失败！')
			uni.$showMsg('登陆成功')
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 750rpx;
	background-color: #f8f8f8;
	
	
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>