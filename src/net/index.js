import axios from "axios"
import {ElMessage} from "element-plus";
import ResponseEntity from "@/models/ResponseEntity";

const defaultError = () => ElMessage.error("发生了一些错误，请联系管理员！")
const defaultFailure = (message) => ElMessage.warning(message)

function post(url, data, content_type, success, failure = defaultFailure, error = defaultError) {
    // console.log(axios.defaults.baseURL+url)
    axios.post(url, data, {
        headers: {
            'Content-Type': content_type
        },
        withCredentials: true,
    }).then(({data}) => {
        // console.log(data)
        let resp = new ResponseEntity(data)
        if (resp.statusCode === 100000) {
            success(resp)
        } else {
            failure(resp.statusCode + ' - ' + resp.resultMap.data)
        }
    }).catch(error)
}

function post_form(url, data, success, failure = defaultFailure, error = defaultError) {
    post(url, data, 'application/x-www-form-urlencoded', success, failure, error)
}

function post_json(url, data, success, failure = defaultFailure, error = defaultError) {
    post(url, data, 'application/json', success, failure, error)
}


function get(url, success, failure = defaultFailure, error = defaultError) {
    axios.get(url, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true
    }).then(({data}) => {
        let resp = new ResponseEntity(data)
        if (resp.statusCode === 100000) {
            success(resp)
        } else {
            failure(resp.statusCode + ' - ' + resp.resultMap.data)
        }
    }).catch(error)
}

export {get, post, post_json, post_form}
