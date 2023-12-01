import { defineStore} from 'pinia'
import { MerchantRequester } from '@/api/api'
import { defaultMerchantInfo } from '@/api/reqModel'
import { imageUrlToBase64 } from '@/utils/img.ts'

export const useMerchantStore = defineStore('useMerchantStore',{
    state: ()=>{
        return {
            botConfig:{
                
            },

            /* 当前商家id */
            mechantId:0,
            // 当前商家信息:
            merchantInfo:defaultMerchantInfo, //为什么在getter里面会是Promise？需要在Login里提前请求
            // 当前聊天记录的index
            curHisIndex:0,
            // 会话列表
            sessionList:[{
                merchandiseList:{},
                histories:[{}],
                customer:{
                    username:''
                },
                chatSession:{
                    merchantId:0,
                    customerId:0,
                }
            }],

        }
    },

    getters:{
        curSessionInfo(state){
            return state.sessionList[state.curHisIndex]
        },
        
    },

    actions:{

    }
    
})