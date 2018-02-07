import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    sysUserName: null,
    sysUserAvatar: null
}

// 定义所需的 mutations
const mutations = {
    USERNAME(state,username) {
        //state.count++
        state.sysUserName = username;
    },
    USERAVATAR(state,useravatar) {
        // state.count--
        state.sysUserAvatar = useravatar;
    }
}

// 创建 store 实例
export default new Vuex.Store({
    // actions,
    // getters,
    state,
    mutations
})