import requests from '../api/config.ts';
import { MerchantInfoModel, UserLogin, UserRegistration } from './reqModel';
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

    // 创建会话
    static CreateSession = (merchantId:number)=>requests({
        url: `/chat/session/merchant/${merchantId}`,
        method: 'get',
    }) as any

    // 获取会话列表
    static GetSessionList = ()=>requests({
        url: `/chat/session/list-by-customer`,
        method: 'get',
    })

    // 聊天
    static Chat = (data:any)=>requests({
        url: `/chat/`,
        method: 'get',
        params:{
            ...data
        }
    })

    // 清楚聊天记录
    static ClearHistory = (sessionId:number)=>requests({
        url: `/chat/session/`,
        method: 'delete',
        params:{
            sessionId:sessionId
        }
    })

    // 更新用户信息
    static UpdateUserInfo = (data:any)=>requests({
        url: `/customer`,
        method: 'put',
        data
    })


}


// 商家端请求
export class MerchantRequester {
    // 登录
    static Login = (data:UserLogin)=>requests({
        url:'/merchant/login',
        method:'post',
        params:{
            ...data
        },
    })

    // 注册
    static Registe = (data:MerchantInfoModel)=>requests({
        url: '/merchant/register',
        method: 'post',
        data:{
            ...data
        }
    })
    // 预设问答
    static SetPreset = (data:any)=>requests({
        url: `/merchant/pre-qa/`,
        method: 'post',
        data
    })

    // 查询预设问答
    static GetPresetById = (data:any)=>requests({
        url: `/merchant/pre-qa/list`,
        method: 'get',
        params:{
            ...data
        }
    })

    // 删除预设问答
    static DeletePreset = (data:any)=>requests({
        url: `/merchant/pre-qa/`,
        method: 'delete',
        params:{
            ...data
        }
    })




    // 更新商家信息
    static UpdateMechantInfo = (data:MerchantInfoModel)=>requests({
        url:`/merchant/`,
        method:'put',
        data
    })

    // 获取商家会话列表
    static GetSessionList = ()=>requests({
        url: `/chat/session/list-by-merchant`,
        method: 'get',
    })

    // 根据ID 获取商家信息
    static GetMerchantInfoById = (data:any)=>requests({
        url:'/merchant/',
        method:'get',
        params:{
            ...data
        }
    })

    // 根据ID 获取商品信息
    static GetProductInfoById = (data:{merchantId:number})=>requests({
        url:'/merchandise/merchantId',
        method:'get',
        params:{
            ...data
        }
    })

    // 获取商品图片
    static GetProductImage = (data:{merchandiseId:number})=>requests({
        url:'merchandise/carousel/list',
        method:'get',
        params:{
            ...data
        }
    })

    // 上传商品图片
    static UploadProductImage = (data:{content:string,base64:string,merchandiseId:number})=>requests({
        url:'merchandise/carousel/',
        method:'post',
        data
    })

    // 上传商品信息
    static UploadProductInfo = (data:any)=>requests({
        url:'/merchandise/',
        method:'post',
        data
    })

    // 删除商品
    static DeleteProduct = (data:any)=>requests({
        url:'/merchandise/',
        method:'delete',
        params:{
            ...data
        }
    })


}






