<template lang="">
    <div class="shopWrap">
        <!-- 店家信息 -->
        <div class="shopInfo">
            <img src="https://img0.baidu.com/it/u=1426957999,1893315538&fm=253&fmt=auto&app=138&f=JPEG?w=591&h=362" alt="" class="headPic">
            <p class="shopName">李宁 LI-NING</p>
        </div>
        <!-- 宣传轮播图 -->
        <div class="advSwiperWrap">
            <div class="swiper">
                <el-carousel :interval="4000" type="card" height="200px">
                    <el-carousel-item v-for="item in swiperList" :key="item">
                        <img :src="item.imgSrc" 
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
import {useUserStore} from '../../store/user'
const userStore = useUserStore();

const emit = defineEmits(['clickGood'])

let goodsList = reactive([
    {
        goodId:1,
        goodName:'李宁速干男t恤运动短袖男款跑步速干衣男士运动上衣夏季冰丝半恤',
        price:129,
        coverImgUrl:'https://gw.alicdn.com/imgextra/O1CNA16gU0881RywhuVVPgt_!!653902181-0-psf.jpg_Q75.jpg_.webp',
        saled:'4000'

    },
    {
        goodId:2,
        goodName:'李宁运动短袖速干T恤女夏季瑜伽上衣跑步训练健身服圆领修身大码',
        price:79,
        coverImgUrl:'https://gw.alicdn.com/imgextra/i3/653902181/O1CN01B80EZw1RyweIMVsfV_!!0-item_pic.jpg_Q75.jpg_.webp',
        saled:'2000'
    },
    {
        goodId:3,
        goodName:'李宁卫裤运动短裤夏季男潮流新款跑步休闲百搭宽松直筒黑色五分裤',
        price:89,
        coverImgUrl:'https://gw.alicdn.com/imgextra/i4/653902181/O1CN01UqLp631RywZlO24LU_!!0-item_pic.jpg_Q75.jpg_.webp',
        saled:'1000'
    },
    {
        goodId:4,
        goodName:'李宁弹力带健身男【高弹力拉伸】阻力带力量训练腿部拉力带弹力圈',
        price:29,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i4/653902181/O1CN01ocjjgY1RywaBg5RNZ_!!0-item_pic.jpg_240x240.jpg',
        saled:'1000'
    },
    {
        goodId:5,
        goodName:'李宁导汗带 汗不进眼 运动细头带止汗发带男跑步马拉松健身硅胶女',
        price:15,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i1/653902181/O1CN01eoUCcF1RywVoEWb1g_!!0-item_pic.jpg_240x240.jpg',
        saled:'4000'

    },
    {
        goodId:6,
        goodName:'李宁运动套装男跑步短袖短裤夏装速干男士休闲运动服爸爸套装夏',
        price:108,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i4/653902181/O1CN01CK55Rb1RywdU9wKvf_!!0-item_pic.jpg_240x240.jpg',
        saled:'2000'
    },
    {
        goodId:1,
        goodName:'李宁速干男t恤运动短袖男款跑步速干衣男士运动上衣夏季冰丝半恤',
        price:129,
        coverImgUrl:'https://gw.alicdn.com/imgextra/O1CNA16gU0881RywhuVVPgt_!!653902181-0-psf.jpg_Q75.jpg_.webp',
        saled:'4000'

    },
    {
        goodId:2,
        goodName:'李宁运动短袖速干T恤女夏季瑜伽上衣跑步训练健身服圆领修身大码',
        price:79,
        coverImgUrl:'https://gw.alicdn.com/imgextra/i3/653902181/O1CN01B80EZw1RyweIMVsfV_!!0-item_pic.jpg_Q75.jpg_.webp',
        saled:'2000'
    },
    {
        goodId:3,
        goodName:'李宁卫裤运动短裤夏季男潮流新款跑步休闲百搭宽松直筒黑色五分裤',
        price:89,
        coverImgUrl:'https://gw.alicdn.com/imgextra/i4/653902181/O1CN01UqLp631RywZlO24LU_!!0-item_pic.jpg_Q75.jpg_.webp',
        saled:'1000'
    },
    {
        goodId:4,
        goodName:'李宁弹力带健身男【高弹力拉伸】阻力带力量训练腿部拉力带弹力圈',
        price:29,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i4/653902181/O1CN01ocjjgY1RywaBg5RNZ_!!0-item_pic.jpg_240x240.jpg',
        saled:'1000'
    },
    {
        goodId:5,
        goodName:'李宁导汗带 汗不进眼 运动细头带止汗发带男跑步马拉松健身硅胶女',
        price:15,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i1/653902181/O1CN01eoUCcF1RywVoEWb1g_!!0-item_pic.jpg_240x240.jpg',
        saled:'4000'

    },
    {
        goodId:6,
        goodName:'李宁运动套装男跑步短袖短裤夏装速干男士休闲运动服爸爸套装夏',
        price:108,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i4/653902181/O1CN01CK55Rb1RywdU9wKvf_!!0-item_pic.jpg_240x240.jpg',
        saled:'2000'
    },
])

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
    goodsList.push({
        goodId:2,
        goodName:'李宁运动短袖速干T恤女夏季瑜伽上衣跑步训练健身服圆领修身大码',
        price:79,
        coverImgUrl:'https://gw.alicdn.com/imgextra/i3/653902181/O1CN01B80EZw1RyweIMVsfV_!!0-item_pic.jpg_Q75.jpg_.webp',
        saled:'2000'

    })
    goodsList.push({
        goodId:4,
        goodName:'李宁弹力带健身男【高弹力拉伸】阻力带力量训练腿部拉力带弹力圈',
        price:29,
        coverImgUrl:'https://img.alicdn.com/bao/uploaded/i4/653902181/O1CN01ocjjgY1RywaBg5RNZ_!!0-item_pic.jpg_240x240.jpg',
        saled:'1000'

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
  div.shopInfo {
    height: 100px;
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
    height: 220px;
    div.swiper {
        height: 50%;

        .advImg{
            background-color: pink;
        }
    }

  }

  .goodsList {
    height: 670px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    overflow-y: hidden;
    .goodCard {
        margin: 20px 25px;
    }
    .goodCard:hover{
        cursor: pointer;
    }
  }
}
</style>