import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => new Vuex.Store({
    state: {
        userInfo: {},
        isLogin:false,
        showHeader:false,
        activeClass:''
    },
    mutations:{
        changeLoginInfo(state,userInfo){
            if(userInfo._id){
                state.userInfo = userInfo
                state.isLogin = true;
            }else{
                state.userInfo = {};
                state.isLogin = false;
            }
        },
        changeActiveClass(state,activeClass){
            state.activeClass = activeClass;
        },
        changeHeader(state,flag){
            state.showHeader = flag;
        }
    },
    actions: {
        login({commit}){
            console.dir(this.$axios)
            this.$axios({
                type:'GET',
                url:'/get_user_info'
            }).then(res => {
                let data = {};
                if(res.data.code === 200){
                    data = res.data.data;
                }
                commit('changeLoginInfo',data);
            })
        }
    }
})

export default store