// module.exports = {
//     devServer: {
//         proxy: {
//             '/apis': {    //将www.exaple.com印射为/apis
//                 target: 'http://localhost:8889/api/private/v1/',  // 接口域名
//                 secure: false,  // 如果是https接口，需要配置这个参数
//                 changeOrigin: true,  //是否跨域
//                 ws: true,
//                 pathRewrite: {
//                     '^/apis': ''   //需要rewrite的,
//                 }
//             }
//         }
//     }

// }
