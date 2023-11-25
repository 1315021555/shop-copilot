<template>
  <div class="wrap">
    <div class="accountBox">
      <img src="../assets/img/logo.png" alt="" style="width: 60px; height: 60px">
      <span>欢迎回来，{{ merchantInfo.merchantName }}</span>
      <el-button type="danger" class="exitBtn" @click="logout"
        >退出登录
      </el-button>
    </div>
    <div class="banner">
      <img src="../assets/img/logo.png" class="logo" />
      <h1 class="title">ShopCopilot.co</h1>
    </div>
    <div class="tabs">
      <el-tabs v-model="activeName">
        <!-- ChatBot -->
        <el-tab-pane label="聊天测试" name="first">
          <div class="chatbot">
            <ChatWrap></ChatWrap>
          </div>
        </el-tab-pane>

        <!-- BotSetting -->
        <el-tab-pane label="客服设置" name="second">
          <el-tabs tab-position="left" style="height: 200px" class="leftNav">
            <!-- 预设问答开始 -->
            <el-tab-pane label="预设问答">
              <div class="firstMsgConfig">
                <el-form label-position="top" label-width="80px">
                  <p><strong>问候语设置</strong></p>
                  <el-divider></el-divider>
                  <el-form-item>
                    <el-input v-model="presetConfig.hello"></el-input>
                  </el-form-item>
                </el-form>

                <!-- 添加自定义问答 -->
                <p><strong>自定义问答</strong></p>
                <el-form
                  label-position="top"
                  v-for="(item, index) in presetConfig.presetQaList"
                  :key="item"
                  label-width="80px"
                >
                  <el-divider></el-divider>

                  <el-form-item :label="'问题' + (index + 1)">
                    <el-input v-model="item.Q"></el-input>
                  </el-form-item>

                  <el-form-item :label="'回答' + (index + 1)">
                    <el-input v-model="item.A"></el-input>
                  </el-form-item>

                  <el-button
                    class="deleteBtn"
                    type="danger"
                    @click="deletePresetQA(index)"
                    >删除</el-button
                  >
                  <el-divider></el-divider>
                </el-form>

                <el-button type="primary" @click="addPresetQA">添加</el-button>
                <button class="finishBtn" @click="setPreset_Init">
                  完成
                </button>
              </div>
            </el-tab-pane>
            <!-- 预设问答结束 -->

            <!--     <el-tab-pane label="主题">
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
 -->

            <el-tab-pane label="聊天风格">
              <el-form
                label-position="top"
                label-width="80px"
                :model="chatStyle"
              >
                <el-form-item label="客服名称">
                  <el-input v-model="chatStyle.botName"></el-input>
                </el-form-item>

                <el-divider></el-divider>

                <el-form-item label="聊天风格（ 如：温柔、商务等 ）">
                  <el-radio-group v-model="chatStyle.style">
 <!--                    <el-radio label="商务"></el-radio>
                    <el-radio label="温柔"></el-radio>
                    <el-radio :label="chatStyle.style"></el-radio> -->
                  </el-radio-group>
                  <el-input v-model="chatStyle.style"></el-input>
                </el-form-item>
              </el-form>

              <button class="finishBtn" @click="setStyle">完成</button>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
        <!-- ChatHistory -->
        <el-tab-pane label="聊天记录" name="third">
          <el-tabs tab-position="left" style="height: 200px" class="leftNav">
            <el-tab-pane :label="session.customer.username" v-for="(session,index) in MerchantStore.sessionList">
              <ChatWrap
                :ChatHistory="session.histories"
                :key="session.chatSession.id"
              >
              </ChatWrap>
            </el-tab-pane>
            <!-- <el-tab-pane label="用户二">
              <ChatWrap></ChatWrap>
            </el-tab-pane>
            <el-tab-pane label="用户三">
              <ChatWrap></ChatWrap>
            </el-tab-pane> -->
          </el-tabs>
        </el-tab-pane>
        <!-- InformationEntry -->
        <el-tab-pane label="信息录入" name="fourth">
          <el-tabs tab-position="left" style="height: 200px" class="leftNav">
            <el-tab-pane label="商家信息">
              <el-form
                label-position="top"
                label-width="80px"
                :model="chatStyle"
              >
                <el-form-item label="店铺名称">
                  <el-input v-model="shopInfo.merchantName"></el-input>
                </el-form-item>
                <el-form-item label="店铺（品牌）介绍">
                  <el-input v-model="shopInfo.introduction"></el-input>
                </el-form-item>
                <el-form-item label="主营类别">
                  <el-input v-model="shopInfo.mainCategory"></el-input>
                </el-form-item>
                <el-form-item label="退换货规则">
                  <el-input v-model="shopInfo.returnAndExchangeRules"></el-input>
                </el-form-item>
                <el-form-item label="物流">
                  <el-input v-model="shopInfo.logisticalArea"></el-input>
                </el-form-item>
              </el-form>

              <button class="finishBtn" @click="uploadMerchantInfo">完成</button>
            </el-tab-pane>

            <el-tab-pane label="商品信息">
              <el-form
                label-position="top"
                label-width="80px"
                v-for="(good, index) in merchandiseList"
                :key="index"
                :model="good"
              >
                商品{{ index + 1 }}
                <el-divider></el-divider>
                <el-form-item label="商品名称">
                  <el-input v-model="good.merchandiseName"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                  <el-input v-model="good.description"></el-input>
                </el-form-item>
                <el-form-item label="商品图片">
                  
                  <el-carousel :interval="4000" type="card" height="150px"  style="width: 300px;">
                    <el-carousel-item v-for="img in good.imgList" >
                      <h3 class="small justify-center" text="2xl">
    
                      </h3>
                      <img :src="img.imageUrl" alt="" style="{width:'100%',height:'100%' object-fit: cover;}">
                    </el-carousel-item>
                  </el-carousel>
