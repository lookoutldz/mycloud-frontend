import axios from "axios"
import {ElMessage} from "element-plus";
import ResponseEntity from "@/models/ResponseEntity";

const defaultError = () => ElMessage.error("发生了一些错误，请联系管理员！")
const defaultFailure = (message) => ElMessage.warning(message)

function post(url, body, content_type, success, failure = defaultFailure, error = defaultError) {
    axios.post(url, body, {
        headers: {
            'Content-Type': content_type,
            'Authorization': localStorage.getItem('jwt')
        },
        withCredentials: true,
    }).then(response => {
        let responseData = response.data
        // console.log(responseData)
        let responseEntity = new ResponseEntity(responseData)
        if (responseEntity.statusCode === 100000) {
            if (url === '/auth/login') {
                let jwt = response.headers['Authorization']
                if (jwt) {
                    localStorage.setItem('jwt', jwt)
                }
            }
            success(responseEntity)
        } else {
            failure(responseEntity.statusCode + ' - ' + responseEntity.resultMap.data)
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
        let responseData = response.data
        let responseEntity = new ResponseEntity(responseData)
        if (responseEntity.statusCode === 100000) {
            success(responseEntity)
        } else {
            failure(responseEntity.statusCode + ' - ' + responseEntity.resultMap.data)
        }
    }).catch(error)
}

export {get, post, post_json, post_form}
