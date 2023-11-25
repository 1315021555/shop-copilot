import { defineStore} from 'pinia'

export const useUserStore = defineStore('useUserStore',{
    state: ()=>{
        return {
            // 当前用用户名
            username:'',
            // 当前userId
            userId:0,
            // 最新添加的商户id
            lastestMerchantId:0,
            // 当前商户列表
            sessionList:[{
                merchandiseList:{},
                histories:[{}],
                chatSession:{
                    merchantId:0,
                    customerId:0,
                }
            }],
            // 上一次访问的index
            lastViewMerchantIndex:0,
            // 更新ChatWrap组件的标志
            updateHisFlag:0,
            // 当前访问的商铺Index
            curViewMerchantIndex:0,
            /* 当前咨询的商品id */
            consultCounter:0,
            curConsultGoodName:'',
            curGoodDetail:{
                merchandise:{
                    merchandiseName:'',
                    price:0,
                },
                merchandiseCarouselList:[]
            },
        }
    },


    getters:{
        curSessionInfo(state){
            return state.sessionList[state.curViewMerchantIndex]
        },
        chatHistoryList(state){
            return state.sessionList[state.curViewMerchantIndex]?.histories
        }

    },

    actions:{
        updateConsultGoodName(goodName:string){
            this.curConsultGoodName = goodName
            this.consultCounter++;
        }
    }
    
})


/* [
    {
        "chatSession": {
            "id": 20,
            "chatId": null,
            "customerId": 1,
            "merchantId": 7
        },
        "merchant": {
            "id": 7,
            "merchantName": "修起小店",
            "mainCategory": "学生、老师",
            "returnAndExchangeRules": "7天无理由退换货",
            "introduction": "本店主营餐饮一条龙服务，坐落在福州大学学生生活区3区博学苑B区31号楼209室",
            "logisticalArea": "只能发福州大学城范围内",
            "username": "cxqsing",
            "password": "123456",
            "nickname": "一休哥",
            "email": "string",
            "coverUrl": null,
            "initialMsg": "你好，我是帅哥崔修起",
            "botName": "小小修起",
            "chatStyle": "可爱",
            "logisticsSpecifiable": false
        },
        "merchandiseList": [
            {
                "id": 1,
                "merchantId": 7,
                "merchandiseName": "修起炒饭",
                "targeting": "学生、老师",
                "strategy": "买2送1",
                "price": "18.0",
                "description": "非常的新鲜，非常的美味",
                "color": "黄色"
            },
            {
                "id": 2,
                "merchantId": 7,
                "merchandiseName": "修起烧烤",
                "targeting": "学生、老师",
                "strategy": "买2送1",
                "price": "2.0",
                "description": "非常的新鲜，非常的美味",
                "color": "蓝色"
            },
        ],
        "histories": [],
        "carouselList": []
    },
] */