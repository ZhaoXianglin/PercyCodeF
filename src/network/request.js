import axios from 'axios'

export const instance = axios.create({
        baseURL: "http://www.hkbu.asia:8080",
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