<!--                   <el-upload
                    v-model:file-list="fileList"
                    class="upload-demo"
                    action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture"
                  >
                    <el-button type="primary">Click to upload</el-button>
                    <template #tip>
                      <div class="el-upload__tip">
                        jpg/png files with a size less than 500kb
                      </div>
                    </template>
                  </el-upload> -->
                </el-form-item>
                <input type="file" ref="fileInput" style="display: none" @change="handleFileInputChange" />
                <el-button @click="uploadImage(index)" type="primary">上传图片</el-button>

                <p><strong>自定义信息</strong></p>
                <el-select v-model="chosenSheet" class="m-2" placeholder="Select" size="large">
                  <el-option
                    v-for="item in sheetList"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                  />
                </el-select>               
                <el-divider></el-divider>
                <!-- <el-input v-model="shopInfo.introduction"></el-input> -->
                <!-- <LuckySheet></LuckySheet> -->
                <el-button
                  class="deleteBtn"
                  type="danger"
                  @click="merchandiseList.splice(index, 1)"
                >
                  删除商品
                </el-button>
                <el-divider></el-divider>
              </el-form>
              <el-button type="primary" @click="addMerchandise"
                >添加商品
              </el-button>
              <!-- luckysheet -->
              <div
                style="
                  width: 100%;
                  height: 600px;
                  border: 1px solid #ddd;
                  position: relative;
                "
              >
              <p style="font-weight: bold;">自定义信息（如尺码表等</p>
                <div style="display: flex">
                  <input id="uploadBtn" type="file" @change="loadExcel" />
                  <el-button type="primary" @click="downloadExcel">下载</el-button>
                </div>
                <!-- luckysheet容器 -->
                <div
                  id="luckysheet"
                  style="
                    margin: 0px;
                    padding: 0px;
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    left: 0px;
                    top: 50px;
                  "
                ></div>
              </div>
              <button class="finishBtn" @click="showSaveSuccuess">完成</button>
            </el-tab-pane>
          </el-tabs>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from "element-plus";
import { ref, reactive, onMounted,nextTick,computed,watch,getCurrentInstance  } from "vue";
import ChatWrap from "../components/common/ChatWrap.vue";
import { exportExcel } from "@/utils/luckySheet";
import LuckyExcel from "luckyexcel";
import type { UploadProps, UploadUserFile } from "element-plus";
import router from "../router/index";
import { MerchantRequester } from "@/api/api";
import { useMerchantStore } from "@/store/merchant";
import { defaultMerchantInfo,MerchantInfoModel } from "@/api/reqModel";
import { imageUrlToBase64,fileToBase64 } from "@/utils/img";
import { useCommonStore } from "@/store/common";
const MerchantStore = useMerchantStore();
const commonStore = useCommonStore();

