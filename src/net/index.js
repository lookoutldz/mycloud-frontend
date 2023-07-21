import axios from "axios"
import {ElMessage} from "element-plus";

const defaultError = (error) => {
    console.log(error)
    ElMessage.error("发生了一些错误，请联系站长！")
}
const defaultFailure = (message) => ElMessage.warning(message)

function post(url, body, content_type, success, failure = defaultFailure, error = defaultError) {
    axios.post(url, body, {
        headers: {
            'Content-Type': content_type,
            'Authorization': localStorage.getItem('jwt')
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
                // token 过期，移除本地 token
                if (response.data.statusCode === 401) {
                    localStorage.removeItem('jwt')
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


function get(url, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('jwt')
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

export {get, post, post_json, post_form}
