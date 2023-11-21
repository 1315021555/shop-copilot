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
import {reactive,ref} from 'vue'

import {SingleChatMessage} from '../../types/interface'
import { MsgDirection } from '../../types/enum';
import { useUserStore} from '../../store/user'
const userStore = useUserStore();

const rawConsultConter = userStore.consultCounter;



let presetMsgList = reactive([
    '在的亲，我是智能电商客服懂宝，24小时都在线的噢',
    '亲亲我们店的主营类别是体育运动用品',
    '默认发顺丰快递噢',
    '您咨询的李宁男士t恤有黑色、白色、蓝色',
    '价格没有区别',
    '根据我们店的尺码表，推荐您穿L码',
    '我们的退换货规则是:七天无理由退款，十五天无理由换货',
])

let presetMsgIndex = ref(0);

/* 订阅要查询的商品 */
userStore.$subscribe((mutation,state)=>{
    console.log(mutation,state);
    /* 点击咨询某个商品 */
    if (state.consultCounter != rawConsultConter){
        msgList.push({
            direction:MsgDirection.Right,
            content:'我想了解一下关于"'+state.curConsultGoodName+'"的详情',
        })

        setTimeout(()=>{
            msgList.push({
                direction:MsgDirection.Left,
                content:'好的，你想咨询关于这件商品的什么呢亲亲？',
            })
        },500)
    }
})

let msgList:SingleChatMessage[] = reactive([
    {
        direction:MsgDirection.Left,
        content:'欢迎光临，我是智能客服懂宝，请问有什么可以帮助您的？'
    }
])
 

function sendMsg(msg:string){
    console.log('父组件更新msglist',msg);
    let newMsg:SingleChatMessage = {
        direction:MsgDirection.Right,
        content:msg
    }
    msgList.push(newMsg)
    /* 固定数据模拟对话 */
    msgList.push({
        direction:MsgDirection.Left,
        content:'...'
    })
    setTimeout(()=>{
        // 去掉最后一个元素
        msgList.pop();
        msgList.push({
            direction:MsgDirection.Left,
            content:presetMsgList[presetMsgIndex.value++],
        })
    },700)
}

</script>

<style scoped lang="less">

</style>