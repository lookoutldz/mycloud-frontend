import axios from "axios"
import {ElMessage} from "element-plus";
import router from "@/router";
import store from "@/stores";

// 公用请求器
const requester = axios.create({
    baseURL: '/api',
    timeout: 5000
});

// 请求拦截器，用于在请求发送前进行处理
requester.interceptors.request.use(
    (config) => {
        // 在请求发送前进行一些操作
        const jwt = store.state.jwt
        if (jwt) {
            config.headers['Authorization'] = jwt;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    })

// 响应拦截器，用于在收到响应后进行处理
requester.interceptors.response.use(
    (response) => {
        // 在这里对响应进行处理，如果需要的话
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            // 当后端返回401时，清除本地的JWT令牌
            localStorage.removeItem('jwt');
            // 可以根据需要进行其他操作，例如跳转到登录页等
            console.log("response 401")
            return router.push('/login')
        }
        return Promise.reject(error)
    })

// 通用错误处理器
const defaultError = (error) => {
    console.log(error)
    ElMessage.error("发生了一些错误，请联系站长！")
}
const defaultFailure = (message) => ElMessage.warning(message)

// Get
function get(url, success, failure = defaultFailure, error = defaultError) {
    requester.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        withCredentials: true
    }).then(response => {
        // 校验 HTTP 状态码
        if (response.status === 200) {
            success(response)
        } else {
            failure("请求异常, HTTP: " + response.status)
        }
    }).catch(error)
}

// Post
function post(url, body, content_type, success, failure = defaultFailure, error = defaultError) {
    requester.post(url, body, {
        headers: {
            'Content-Type': content_type,
        },
        withCredentials: true,
    }).then(response => {
        // 校验 HTTP 状态码
        if (response.status === 200) {
            if (response.data.statusCode === 200) {
                success(response)
            } else {
                let message = response.data.statusCode + " - " + response.data.statusMessage
                if (typeof response.data.result === "string") {
                    message = message + " : " + response.data.result
                }
                ElMessage.warning(message)
            }
        } else {
            failure("请求异常, HTTP: " + response.status)
        }
    }).catch(error)
}

function post_form(url, body, success, failure = defaultFailure, error = defaultError) {
    post(url, body, 'application/x-www-form-urlencoded', success, failure, error)
}

function post_json(url, body, success, failure = defaultFailure, error = defaultError) {
    post(url, body, 'application/json', success, failure, error)
}


export {get, post, post_json, post_form}
