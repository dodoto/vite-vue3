import { createStore } from 'vuex'

const testPlugin = (store) => {
  store.subscribe((mutations,state) => {
    console.log('test',mutations,state)
  }) 
}

export default createStore({
  state: () => ({
    globalLoading: false
  }),
  mutations: {
    beginLoading(state) {
      state.globalLoading = true
    },
    endLoading(state) {
      state.globalLoading = false
    }
  },
  actions: {
    _beginLoading(ctx) {
      ctx.commit('beginLoading')
    },
    _endLoading(ctx) {
      ctx.commit('endLoading')
    }
  },
  // plugins: [testPlugin]
})