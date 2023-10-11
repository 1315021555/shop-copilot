<template>
<div class="goodCardWrap">
    <img src="../../assets/img/picture.svg" alt="" class="pic">
    <div class="info">
        <p class="name">{{ props.goodInfo.goodName }}</p>
        ￥<span class="price">{{ goodInfo.price }}</span>
        <span class="saledNum">已售1000+</span>
        <el-tooltip content="咨询此商品" placement="top">
            <img @click.stop="consultGood" class="consult" src="../../assets/img/consult.svg" alt="">
        </el-tooltip>
        
    </div>
</div>
</template>

<script setup lang="ts">

import { ref,reactive } from 'vue'
import {useUserStore} from '../..//store/user'

const props = defineProps(['goodInfo'])


const userStore = useUserStore();

// 询问商品
function consultGood(){
    userStore.updateConsultGoodId(props.goodInfo.goodId)
}

</script>

<style scoped lang="less">
div.goodCardWrap {
    width: 180px;
    height: 240px;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    
  img.pic {
    display: block;
    width: 100%;
    height: 67%;
    // background-color: pink;
    box-sizing: border-box;
  }

  div.info {
    height: 33%;
    margin-top: 0px;
    padding: 5px;
    position: relative;
    p.name {
        font-size: 16px;


    }

    .price {
        color: rgb(241, 37, 37);
        font-weight: bold;
        font-size: 18px;
    }

    .saledNum {
        font-size: 13px;
        color:#777;
        margin-left: 10px;
    }

    .consult{
        width: 25px;
        height: 25px;
        position: absolute;
        right: 15px;
        bottom: 10px;
    }
  }
}
</style>