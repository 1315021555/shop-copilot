<template >
    <div class="goodsDetailWrap">
        <button class="back" @click="router.back()">
            👈返回商店
        </button>

        <div class="goodsDetail">
            <div class="swiper">
                <el-carousel indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in srcList" :key="item">
                        <el-image
                            :src="item"
                            :zoom-rate="1.2"
                            :preview-src-list="srcList"
                            :initial-index="0"
                            :preview-teleported="true"
                            />
                    </el-carousel-item>
                </el-carousel>
            </div>

            <div class="goodInfo">
                <div class="priceWrap">
                    ￥<span class="price">158</span>
                </div>

                <div class="whiteWrap">

                    <div class="goodName">
                        商品名称商品名称商品名称商品名称商品名称商品名称商品名称商品名称
                    </div>
                    
                    <div class="saled">
                        已售1000+
                    </div>

                </div>

                <div class="otherInfoWrap">
                    其他信息，如尺码表
                </div>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import router from '../../router';

const url =
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg'
const srcList = [
  'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
  'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
  'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
  'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
  'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
  'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
  'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg',
]

</script>
<style lang="less" scoped>
.goodsDetailWrap {
    position: relative;
    .back{
        position: absolute;
        padding: 10px;
        border-radius: 10px;
        top: 10px;
        left: 10px;
        color:white;
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
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 20px;
                padding: 10px;
                margin: 10px;
                box-sizing: border-box;
            }
        }
    }


    
}

</style>