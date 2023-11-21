import requests from '../api/config.ts';
import { UserLogin, UserRegistration } from './reqModel';
// 好处：1.严格规范，不容易出错 2.会有代码提示 3.便于统一管理model



// 用户类请求
export class UserRequester {
    
    // 登录
    static Login = (data:UserLogin)=>requests({
        url:'/customer/login',
        method:'post',
        params:{
            ...data
        },
    })

    // 注册
    static Registe = (data:UserRegistration)=>requests({
        url: '/customer/register',
        method: 'post',
        data:{
            ...data
        }
    })
}