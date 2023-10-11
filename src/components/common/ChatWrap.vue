<!-- 容器类组件，负责逻辑处理，得到数据后调用展示类组件 -->
<template>
    <div class="">
        <Chat 
            :msgList="msgList"
            @sendMsg="sendMsg"
        ></Chat>
    </div>
</template>

<script setup lang="ts">
import Chat from './Chat.vue'
import {reactive} from 'vue'

import {SingleChatMessage} from '../../types/interface'
import { MsgDirection } from '../../types/enum';
import { useUserStore} from '../../store/user'
const userStore = useUserStore();

const rawConsultConter = userStore.consultCounter;


/* 订阅要查询的商品 */
userStore.$subscribe((mutation,state)=>{
    console.log(mutation,state);
    /* 点击咨询某个商品 */
    if (state.consultCounter != rawConsultConter){
        msgList.push({
            direction:MsgDirection.Left,
            content:'我想要咨询商品id为'+state.curConsultGoodId+'的商品'
        })
    }
})

let msgList:SingleChatMessage[] = reactive([
    {
        direction:MsgDirection.Right,
        content:'hello world'
    },{
        direction:MsgDirection.Left,
        content:'123',
    } 
])
 

function sendMsg(msg:string){
    console.log('父组件更新msglist',msg);
    let newMsg:SingleChatMessage = {
        direction:MsgDirection.Left,
        content:msg
    }
    msgList.push(newMsg)
    
}

</script>

<style scoped lang="less">

</style>