// tab active
let activeName = ref("first");

watch(activeName, (newV) => {
  if (newV == 'third') {
    commonStore.isHistoryOnly = true
  }
  else {
    commonStore.isHistoryOnly = false
  }
})


// 商家信息
let merchantInfo = computed(()=>{
  return MerchantStore.merchantInfo
});

// 商品信息
let merchandiseList =  reactive([{}])


// sheet 相关
let chosenSheet = ref('')
let sheetList = reactive([])




/* 客服设置 start */




/* 客服设置 end */

/* 商家信息录入 start */

/* 预设问答 */
let presetConfig = reactive({
  hello: merchantInfo.value.initialMsg,
  presetQaList: [{
    id: 0,
  }],
});


// 设置聊天风格
async function setStyle(){
  updateMerchantInfo({
    chatStyle: chatStyle.style,
    botName: chatStyle.botName,
}).then(res=>{
    console.log('设置成功',res);
    ElMessage({
      message:'设置成功',
      type:'success'
    })
  }).catch(err=>{
    console.log('设置失败',err);
    ElMessage({
      message:'设置失败',
      type:'error'
    })
  })
}

// 加载聊天风格
function reLoadStyle(){
  chatStyle.botName = merchantInfo.value.botName 
  chatStyle.style = merchantInfo.value.chatStyle 
}

// 预设问答以及问候语句
function setPreset_Init(){
  updateMerchantInfo({
    initialMsg: presetConfig.hello
  }).then(async res=>{
    console.log('设置问候语',res);
    const curQAList:any = await MerchantRequester.GetPresetById({
      merchantId:MerchantStore.mechantId
    })
    addQANum.value =presetConfig.presetQaList.length - curQAList.length
    console.log('-addQANum',-addQANum.value);
    if (addQANum.value!=0){
      const newQAList = presetConfig.presetQaList.slice(-addQANum.value);
      console.log('newQAList',newQAList);
      for (let i = 0; i < newQAList.length; i++) {
        const item = newQAList[i];
        await MerchantRequester.SetPreset({
          merchantId: MerchantStore.mechantId,
          q: item.Q,
          a: item.A,
        });
      }
      /* await reloadPreset() */
    }
    ElMessage({
      message:'设置成功',
      type:'success'
    })
    MerchantStore.merchantInfo.initialMsg = presetConfig.hello
  }).catch(err=>{
    console.log('设置问候语失败',err);
    ElMessage({
      message:'设置失败,请联系工作人员',
      type:'error'
    })
  })

}

// 删除预设问答
function deletePresetQA(index:any){
  MerchantRequester.DeletePreset({
    id:presetConfig.presetQaList[index].id
  }).then(async(res)=>{
    await reloadPreset()
    console.log('删除预设问答',res);
    ElMessage({
      message:'删除成功',
      type:'success'
    })
  }).catch(err=>{
    console.log(err);
    presetConfig.presetQaList.splice(index,1)
  })
}

// 更新，重新请求预设问答
async function reloadPreset(){
  MerchantRequester.GetPresetById({
    merchantId:MerchantStore.mechantId
  }).then((res:any)=>{
    console.log('获取预设问答',res);
    res = res.map((item:any)=>{
      return {
        ...item,
        Q:item.q,
        A:item.a
      }
    })
    // 替换
    presetConfig.presetQaList.splice(0,presetConfig.presetQaList.length,...res)
  })
}


// 更新商家信息
  //先保存原来商家的信息用作默认值，防止不需要修改的字段被修改

