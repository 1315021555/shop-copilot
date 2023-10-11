<script setup lang="ts">
import User from './views/User.vue'
</script>

<template>

  <router-view></router-view>
</template>

<style  lang="less">
.el-tabs__item:hover {
  color: #4D989E !important;
}
.el-tabs__item.is-active {
  color: #fff !important;
  background-color: #4D989E !important 
} 

.is-top.is-active{
  color:#4D989E !important;
  border-bottom: 3px solid #4D989E !important;
  background-color: #fff !important 

}

.el-tabs__item {
  color: #000 !important;
  font-size: 18px;
  margin-top:20px ;
}
.el-tabs__item.is-active {
  
}

.el-tabs__item.is-top{

  margin-right: 140px;
}
.el-tabs__header.is-top{
  transform: translateX(200px);
}

.el-tabs__content{
  height: auto ;
  padding: 10px 0 0 50px;
}

.el-tabs__nav-wrap.is-left::after{
  content: none !important;
}

.el-tabs__nav-wrap.is-top::after{
  content: none ;
}
</style>
