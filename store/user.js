export default{
	namespaced:true,
	state:()=>({
		address:JSON.parse(uni.getStorageSync('address')||'{}'),
		token:'',
		userinfo:JSON.parse(uni.getStorageSync('userinfo')||'{}')
	}),
	mutations:{
		updateAddress(state,address) {
			state.address=address
			this.commit('m_user/saveAddressToStorage')
		},
		saveAddressToStorage(state){
			uni.setStorageSync('address',JSON.stringify(state.address))
		},
		upstateInfo(state,userinfo){
			state.userinfo=userinfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state){
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		}
	},
	getters:{	
		addstr(state){
			if(!state.address.provinceName) return ''
		return state.address.provinceName+state.address.cityName+state.address.countyName+state.address.detailInfo
		}
	}
}