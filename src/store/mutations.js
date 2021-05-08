import {SET_INFO} from './moustation-type'
export default{
    // login(status,data){
    //     status.name = data.username
    //     status.password = data.password
    //     localStorage.setItem("userlogin",JSON.stringify(data))
        
    // },
    [SET_INFO](state,data){
        // console.log(data);
        // state[data.name] = data.name
        // 第一种方式
        // 这里是一个一个传入的
        // let key = Object.keys(data)[0]
        // state[key] = data[key]
        // localStorage.setItem([key],data[key])
        // 第二种方式
        // 或者这样
      
        for(let key in data){
            state[key] = data[key]
            localStorage.setItem(key,data[key])
        }
    }
}