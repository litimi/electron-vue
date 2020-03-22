<template>
  <div id="app" style="width: 1000px; height: 560px; overflow: hidden;">
    <!-- 头部 -->
    <el-header class="header">
      <Header/>
    </el-header>

    <!-- 导航/内容 -->
    <el-container class="mainBox">
      <!-- 背景动画 -->
      <ul class="bg-bubbles">
        <li v-for="(item, index) in bubbles" :key="index"></li>
      </ul>
      <!-- 导航 -->
      <el-aside width=200px style="height: 508px;">
        <el-scrollbar
        :native="false" 
        wrapStyle="" 
        wrapClass="" 
        viewClass="" 
        viewStyle="" 
        :noresize="false" 
        tag="section"
        :style="{width: '100%', height:'100%', overflowX: 'hidden'}">
          <Navigation/>
        </el-scrollbar>
      </el-aside>

      <!-- 内容 -->
      <el-container style="height: 500px; width: 400px;" class="contenter">
        
        <el-scrollbar
          :native="false" 
          wrapStyle="" 
          wrapClass="" 
          viewClass="" 
          viewStyle="" 
          :noresize="false" 
          tag="section"
          :style="{width: '100%', height:'100%', overflowX: 'hidden'}">
          <el-main>
            <!-- <keep-alive> -->
              <router-view></router-view>
            <!-- </keep-alive> -->
          </el-main>
        </el-scrollbar>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import Header from './components/Header'
  import Navigation from './components/Navigation'
  export default {
    name: 'my-project',
    components:{
      Navigation,Header
    },
    data() {
      return {
        bubbles: 0
      }
    },
    created() {
      this.bubbles = 10;
    },
    mounted() {
   
    },
    methods: {
      
    },
  }
</script>

<style lang="scss" scoped>
  .mainBox{
    position: relative;
    overflow: hidden; 
    background: linear-gradient(45deg,rgba(254,172,94,0.5),rgba(199,121,208,0.5),rgba(75,192,200,0.5));
  }
  // 背景动画
  .bg-bubbles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    li {
      position: absolute;
      bottom: -160px;
      width: 40px;
      height: 40px;
      border-radius: 40px;
      background-color: rgba(255, 255, 255, 0.15);
      list-style: none;
      animation: square 15s infinite;
      transition-timing-function: linear;
      &:nth-child(1) {
        left: 10%;
      }
      &:nth-child(2) {
        left: 20%;
        width: 90px;
        height: 90px;
        border-radius: 90px;
        animation-delay: 2s;
        animation-duration: 7s;
      }
      &:nth-child(3) {
        left: 25%;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        border-radius: 60px;
        animation-duration: 8s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(5) {
        left: 70%;
      }
      &:nth-child(6) {
        left: 80%;
        width: 120px;
        height: 120px;
        border-radius: 120px;
        animation-delay: 3s;
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:nth-child(7) {
        left: 32%;
        width: 160px;
        height: 160px;
        border-radius: 160px;
        animation-delay: 2s;
      }
      &:nth-child(8) {
        left: 55%;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        animation-delay: 4s;
        animation-duration: 15s;
      }
      &:nth-child(9) {
        left: 25%;
        width: 10px;
        height: 10px;
        border-radius: 10px;
        animation-delay: 2s;
        animation-duration: 12s;
        background-color: rgba(255, 255, 255, 0.3);
      }
      &:nth-child(10) {
        left: 85%;
        width: 160px;
        height: 160px;
        border-radius: 160px;
        animation-delay: 5s;
      }
    }
    @keyframes square {
      0% {
        opacity: 0.5;
        transform: translateY(0px) rotate(45deg);
      }
      25% {
        opacity: 0.75;
        transform: translateY(-400px) rotate(90deg)
      }
      50% {
        opacity: 1;
        transform: translateY(-600px) rotate(135deg);
      }
      100% {
        opacity: 0;
        transform: translateY(-1000px) rotate(180deg);
      }
    }
  }
</style>

<style>
  /* CSS */
  .el-scrollbar__wrap{
    overflow-x: hidden !important;
  }
  html,body{
    margin: 0;
    padding: 0;
  }
  .header{
    -webkit-app-region: drag;
  }
  .el-header .header{
    border-bottom: 1px solid #eee;
  }
  .el-menu{
    background-color: rgba(255, 255, 255, 0.8) !important;
  }
</style>
