<template>
  <div class="wrap">
      <div class="logo"></div>
      <h1 class="title">ShopCopilot.co</h1>
      <div class="tabs">
        <el-tabs v-model="activeName">
          <!-- ChatBot -->
          <el-tab-pane label="Chatbot" name="first" >
            <div class="chatbot">
              <ChatWrap></ChatWrap>
            </div>
          </el-tab-pane>

          <!-- BotSetting -->
          <el-tab-pane label="BotSetting" name="second">
            <el-tabs tab-position="left" style="height: 200px;" class="leftNav">
              <!-- 预设问答开始 -->
              <el-tab-pane label="预设问答">
                <div class="firstMsgConfig">
                  <el-form label-position="top" label-width="80px" >
                    <p><strong>问候语设置</strong></p>
                    <el-divider></el-divider>
                    <el-form-item >
                      <el-input v-model="presetConfig.hello"></el-input>
                    </el-form-item>
                  </el-form>

                  
                  <!-- 添加自定义问答 -->
                  <p><strong>自定义问答</strong></p>
                  <el-form label-position="top" v-for="(item,index) in presetConfig.presetQaList" :key="item" label-width="80px">
                    <el-divider></el-divider>     
                    
                    <el-form-item :label="'问题'+(index+1)">
                      <el-input v-model="item.Q"></el-input>
                    </el-form-item>

                    <el-form-item :label="'回答'+(index+1)">

                      <el-input v-model="item.A"></el-input>
                    </el-form-item>

                    <el-button class="deleteBtn"
                      type="danger"
                      @click="presetConfig.presetQaList.splice(index,1)">删除</el-button>
                    <el-divider></el-divider>
                  </el-form>
                  
                  <el-button type="primary" @click="addPresetQA">添加</el-button>
                  <button class="finishBtn" @click="showSaveSuccuess">完成</button>
                  
                </div>
              </el-tab-pane>
              <!-- 预设问答结束 -->

              <el-tab-pane label="主题">
                <el-form label-position="top" label-width="80px" :model="chatStyle">
                  <el-form-item label="主题">
                    <el-radio-group v-model="theme">
                      <el-radio label="风格一"></el-radio>
                      <el-radio label="风格二"></el-radio>
                      <el-radio label="风格三"></el-radio>
                    </el-radio-group>
                  </el-form-item>

                </el-form>
                <button class="finishBtn" @click="showSaveSuccuess">完成</button>
              </el-tab-pane>


              <el-tab-pane label="聊天风格">

                <el-form label-position="top" label-width="80px" :model="chatStyle">
                  <el-form-item label="客服名称">
                    <el-input v-model="chatStyle.botName"></el-input>
                  </el-form-item>
                  
                  <el-divider></el-divider>

                  <el-form-item label="聊天风格">
                    <el-radio-group v-model="chatStyle.style">
                      <el-radio label="商务"></el-radio>
                      <el-radio label="温柔"></el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-form>

                <button class="finishBtn" @click="showSaveSuccuess">完成</button>
              </el-tab-pane>

            </el-tabs> 
          </el-tab-pane>
          <!-- ChatHistory -->
          <el-tab-pane label="ChatHistory" name="third">
            <el-tabs tab-position="left" style="height: 200px;" class="leftNav">
              <el-tab-pane label="用户一">
                <ChatWrap></ChatWrap>
              </el-tab-pane>
              <el-tab-pane label="用户二">
                <ChatWrap></ChatWrap>
              </el-tab-pane>
              <el-tab-pane label="用户三">
                <ChatWrap></ChatWrap>
              </el-tab-pane>
            </el-tabs> 
            
          </el-tab-pane>
          <!-- InformationEntry -->
          <el-tab-pane label="InformationEntry" name="fourth">
            <el-tabs tab-position="left" style="height: 200px;" class="leftNav">
              <el-tab-pane label="商家信息">
                <el-form label-position="top" label-width="80px" :model="chatStyle">
                  <el-form-item label="店铺名称">
                    <el-input v-model="shopInfo.shopName"></el-input>
                  </el-form-item>                  
                  <el-form-item label="店铺（品牌）介绍">
                    <el-input v-model="shopInfo.shopDesc"></el-input>
                  </el-form-item>
                  <el-form-item label="主营类别">
                    <el-input v-model="shopInfo.mainType"></el-input>
                  </el-form-item>
                  <el-form-item label="退换货规则">
                    <el-input v-model="shopInfo.saledRule"></el-input>
                  </el-form-item>
                  <el-form-item label="物流">
                    <el-input v-model="shopInfo.logistics"></el-input>
                  </el-form-item>
                </el-form>

                <p><strong>自定义信息</strong></p>
                <el-divider></el-divider>
                <el-form label-position="top" label-width="80px" :model="shopInfo">
                  <el-form-item label="尺码表">
                  </el-form-item>
                  <!-- <el-input v-model="shopInfo.shopDesc"></el-input> -->
                  <el-upload
                    class="upload-demo"
                    drag
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    multiple
                  >
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                      Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                      <div class="el-upload__tip">
                        支持excel
                      </div>
                    </template>
                  </el-upload>
                </el-form>
                <button class="finishBtn" @click="showSaveSuccuess">完成</button>
              </el-tab-pane>

              <el-tab-pane label="商品信息">
                <el-form label-position="top" label-width="80px" v-for="(good,index) in goodsInfo" :key="good" :model="good">
                  商品{{ index+1 }}
                  <el-divider></el-divider>
                  <el-form-item label="商品名称">
                    <el-input v-model="good.goodsName"></el-input>
                  </el-form-item>
                  <el-form-item label="商品描述">
                    <el-input v-model="good.goodsDesc"></el-input>
                  </el-form-item>
                  <el-form-item label="商品图片">
                    <el-upload
                      v-model:file-list="good.imgFileList"
                      class="upload-demo"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :on-preview="handlePreview"
                      :on-remove="handleRemove"
                      list-type="picture"
                    >
                      <el-button type="info" >Click to upload</el-button>
                      <template #tip>
                        <div class="el-upload__tip">
                          jpg/png files with a size less than 500kb
                        </div>
                      </template>
                    </el-upload>
                  </el-form-item>
                  <el-button class="deleteBtn"
                      type="danger"
                      @click="goodsInfo.splice(index,1)">
                      删除商品
                    </el-button>
                  <el-divider></el-divider>
                </el-form>
                <el-button type="primary" @click="goodsInfo.push({
                  

                } as GoodsInfo)">添加商品</el-button>
                <button class="finishBtn" @click="showSaveSuccuess">完成</button>
              </el-tab-pane>
            </el-tabs> 
          </el-tab-pane>
        </el-tabs>
      </div>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile  } from 'element-plus'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'
