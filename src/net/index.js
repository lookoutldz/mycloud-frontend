import axios from "axios"
import {ElMessage} from "element-plus";
import ResponseEntity from "@/models/ResponseEntity";

const defaultError = () => ElMessage.error("发生了一些错误，请联系管理员！")
const defaultFailure = (message) => ElMessage.warning(message)

function post(url, data, success, failure = defaultFailure, error = defaultError) {
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
    }).then(({data}) => {
        // console.log(axios.defaults.baseURL+url)
        // console.log(data)
        let resp = new ResponseEntity(data)
        if (resp.statusCode === 100000) {
            success(resp)
        } else {
            failure(resp.statusCode + ' - ' + resp.resultMap.data)
        }
    }).catch(error)
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

export {get, post}