import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            jwt: localStorage.getItem('jwt'), // 初始状态为 null 或从 localStorage.getItem('jwt') 中读取
            isMobile: false,    // 屏幕是否手机/平板
        };
    },
    mutations: {
        setJwt(state, jwt) {
            state.jwt = jwt;
        },
        setIsMobile(state, isMobile) {
            state.isMobile = isMobile
        },
    },
    actions: {
        handleLoginSuccessForJwt({ commit }, jwt) {
            commit('setJwt', jwt); // 将 jwt 存储到 Vuex 状态
        },
        handleLogoutSuccessForJwt({ commit }) {
            commit('setJwt', null); // 清空 jwt
        },
        setIsMobile({ commit }) {
            // 检测屏幕宽度判断是否是手机设备
            // const isMobile = window.innerWidth < 720; // 根据需求设置阈值
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
            commit('setIsMobile', isMobile);
        },
    },
});

export default store;
