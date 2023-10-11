<template lang="">
    <div class="shopWrap">
        <!-- 店家信息 -->
        <div class="shopInfo">
            <img src="../../assets/img/picture.svg" alt="" class="headPic">
            <p class="shopName">XX小店</p>
        </div>
        <!-- 宣传轮播图 -->
        <div class="advSwiperWrap">
            <div class="swiper">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in 6" :key="item">
                        <img src="../../assets/img/picture.svg" alt="" class="advImg">
                        <h3 text="2xl" justify="center">{{ item }}</h3>
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
                class="goodCard" 
                v-for="(item,index) in goodsList" :key="index"
                @click="clickGood(item)"
            >
                <GoodCard :goodInfo="item"></GoodCard>
            </li>
        </ul>


    </div>
</template>
<script setup lang="ts">
import GoodCard from './GoodCard.vue'
import { reactive } from 'vue';

const emit = defineEmits(['clickGood'])

let goodsList = reactive([
    {
        goodId:1,
        goodName:'商品1',
        price:111,

    },
    {
        goodId:2,
    },
    {
        goodId:3,
    },
    {
        goodId:4,
    }
])

const load = ()=>{
    goodsList.push({
        goodId:1,
        goodName:'商品1',
        price:111,

    })
    goodsList.push({
        goodId:1,
        goodName:'商品1',
        price:111,

    })
}

function clickGood(goodInfo:object){
    emit('clickGood',goodInfo)
}

</script>
<style scoped lang="less">
/* ::-webkit-scrollbar{
    display: none
} */
div.shopWrap {
  div.shopInfo {
    height: 100px;
    display: flex;
    align-items: center;
    background-color: #fff;
    img.headPic {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: #777;
        margin: 20px 0 20px 20px;
    }

    p.shopName {
        font-size: 22px;
        font-weight: bold;
        margin-left:30px;
    }
  }

  div.advSwiperWrap {
    width: 100%;
    height: 220px;
    div.swiper {
        height: 100%;
        dis
        .advImg{
            background-color: pink;
        }
    }

  }

  .goodsList {
    height: 450px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .goodCard {
        margin: 20px 25px;
    }
    .goodCard:hover{
        cursor: pointer;
    }
  }
}
</style>