<!-- 展示类组件，负责接收数据并且展示 -->

<template lang="">
    <!-- Prompt Messages Container - Modify the height according to your need -->
    
<div class="flex h-[97vh] w-full flex-col ">
  <!-- Prompt Messages -->
  <div
    ref="msgListDiv"
    class="flex-1 space-y-6 overflow-y-auto rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-300 sm:text-base sm:leading-7"
  >
    <!-- v-for strat -->

      <div
        v-for="(msg,index) in props.msgList"
        :key="index"
        >
        <div
          class="fade-item"
          :class="{
            'flex':true,
            'items-start':msg.direction === 'left',
            'flex-row-reverse':msg.direction === 'right'
          }"
        >
  
          <!-- 客户头像 -->
          <img
            v-if="msg.direction === 'right'"
            class="mr-2 h-10 w-10 rounded-full"
            :class="{
              'mr-2':msg.direction === 'left',
              'ml-2':msg.direction === 'right'
            }"
            src="../../assets/img/logo.png"
            style="background-color: #f9f9f9"
          />
          <!-- 客服头像 -->
          <img
            v-if="msg.direction === 'left'"
            class="mr-2 h-10 w-10 rounded-full"
            :class="{
              'mr-2':msg.direction === 'left',
              'ml-2':msg.direction === 'right'
            }"
            src="../../assets/img/logo.png"
            style="background-color: rgb(246,118,118)"
          />
          <div
            
            class="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 dark:bg-slate-800 sm:max-w-md md:max-w-2xl"
            :class="{
              'dark:bg-slate-500':msg.direction === 'left',
              'dark:bg-slate-1000':msg.direction === 'right'
            }"
          >
          <p>{{msg.content}}</p>
        </div>
  
        <!-- 评价按钮列表 -->
        <div
          class="ml-3 mt-2 flex flex-col-reverse gap-2 text-slate-500 sm:flex-row"
          v-show="msg.direction === 'left'&&(index == msgList.length - 1) && (commonStore.isMsgOver)"
        >
          <button class="hover:text-blue-600" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M8 8m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z"
              ></path>
              <path
                d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"
              ></path>
            </svg>
          </button>
          <button class="hover:text-blue-600" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3"
              ></path>
            </svg>
          </button>
          <button class="hover:text-blue-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"
              ></path>
            </svg>
          </button>
        </div>
        </div>
  
        <el-divider v-if="(index == hisLen-1) && (commonStore.curRole == 'user')">以上为历史数据</el-divider>
      </div>
    <!-- v-for end -->




  </div>

  <!-- Prompt message input -->
  <form class="mt-2"
    v-if="!commonStore.isHistoryOnly"
  >
    <label for="chat-input" class="sr-only">Enter your prompt</label>
    <div class="relative">
      <button
        type="button"
        class="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-600"
      >
        <svg
          aria-hidden="true"
          class="h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          stroke-width="2"
          stroke="currentColor"
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path
            d="M9 2m0 3a3 3 0 0 1 3 -3h0a3 3 0 0 1 3 3v5a3 3 0 0 1 -3 3h0a3 3 0 0 1 -3 -3z"
          ></path>
          <path d="M5 10a7 7 0 0 0 14 0"></path>
          <path d="M8 21l8 0"></path>
          <path d="M12 17l0 4"></path>
        </svg>
        <span class="sr-only">Use voice input</span>
      </button>
      <!-- 输入框 -->
      <textarea
        id="chat-input"
        class="block w-full resize-none rounded-xl border-none bg-slate-200 p-4 pl-10 pr-20 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-slate-900 dark:text-slate-200 dark:placeholder-slate-400 dark:focus:ring-blue-600 sm:text-base"
        placeholder="欢迎光临~ 关于我们的商品有什么想问的呢?"
        
        rows="1"
        v-model="prompt"
        ref="textArea"
        @focus="textareaFocus"
        @blur="textAreaBlur"
        @keydown.enter = "enterdown"
        @keyup.enter = 'enterup'
        required
      ></textarea>
      <button
        class="absolute bottom-2 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:text-base"
        @click.prevent="sendMsg"
      >
        Send <span class="sr-only">Send message</span>
      </button>
    </div>
  </form>
</div>
</template>

<script setup lang="ts">
import { onMounted,ref,nextTick,watch,computed} from 'vue';
import { SingleChatMessage } from '../../types/interface';
import { useUserStore } from '@/store/user';
import { useMerchantStore } from '@/store/merchant';
import { useCommonStore } from '@/store/common';

const userStore = useUserStore()
const merchantStore = useMerchantStore()
const commonStore  = useCommonStore()

/* props */
const props = defineProps<{
  msgList:SingleChatMessage[]
}>()

watch(props.msgList,(v)=>{
  console.log(v);
  nextTick(()=>{
    msgListDiv.value.scrollTop = msgListDiv.value.scrollHeight
  })
},{
  immediate:true
})

watch(computed(()=>userStore.curViewMerchantIndex),()=>{
  if ( commonStore.curRole == 'user'){    
    hisLen.value = userStore.chatHistoryList.length
    console.log(`共有${hisLen}条历史消息`);
  }
})



/* variable */
let prompt = ref('')
let isTextAreaFocus = ref(false)
let hisLen = ref(userStore.chatHistoryList?.length?userStore.chatHistoryList.length:0)

const msgListDiv = ref()

/* life hook */
onMounted(()=>{
  console.log(props.msgList);


})


// 声明触发父组件事件，更新msglist，防止破坏单向数据流
const emit = defineEmits({
  /* 参数验证 */
  sendMsg:(msg)=>{
    if (msg){
      return true
    }else{
      console.warn('Invalid submit event payload!')
      return false
    }
  }
})


function sendMsg(){
  emit('sendMsg',prompt.value)
  prompt.value = ''
  // 控制滚轮到最下面
  
  nextTick(()=>{
    msgListDiv.value.scrollTop = msgListDiv.value.scrollHeight
  })
}

function textareaFocus(){
  console.log('focus');
  isTextAreaFocus.value = true
}

function enterdown(){
  // focus时生效
  if (isTextAreaFocus){
    sendMsg();
  }
}

function enterup(){
  prompt.value = ''
}
function textAreaBlur(){
  console.log('blur');
  isTextAreaFocus.value = false
}



</script>
<style lang="less">


</style>