async function updateMerchantInfo(newInfo:any){
  let coverBase64 = await imageUrlToBase64(merchantInfo.value.coverUrl)
  let reqInfo = {
    ...merchantInfo.value,
    coverBase64,
    ...newInfo
  }
  MerchantRequester.UpdateMechantInfo(reqInfo).then((res)=>{
    console.log('更新成功！',res);
    MerchantStore.reloadMerchantInfo()
    // 重载聊天测试
    commonStore.updateChatFlag++;
    
  }).catch(err=>{
    console.log('更新失败',err);
  })
}

/* 商家信息录入 end */

/* 主题 */
let theme = ref("");

/* 聊天风格 */
let chatStyle = reactive({
  botName: "",
  style: "",
});

/* 店铺信息 */
let shopInfo = reactive({
  merchantName: "",
  mainCategory: "",
  introduction: "",
  returnAndExchangeRules: "",
  logisticalArea: "",
});

/* 商品信息 */
const imgFileList = ref<UploadUserFile[]>([
  {
    name: "food.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
  {
    name: "food2.jpeg",
    url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
  },
]);

interface GoodsInfo {
  goodsName: string;
  goodsDesc: string;
  imgFileList: UploadUserFile[];
}

let goodsInfo: GoodsInfo[] = reactive([
  {
    goodsName: "",
    goodsDesc: "",
    imgFileList: imgFileList.value,
  },
]);



/* UPLoader */
  // 将图片文件转换为Base64编码的函数
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert the image.'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const fileInput = ref<HTMLInputElement | null>(null);
// 处理后上传的图片
const uploadImgUrlList = reactive([{}])

const handleFileInputChange = async (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    // 处理选中的文件，可以在这里触发上传逻辑
    console.log('选中的文件:', file);
    let base64String = await fileToBase64(file);
    base64String = base64String.split(',')[1];
    console.log('图片的Base64编码:', base64String);
    MerchantRequester.UploadProductImage({
      content: file.name,
      merchandiseId:curUploadMerchandiseId.value,
      base64: base64String      
    }).then(async res=>{
      console.log(res);
      let newList = merchandiseList[curUploadMerchandiseIndex.value].imgList.concat(res)
      /* 刷新界面 */
      merchandiseList.splice(curUploadMerchandiseIndex.value,1,{
        ...merchandiseList[curUploadMerchandiseIndex.value],
        imgList:newList
      })
      let {ctx:that, proxy} = getCurrentInstance()
      that.$forceUpdate()
      ElMessage({
        message:'上传成功',
        type:'success'
      })
    })
  }
};


let curUploadMerchandiseId = ref(0)
let curUploadMerchandiseIndex = ref(0)

const uploadImage = (index) => {
  curUploadMerchandiseIndex.value = index
  curUploadMerchandiseId.value = merchandiseList[index].id
  if (fileInput.value[index]) {
    fileInput.value[index].click(); // 通过 .value 获取实际的 DOM 元素，然后调用 click 方法
    // 转base64

  }
};


/* const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
}; */


// 添加商品
function addMerchandise(){
  console.log('add');
/*   merchandiseList.push({
    merchandiseName: "",
    price: 0,


  } as any) */
}

function logout() {
  location.replace('/')
/*   router.push({
    name: "login",
  }); */
}

function showSaveSuccuess() {
  ElMessage({
    message: "保存成功",
    type: "success",
  });
}

let newPresetQAList = reactive([
  {
    
  }
])

let addQANum = ref(0)
function addPresetQA() {
  presetConfig.presetQaList.push({
    Q: "",
    A: "",

  });
}

function uploadMerchantInfo(){
  updateMerchantInfo({
    merchantName: shopInfo.merchantName,
    introduction:shopInfo.introduction,
    mainCategory:shopInfo.mainCategory,
    returnAndExchangeRules:shopInfo.returnAndExchangeRules,
    logisticalArea:shopInfo.logisticalArea,
  }).then(()=>{
    showSaveSuccuess()
  }).catch(err=>{
    console.log(err)
    ElMessage({
      message: "保存失败",
      type: "error",
    })
  })
}

function reloadMerchantInfo(){
  shopInfo.merchantName = merchantInfo.value.merchantName
  shopInfo.introduction = merchantInfo.value.introduction
  shopInfo.mainCategory = merchantInfo.value.mainCategory
  shopInfo.returnAndExchangeRules = merchantInfo.value.returnAndExchangeRules
  shopInfo.logisticalArea = merchantInfo.value.logisticalArea
}

