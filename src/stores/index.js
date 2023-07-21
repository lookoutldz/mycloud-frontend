// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            jwt: localStorage.getItem('jwt'), // 初始状态为 null 或从 localStorage 中读取
            isMobile: false,    // 屏幕是否手机/平板
            dpWidth: 0,   // 0: <720p 1: 720p ~
            dpHeight: 0,
        };
    },
    mutations: {
        setJwt(state, jwt) {
            state.jwt = jwt;
        },
        setIsMobile(state, isMobile) {
            state.isMobile = isMobile
        },
        setDpWidth(state, dpWidth) {
            state.dpWidth = dpWidth
        },
        setDpHeight(state, dpHeight) {
            state.dpHeight = dpHeight
        }
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
        setDp({commit}) {
            // 获取设备像素比
            const devicePixelRatio = window.devicePixelRatio || 1;

            // 获取屏幕宽度和高度
            const screenWidth = window.screen.width;
            const screenHeight = window.screen.height;

            // 计算dp值
            const dpWidth = screenWidth / devicePixelRatio;
            const dpHeight = screenHeight / devicePixelRatio;

            console.log(`屏幕px宽度: ${screenWidth}`);
            console.log(`屏幕px高度: ${screenHeight}`);

            const innerWidth = window.innerWidth
            console.log(`innerWidth: ${innerWidth}`)
            // console.log(`屏幕dp宽度: ${dpWidth}`);
            // console.log(`屏幕dp高度: ${dpHeight}`);

            commit('setDpWidth', dpWidth)
            commit('setDpHeight', dpHeight)
        }
    },
});

export default store;
