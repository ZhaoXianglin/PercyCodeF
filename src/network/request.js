import axios from 'axios'

export const instance = axios.create({
        baseURL: "http://localhost:5000",
        timeout: 20000,
    })

// 使用方法
//
// request({
//     url: '/home/multidata',
// }).then(res => {
//     console.log(res);
// }).catch(err=>{
//     console.log(err);
// })
