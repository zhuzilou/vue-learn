import types from '../types.js'
import axios from 'axios'

/**
 * 数据对象状态
 */
const state = {
    seller: {},
    detailShow: false
}

/**
 * 对外提供获取数据的getter方法
 */
const getters = {
    seller(state) {
        return state.seller;
    },
    detailShow(state) {
        return state.detailShow;       
    }
}

/**
 * 执行获取数据的动作
 */
const actions = {
    getSeller({commit, state}) {
        axios.get('/api/seller')
        .then(resp => {
            // console.log(resp);
            //resp.data对应webpack.dev.conf.js中定义的api对象
            if(resp.data.errno == 0) {
                commit(types.GET_SELLER, resp.data.data);
            } else {
                console.log('获取seller失败');
            }
            
        });
    },
    showDetail({commit}){
        // console.log('showDetail');
        commit(types.SHOW_DETAIL);
    },
    hideDetail({commit}){
        commit(types.HIDE_DETAIL);
    }
}

/**
 * 对数据状态进行改变
 */
const mutations = {
    //对应commit(types.GET_SELLER, resp.data.data
    [types.GET_SELLER](state, data) {
        state.seller = data;
    },
    [types.SHOW_DETAIL](state) {
        state.detailShow = true;
    },
    [types.HIDE_DETAIL](state) {
        state.detailShow = false;
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}