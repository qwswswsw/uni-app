export default {
	namespaced:true,
	state:()=>({
		cart:JSON.parse(uni.getStorageSync('cart')||'[]')
		
	}),
	mutations:{
		addToCart(state,goods){
			const findResult = state.cart.find(x=>x.goods_id===goods.goods_id)
			console.log(findResult)
			if(!findResult){
			state.cart.push(goods)
			}else{
				findResult.goods_count++
				
			}
			this.commit('m_cart/saveToStorage')
			console.log(state.cart)
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updataeGoodsState(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_state=goods.goods_state
			}
			this.commit('m_cart/saveToStorage')
		},
		updataeGoodsCount(state,goods){
			const findResult=state.cart.find(x=>x.goods_id===goods.goods_id)
			if(findResult){
				findResult.goods_count=goods.goods_count
			}
			this.commit('m_cart/saveToStorage')
		},
		//删除对应商品
		removeGoodsById(state,goods_id){
			state.cart=state.cart.filter(x=>x.goods_id!==goods_id)
			this.commit('m_cart/saveToStorage')
			
		},
		updataAllGoodsState(state,newStare){
			state.cart.forEach(x=>x.goods_state=newStare)
			this.commit('m_cart/saveToStorage')
		}
		
			
	},
	getters :{
		total(state){
			let c=0
			state.cart.forEach(x=>c+=x.goods_count)
			return c
		},
		checkedCout(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count,0)
		},
		checknum(state){
			return state.cart.filter(x=>x.goods_state).reduce((total,item)=>total+=item.goods_count*item.goods_price,0).toFixed(2)
		}
		
	}
}