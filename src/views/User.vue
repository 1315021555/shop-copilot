<template>

<div class="wrap">
    <div class="sideBar">
        <img class="logo" src="../assets/img/logo.png">
            

        <div class="navList">
            <div 
                class="navItem"
                v-for="(item,index) in (sessionList as any)" :key="index" 
                @click="clickNavItem(item,index)"
                :class="{active:activeNavIndex===index}"
                >

                <img :src="item.merchantInfo.merchant.coverUrl">
                <p>{{item.merchantInfo.merchant.merchantName}}</p>
                <el-button 
                    @click="clearHistory(item.chatSession.id)"
                    class="clearHistory" 
                    type="danger" 
                    :icon="Delete">
                </el-button>
            </div>

            <el-button type="danger" class="exitBtn" @click="exit">退出登录</el-button>
        </div>
    </div>

    <div class="profile">
        <!-- <ShopAbout @clickGood="clickGood"></ShopAbout> -->
        <router-view 
            @clickGood="clickGood">
        </router-view>
    </div> 

    <div class="chatWrap">
        <ChatWrap
            :ChatHistory="userStore.chatHistoryList"
            :key="userStore.curViewMerchantIndex+userStore.updateHisFlag"
        >
        </ChatWrap>
    </div>
</div>



</template>

<script setup lang="ts">

/* 引入 */
import { ref,reactive, onMounted, computed } from 'vue'
import ChatWrap from '../components/common/ChatWrap.vue'
import {getAssetsFile} from '../utils/pub-use'

import { useMain } from '../store/index'

import router from '../router'
import { RouteParamsRaw } from 'vue-router'
import { useUserStore } from '@/store/user'
import {UserRequester} from '@/api/api'

import {
    Delete,
} from '@element-plus/icons-vue'
import { ElDialog, ElMessage, ElMessageBox } from 'element-plus'


const userStore = useUserStore();

const sessionList = computed(()=>{
    return userStore.sessionList
})

onMounted(()=>{
    // active设置为最新添加的商户
    userStore.sessionList.forEach((item:any,index)=>{
        if (item.chatSession.merchantId == userStore.lastestMerchantId){
            activeNavIndex.value = index
        }
    })
    console.log('会话列表',userStore.sessionList);
})



/* pinia */
const useStoreMain = useMain()


/* 导航active */
let activeNavIndex = ref(0)


function clearHistory(sessionId:any){
    ElMessageBox.confirm(
        '是否要清楚该会话记录?',
        'Warning',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
        )
        .then(() => {
            UserRequester.ClearHistory(sessionId).then(async (res)=>{
                // 重新获取会话列表
                let newSessionList:any = await UserRequester.GetSessionList();
                userStore.sessionList.splice(0,userStore.sessionList.length,...newSessionList)
                userStore.updateHisFlag++;
                console.log('清除会话成功',res);
                ElMessage({
                    message:'清除会话记录成功',
                    type:'success'
                })
            }).catch((err)=>{
                console.log('清除会话失败',err);
                ElMessage({
                    message:'清除会话记录失败',
                    type:'error'
                })
            })
        })
        .catch(() => {
            ElMessage({
            type: 'info',
            message: '取消删除',
            })
    })

}

function clickNavItem(_item:any,index:number){
    /* 先保存当前会话的聊天记录 */
    userStore.lastViewMerchantIndex = activeNavIndex.value
    activeNavIndex.value = index;
    // 更新pinia，更新商户界面
    userStore.curViewMerchantIndex = index
    router.push({
        name:'shopAbout'
    })
}

function clickGood(goodInfo:object){
    console.log('父组件收到clickGood',goodInfo);
    
    /* 跳转路由 */
    router.push({ 
        name:'goodsDetail',
    })
}

function exit(){
    location.replace('/')
}
</script>


<style scoped lang="less">
div.wrap {
    width: 100%;
    height: 100%;
    display: flex;
    
    
    div.sideBar {
        width: 230px;
        background-color: #36404A;
        position: relative;
        
        .logo {
            width: 90px;
            height: 90px;
            background-color: #666;
            background-color: white;
            border-radius: 50%;
            margin: 50px auto ;
        }

        .navList{
            height: 65%;
            overflow: auto;
            .navItem{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                color:white;
                padding: 0px 0 0 15px;
                img{
                    width:40px;
                    height: 40px;
                }
                p{
                    width: 50%;
                    white-space: nowrap; // 强制一行
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-left: 20px;
                }

                .clearHistory{
                    margin-left: 10px;
                }
            }

            .active{
                background-color: #2d373f;
            }

        }
        .exitBtn{
            position: absolute;
            bottom:4%;
            width: 100%;
            height: auto;
            margin: 0 auto;
        }
    }

    div.profile {
        width:500px;
        background-color: #303841;
    }

    div.chatWrap {
        flex:1;
        background-color: #262E35;
    }
}
</style>