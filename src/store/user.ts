import { defineStore} from 'pinia'

export const useUserStore = defineStore('useUserStore',{
    state: ()=>{
        return {
            /* 当前咨询的商品id */
            consultCounter:0,
            curConsultGoodId:0,

        }
    },

    getters:{

    },

    actions:{
        updateConsultGoodId(id:number){
            this.curConsultGoodId = id
            this.consultCounter++;
        }
    }
    
})