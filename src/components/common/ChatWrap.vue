<!-- 容器类组件，负责逻辑处理，得到数据后调用展示类组件 -->
<template>
    <div class="">
        <Chat 
            :msgList="msgList"
            @sendMsg="sendMsg($event,curUserId,curMerchantId)"
        ></Chat>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

import Chat from './Chat.vue'
import {reactive,ref,watch,computed,onBeforeUnmount} from 'vue'

import {SingleChatMessage} from '../../types/interface'
import { MsgDirection } from '../../types/enum';
import { useUserStore} from '../../store/user'
import { useMerchantStore } from '../../store/merchant'
import { UserRequester } from '@/api/api';
import { useCommonStore } from '../../store/common'

const userStore = useUserStore();
const commonStore = useCommonStore();
const merchantStore = useMerchantStore();

// 当前对话的商家id
const curMerchantId = computed(()=>{
    if (commonStore.curRole == 'merchant'){
        return merchantStore.mechantId
    }
    else if(commonStore.curRole == 'user'){
        return userStore.curSessionInfo.chatSession.merchantId
    }
})

// 当前新增会话
let thisTimeChatLog:SingleChatMessage[] = reactive([])

onBeforeUnmount(()=>{
        console.log('beforeunmountbeforeunmountbeforeunmountbeforeunmount');
        // 保存聊天记录
        if (commonStore.curRole == 'user'){        
            thisTimeChatLog.forEach((item:any)=>{
                userStore.sessionList[userStore.lastViewMerchantIndex].histories.push(item)
            })
        }
        else if (commonStore.curRole == 'merchant'){
            console.log('merchant save history');
        }
})

// 当前对话的用户id
const curUserId = computed(()=>{
    if (commonStore.curRole == 'merchant'){
        // 商家端共用的测试账号 id为2
        return 2
    }
    else if(commonStore.curRole == 'user'){
        return userStore.curSessionInfo.chatSession.customerId
    }
})

// 更改成设置默认值的props
const props = defineProps({
    ChatHistory:{
        type:Array,
        default:()=>[]
    }
})


// 咨询某件商品
watch(computed(()=>userStore.curConsultGoodName),(newValue)=>{
    console.log('监听到了');
    sendMsg('我想了解一下关于"'+newValue+'"这件商品的详情',userStore.curSessionInfo.chatSession.customerId,userStore.curSessionInfo.chatSession.merchantId)
})


/* ——————————chat start—————————— */
// 消息列表
let msgList:SingleChatMessage[] = reactive([])
console.log('props',props.ChatHistory);
// 先添加历史消息
props.ChatHistory.forEach((item:any)=>{
    let msgObj:SingleChatMessage = {
        direction: item.role == 'assistant' ? MsgDirection.Left : MsgDirection.Right,
        content:item.content
    }
    msgList.push(msgObj)
})


// 新消息开始

setTimeout(()=>{
    msgList.push( {
        direction:MsgDirection.Left,
        // 到时候改成initialMessage
        content: commonStore.curRole=='merchant'?merchantStore.merchantInfo.initialMsg
        :userStore.curSessionInfo.merchantInfo.merchant.initialMsg
    })
},300)

watch(computed(()=>merchantStore.merchantInfo.initialMsg),(newValue)=>{
    msgList.pop()
    msgList.push( {
    direction:MsgDirection.Left,
    // 到时候改成initialMessage
    content: commonStore.curRole=='merchant'?merchantStore.merchantInfo.initialMsg
    :userStore.curSessionInfo.merchantInfo.merchant.initialMsg
})
})



// 发送新消息
let nextMsg = ref('')
let chatCounter = ref(0)
let lastMsgLen = ref(0) //用于判断是否发送网络错误

function sendMsg(msg:string,userId:any,merchantId:any){
    console.log('父组件更新msglist',msg);
    let newMsg:SingleChatMessage = {
        direction:MsgDirection.Right,
        content:msg
    }
    // 展示用户发送的消息
    msgList.push(newMsg)
    thisTimeChatLog.push(newMsg)
    /* const merchantId = userStore.curSessionInfo.chatSession.merchantId
    const userId = userStore.curSessionInfo.chatSession.customerId */

    // 假装建立连接
    setTimeout(()=>{        
        msgList.push({
            direction:MsgDirection.Left,
            content:'...',
        })
    },300)

    //建立sse连接
    let source = new EventSource(`http://luke.host:10000/chat/?merchantId=${merchantId}&query=${msg}&userId=${userId}`);
    source.onopen = function (event) {
        console.log('open',event);
        commonStore.isMsgOver = false
        msgList.pop()
        chatCounter.value++;
        msgList.push({
            direction:MsgDirection.Left,
            content:'...',
        })
    };
    source.onmessage = function (event) {
        console.log('onmessage',event);
        nextMsg.value += JSON.parse(event.data).content
        lastMsgLen.value  = nextMsg.value.length
        msgList.pop()
        msgList.push({
            direction:MsgDirection.Left,
            content:nextMsg.value+'...'
        })

    };

    source.onerror = function (event) {
        if (lastMsgLen.value <= 5){
            ElMessage({
                message:'网络错误,请重试',
                type:'error'
            })
            lastMsgLen.value = 0
        }
        msgList[msgList.length-1].content = msgList[msgList.length-1].content.slice(0,-3) //取除...
        thisTimeChatLog.push({
            direction:MsgDirection.Right,
            content:msgList[msgList.length-1].content
        })
        commonStore.isMsgOver = true
        console.log('error',event);
        nextMsg.value = ''  // 清空
        source.close();
        console.log('停止!!!!');
    };
/* ——————————chat ebd—————————— */

} 


</script>

<style scoped lang="less">

</style>