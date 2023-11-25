<template lang="">
    <div class="shopWrap">
        <!-- 店家信息 -->
        <div class="shopInfo">
            <img :src="userStore.curSessionInfo.merchantInfo.merchant.coverUrl" alt="" class="headPic">
            <p class="shopName">{{userStore.curSessionInfo.merchantInfo.merchant.merchantName}}</p>
        </div>
        <!-- 宣传轮播图 -->
        <div class="advSwiperWrap">
            <div class="swiper">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in userStore.curSessionInfo.merchantInfo.merchantCarouselList" :key="item">
                        <img :src="item.imageUrl" 
                            style="width: 100%; height:100%" alt="" class="advImg">
                    </el-carousel-item>
                </el-carousel>
            </div>
        </div>
        <!-- 商品列表 -->
        <ul 
            v-infinite-scroll="load" 
            class="infinite-list goodsList" 
            style="overflow: auto"
        >
            <li  
                class="goodCard " 
                v-for="(item,index) in userStore.curSessionInfo.merchandiseInfoList" :key="index"
                @click="clickGood(item)"
            >
                <GoodCard :goodInfo="item"></GoodCard>
            </li>
        </ul>


    </div>
</template>
<script setup lang="ts">
import GoodCard from './GoodCard.vue'
import { computed, reactive } from 'vue';
import {useUserStore} from '../../store/user'
import { ElMessage } from 'element-plus';
const userStore = useUserStore();

// 当前访问的商铺

// const curViewMerchantIndex = computed(() => {
//     return userStore.curViewMerchantIndex
// })

// 当前店铺的商品列表
const curViewGoodsList = computed(() => {
    return userStore.sessionList[userStore.curViewMerchantIndex].merchandiseList
})

console.log('当前店铺的商品列表',curViewGoodsList.value);

const emit = defineEmits(['clickGood'])


let swiperList = reactive([
    {
        imgSrc:'https://img2.baidu.com/it/u=2665980585,2843853308&fm=253&fmt=auto&app=138&f=JPEG?w=991&h=283',
    },
    {
        imgSrc:'https://gw.alicdn.com/imgextra/i3/92688455/O1CN01ywm3Ie2CKRce1n8IP_!!92688455.jpg_Q75.jpg_.webp'

    },
    {
        imgSrc:'https://img1.baidu.com/it/u=1609929976,2246542999&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=252'
    },
    {
        imgSrc:'https://img1.baidu.com/it/u=3118177063,3505848824&fm=253&fmt=auto&app=138&f=JPEG?w=522&h=300'
    }
])

const load = ()=>{
    ElMessage({
        message:'没有更多商品了',
        type:'info'
    })
}

const clickGood = (goodInfo:any)=>{
    /* 通知父组件切换路由 */
    emit('clickGood',goodInfo)
    /* 更新store用于商品详情页展示 */
    userStore.curGoodDetail = goodInfo
}



</script>
<style scoped lang="less">
/* ::-webkit-scrollbar{
    display: none
} */
div.shopWrap {
    height: 100%;
  div.shopInfo {
    height: 12%;
    display: flex;
    align-items: center;
    background-color: #fff;
    background-color: #303841;

    img.headPic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #777;
        margin: 20px 0 20px 20px;
        object-fit: cover;
    }

    p.shopName {
        font-size: 22px;
        font-weight: bold;
        margin-left:30px;
        color:white;
    }
  }

  div.advSwiperWrap {
    width: 100%;
    height: 25%;
    div.swiper {
        height: 50%;

        .advImg{
            background-color: pink;
        }
    }

  }

  .goodsList {
    height: 55%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: hidden;
    margin-top:10px;
    .goodCard {
        margin: 20px 25px;
    }
    .goodCard:hover{
        cursor: pointer;
    }
  }
}
</style>