function reloadMerchandiseList(){
  let list = MerchantRequester.GetProductInfoById({merchantId: MerchantStore.mechantId}).then((res:any)=>{
    console.log(res);
    merchandiseList = res
    // 获取图片列表
    for(let i = 0;i<merchandiseList.length;i++){
    MerchantRequester.GetProductImage({
      merchandiseId:merchandiseList[i].id
    }).then((res)=>{
      merchandiseList[i].imgList = res
      console.log('res',res);
    })
  }
  })
}

/* luckysheet start */
onMounted(() => {
  // 查询预设问答
  reloadPreset();
  // 查询聊天风格
  reLoadStyle();
  // 获取商家信息
  reloadMerchantInfo();
  // 获取商品信息
  reloadMerchandiseList();
    
    console.log("表格：", luckysheet);
    luckysheet.create({
      container: "luckysheet",
      title: "自定义信息", // 表 头名
      lang: "zh", // 中文
      showtoolbar: false, // 是否显示工具栏
      showinfobar: false, // 是否显示顶部信息栏
      showsheetbar: true, // 是否显示底部sheet按钮
    });
    nextTick(()=>{
      let sheet = document.querySelector(".luckysheet")
      console.log(sheet);
      document.querySelector("#luckysheet").style.width = "1200px";
      document.getElementById("luckysheet").style.height = "500px";
      sheetList = luckysheet.getAllSheets();
      console.log('sheetList', sheetList);
    })
  });

const jsonData = ref({});
  
  //导入excel
  const loadExcel = (evt) => {
    const files = evt.target.files;
    if (files == null || files.length == 0) {
      alert("请选择文件");
      return;
    }
  
    //获取文件名
    let name = files[0].name;
    //获取文件后缀
    let suffixArr = name.split("."),
      suffix = suffixArr[suffixArr.length - 1];
    if (suffix != "xlsx") {
      alert("当前只能导入xlsx格式文件");
      return;
    }
  
    //转换导入的excel
    LuckyExcel.transformExcelToLucky(
      files[0],
      function (exportJson, luckysheetfile) {
        if (exportJson.sheets == null || exportJson.sheets.length == 0) {
          alert("无法读取excel文件的内容，当前不支持xls文件!");
          return;
        }
  
        console.log("exportJson", exportJson);
        jsonData.value = exportJson;
  
        //销毁之前的表格
        window.luckysheet.destroy();
  
        //创建新的表格
        window.luckysheet.create({
          container: "luckysheet",
          showinfobar: false,
          data: exportJson.sheets,
          title: exportJson.info.name,
          userInfo: exportJson.info.name.creator,
        });
      }
    );
  };
  const downloadExcel = () => {
    console.log("下载的数据：", luckysheet.getAllSheets());
    //第2个参数是导出的文件名
    exportExcel(luckysheet.getAllSheets(), "下载");
  };


</script>

<style scoped lang="less">
.wrap {
  position: relative;
  background-color: white;
  width: 100%;
  height: 100%;
  .accountBox {
    display: flex;
    justify-content: flex-end;
    margin: 30px;
    align-items: center;
    position: fixed;
    right: 10px;
    top:10px;
    .exitBtn {
      margin-left: 20px;
    }
  }

  .banner {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    .logo {
      margin-right: 50px;
      background-color: white;
      width: 100px;
      height: 90px;
      border-radius: 20%;
    }

    h1.title {
      display: block;
      text-align: center;
      font-size: 30px;
      font-weight: bold;
    }
  }

  .tabs {
    width: 70%;
    margin: 0 auto;
    position: relative;
    overflow: visible !important;
    .leftNav {
      height: auto !important;
      /* transform: translateX(-100px); */
      padding-bottom: 100px;
    }

    .chatbot {
      scale: 1;
      margin-left: 0;
    }

    .deleteBtn {
      margin-left: 90%;
    }

    .finishBtn {
      display: block;
      background-color: #4d989e;
      color: white;
      padding: 8px 25px;
      margin-top: 30px;
      margin-left: 85%;
    }
  }
}
</style>
