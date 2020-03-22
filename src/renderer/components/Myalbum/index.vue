<template>
  <div>
    <!-- 轮播图 -->
    <el-row :gutter="20">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <img :src="item.imageUrl" alt="" style="height:100%;width: 100%;">
        </el-carousel-item>
      </el-carousel>
    </el-row>

    <!-- 相册列表 -->
    <el-row :gutter="20">
      <el-col :span="7" v-for="(image, index) in imageList" :key="index" :offset="1" style="padding-bottom: 15px;">
        <el-card :body-style="{ padding: '0px' }">
          <el-image 
            style="width: 100%"
            :src="'static/image/'+image.filename" 
            :preview-src-list="srcList">
          </el-image>
          <div style="padding: 14px;">
            <span>{{ image.filename }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ image.time }}</time>
              <el-button type="text" class="button" @click="handelClick(image)">点我试试😍</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import fs from 'fs'
  import path from 'path'
  export default {
    name: 'Myalbum',
    data() {
      return {
        bannerList: [
          {name: '', imageUrl: 'static/banner/banner1.jpg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner2.jpg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner3.jpg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner4.jpg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner5.jpeg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner6.jpg', discraption: ''},
          {name: '', imageUrl: 'static/banner/banner7.jpeg', discraption: ''},
        ],
        imageList: [],
        currentDate: new Date(),
        srcList: [
          
        ]
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化
      init () {
        // var path = __static + '/image/'
        // // 获取文件列表
        // this.imageList = this.getFileList(path)
        // this.imageList.map((el,index) => {
        //   this.srcList.push(path+el.filename)
        //   // 获取文件时间信息
        //   let obj = this.$moment(fs.statSync(el.files).ctime).format('YYYY-MM-DD')
        //   el.time = obj
        // })
      },
      handelClick (val) {

      }
    }
  }
</script>

<style lang="scss" scoped>
  // 轮播
  .el-carousel__item h3 {
  
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }

  // 图片列表
  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>
<style>
.el-image__error, .el-image__inner, .el-image__placeholder{
  width: 206px !important;
  height: 316px !important;
}
</style>