import { ref,reactive } from 'vue';
import ChatWrap from '../components/common/ChatWrap.vue';


let activeName = ref('first')

/* 预设问答 */
let presetConfig = reactive({
  hello: '',
  presetQaList:[
    {
      Q:'你好',
      A:'hello world'
    },
  
  ]
})

/* 主题 */
let theme = ref('')

/* 聊天风格 */
let chatStyle = reactive({
  botName:'',
  style:''
})


/* 店铺信息 */
let shopInfo = reactive({
  shopName:'',
  mainType:'',
  shopDesc:'',
  saledRule:'',
  logistics:'',

})

/* 商品信息 */
const imgFileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

interface GoodsInfo {
  goodsName:string,
  goodsDesc:string,
  imgFileList:UploadUserFile[]
}

let goodsInfo:GoodsInfo[] = reactive([
  {
    goodsName:'商品名称',
    goodsDesc:'商品描述',
    imgFileList:imgFileList.value

  },

])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePreview: UploadProps['onPreview'] = (file) => {
  console.log(file)
}



function showSaveSuccuess(){
  ElMessage({
    message: '保存成功',
    type: 'success',
  })
}

function addPresetQA(){
  presetConfig.presetQaList.push({
    Q:'',
    A:''
  })
}
</script>

<style scoped lang="less">
.wrap{
  position: relative;
  width: 100%;
  .logo{
    
    margin-left: 50px;
    margin-top:50px;
    background-color: #6666;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  h1.title{
    display: block;
    text-align: center;
    font-size: 30px;
    font-weight: bold;

  }

  .tabs{
    width: 70%;

    margin: 20px 0 0 170px;
    position: relative;
    overflow:visible !important;
    .leftNav{
      height: auto !important;
      /* transform: translateX(-100px); */
      padding-bottom:100px ;
    }

    .chatbot{
      scale: 1;
      margin-left: 150px;
    }

    .deleteBtn{
      margin-left: 90%;
    }

    .finishBtn{
      display: block;
      background-color: #4D989E;
      color:white;
      padding: 8px 25px;
      margin-top: 30px;
      margin-left: 85%;
      
    }
  }
}


</style>