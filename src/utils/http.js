import axios from 'axios'
// 开发
const baseURL = "http://localhost:8889/api/private/v1/"
import store from '../store'
import { Message } from 'element-ui'
import router from '../router';
// 线上
// const baseURL = "http://localhost:8889/api/private/v1/"
// const baseURL = "http://localhost:8889/api/private/v1/"
// 自定义实例默认值
const instaA = axios.create({
    baseURL,
    // timeout:30
})
const instaB = axios.create({
    baseURL: "http://baidu.com"
})
// 自动切换接口
// 环境的切换
if (process.env.NODE_ENV == 'development') {
    axios.defaults.baseURL = 'http://localhost:8889/api/private/v1/';
}
else if (process.env.NODE_ENV == 'debug') {
    axios.defaults.baseURL = 'https://www.ceshi.com';
}
else if (process.env.NODE_ENV == 'production') {
    axios.defaults.baseURL = 'https://www.production.com';
}
// ---------------------------------------------------------------------------
// 拦截器
// 添加请求拦截器
instaA.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.authorization = store.state.token

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instaA.interceptors.response.use(res => {
    //  console.log('响应时',res);   
    if (res.status >= 200 && res.status < 300 || res.status == 304) {
        if (res.data.meta.status === 200 || res.data.meta.status === 201) {
            return res.data
        } else {
            Message({
                type: 'error',
                message: res.data.meta.msg
            })
            return Promise.reject(res.data.meta.msg)
        }
    } else {
        Message({
            type: 'error',
            message: res.statusText
        })
        // console.log(res.data.meta.msg);
        if (res.data.meta.msg == '无效token') {
            router.replace({
                name: 'login'
            })
        }
        return Promise.reject(res.statusText)
    }

}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//   ----------------------------------------------
// axios.defaults.headers.common['token'] = 123;
function http(url, data, method, params) {
    return instaA({
        url,
        data,
        params,
        method,
        //  headers:{
        //      token:123
        //  }
    })/* .then(res=>{
        
         if(res.status>=200&&res.status<300||res.status==304){
             if(res.data.meta.status===200){
                 return res.data
             }else{
                 Message({
                     type:'error',
                     message:res.data.meta.msg
                 })
                 return Promise.reject(res.data.meta.msg)
             }
         }else{
             Message({
                 type:'error',
                 message:res.statusText
             })
             return Promise.reject(res.statusText)
         }
     }).catch(err=>{
         return Promise.reject(err)
     }) */
}

export default http