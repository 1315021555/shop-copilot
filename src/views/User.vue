<template>

<div class="wrap">
    <div class="sideBar">
        <img class="logo" src="../assets/img/logo.png">
            

        <div class="navList">
            <div 
                class="navItem"
                v-for="(item,index) in chatList" :key="index" 
                @click="clickNavItem(item,index)"
                :class="{active:activeNavIndex===index}"
                >
                
                <img :src="item.headPicUrl" alt="">
                <p>{{item.shopName}}</p>
            </div>
           
        </div>
    </div>
 
    <div class="profile">
        <!-- <ShopAbout @clickGood="clickGood"></ShopAbout> -->
        <router-view @clickGood="clickGood"></router-view>
    </div> 

    <div class="chatWrap">
        <ChatWrap></ChatWrap>
    </div>
</div>



</template>

<script setup lang="ts">

/* 引入 */
import { ref,reactive } from 'vue'
import ChatWrap from '../components/common/ChatWrap.vue'
import {getAssetsFile} from '../utils/pub-use'

import { useMain } from '../store/index'

import router from '../router'
import { RouteParamsRaw } from 'vue-router'




/* pinia */
const useStoreMain = useMain()

/* 导航列表 */
/* let navList = reactive([
    {
        title:'商品详情',
        imgSrc:getAssetsFile('picture.svg') 
    },
    {
        title:'关于商家',
        imgSrc:getAssetsFile('shop.svg') 
    },
    {
        title:useStoreMain.count,
        imgSrc:getAssetsFile('picture.svg')
    }
    
]) */

/* 商家列表 */
let chatList = reactive([
    {
        headPicUrl:'https://img0.baidu.com/it/u=1426957999,1893315538&fm=253&fmt=auto&app=138&f=JPEG?w=591&h=362',
        shopName:'李宁 LI-NING'
    },
    {
        headPicUrl:'https://img0.baidu.com/it/u=1670206633,2376460977&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=352',
        shopName:'安踏'
    },
    {
        headPicUrl:'https://img1.baidu.com/it/u=151839232,2450048441&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
        shopName:'华为'
    }
])

/* 导航active */
let activeNavIndex = ref(0)


function clickNavItem(_item:any,index:number){
    activeNavIndex.value = index;
    
}

function clickGood(goodInfo:object){
    console.log('父组件收到clickGood',goodInfo);
    /* 跳转路由 */
    router.push({ 
        name:'goodsDetail',

    })
}
</script>


<style scoped lang="less">
div.wrap {
    width: 100%;
    height: 100%;
    display: flex;
    
    
    div.sideBar {
        width: 200px;
        background-color: #36404A;
        
        .logo {
            width: 90px;
            height: 90px;
            background-color: #666;
            border-radius: 50%;
            margin: 50px auto ;
        }

        .navList{
            .navItem{
                width: 100%;
                height: 80px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                color:white;
                padding: 0px 0 0 15px;
                img{
                    width:40px;
                    height: 40px;
                }
                p{
                    margin-left: 20px;
                }
            }

            .active{
                background-color: #2d373f;
            }
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