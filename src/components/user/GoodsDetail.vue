<template >
    <div class="goodsDetailWrap">
        <button class="back" @click="router.back()">
            👈返回商店
        </button>

        <div class="goodsDetail">
            <div class="swiper">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in imgList" :key="item" height:auto>
                        <el-image
                            :src="imgList[index]"
                            :zoom-rate="1.2"
                            :preview-src-list="imgList"
                            :initial-index="0"
                            :preview-teleported="true"
                            width="100%"
                            height="100%"
                            fit="fill"
                            />
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="goodInfo">
                <div class="priceWrap">
                    ￥<span class="price">
                        {{userStore.curGoodDetail.merchandise.price}}
                    </span>
                </div>

                <div class="whiteWrap">

                    <div class="goodName">
                        {{userStore.curGoodDetail.merchandise.merchandiseName}}
                    </div>
                    
                    <div class="saled">
                        已售1000+
                    </div>

                    <div class="des" style=" margin-:10px">
                        {{ userStore.curGoodDetail.merchandise.description }}
                    </div>

                </div>

                <div class="otherInfoWrap">
                    <!-- <img src="https://img.alicdn.com/imgextra/i1/653902181/O1CN01zewmmj1RywgOngOjW_!!653902181.jpg" alt=""> -->
                    
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import router from '../../router';
import {useUserStore} from '../../store/user'
const userStore = useUserStore();



const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
/* const srcList = [
  '	https://gw.alicdn.com/imgextra/O1CNA16gU0881RywhuVVPgt_!!653902181-0-psf.jpg_Q75.jpg_.webp',
  'https://gw.alicdn.com/imgextra/i1/653902181/O1CN01gx6E631RywdmSjfAB_!!653902181.jpg_Q75.jpg_.webp',
  'https://gw.alicdn.com/imgextra/i1/653902181/O1CN01YjmZJu1Rywdln0uCr_!!653902181.jpg_Q75.jpg_.webp',
] */

// 商品图片url列表
const imgList = userStore.curGoodDetail.merchandiseCarouselList.map((item: any) => item.imageUrl)


</script>
<style lang="less" scoped>
.goodsDetailWrap {
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    .back{
        position: absolute;
        padding: 10px;
        border-radius: 10px;
        top: 10px;
        left: 10px;
        color:black;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 10;

    }

    .goodsDetail {

        
        .swiper{
            img{
                width: 100%;
                height: 100%;
            }
        }

        .goodInfo{
            margin-top: 30px;

            .priceWrap{
                width: 95%;
                margin: 0 auto;
                padding: 10px;
                background-color: rgb(219, 191, 196);
                border-radius: 20px;
                .price{
                    font-size: 30px;
                    color:rgb(228, 54, 54)
                }
            }

            .whiteWrap{
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 20px;
                padding: 10px;
                margin: 10px;
                .goodName{
                    margin: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    margin-top: 10px;
                }
    
    
                .saled{
                    font-size: 15px;
                    color: #555;
                    margin: 5px;
                }

                
            }
            .otherInfoWrap{
                border-radius: 20px;
                padding: 10px;
                margin: 10px;
                height: 400px;
                box-sizing: border-box; 
                overflow-y: scroll;

                img{

                }
            }
        }
    }


    
}

</style>