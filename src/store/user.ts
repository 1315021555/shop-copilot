import { defineStore} from 'pinia'

export const useUserStore = defineStore('useUserStore',{
    state: ()=>{
        return {
            /* 当前咨询的商品id */
            consultCounter:0,
            curConsultGoodName:'',
            curGoodDetail:{},
        }
    },

    getters:{

    },

    actions:{
        updateConsultGoodName(goodName:string){
            this.curConsultGoodName = goodName
            this.consultCounter++;
        }
    }
    
})