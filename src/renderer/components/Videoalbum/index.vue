<template>
  <div>
    <el-row>
      <el-col :span="10" v-for="(o, index) in 4" :key="index" :offset="1" style="padding-bottom: 15px;">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <!-- autoplay loop -->
          <video :style="fixStyle" class="fillWidth" v-on:canplay="canplay" controls="controls">
            <source :src="path" type="video/mp4"/>
            浏览器不支持 video 标签，建议升级浏览器。
            <source :src="paths" type="video/webm"/>
            浏览器不支持 video 标签，建议升级浏览器。
          </video>
          <div style="padding: 14px;">
            <span>好吃的汉堡</span>
            <div class="bottom clearfix">
              <time class="time">{{ currentDate }}</time>
              <el-button type="text" class="button">播 放</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Videoalbum',
  data() {
    return {
      vedioCanPlay: false,
      path: 'static/video/MP4/Puppiness.mp4',
      paths: 'static/video/OGV/Puppiness.ogv',
      fixStyle: '',
      currentDate: new Date()
    }
  },
  methods: {
    canplay() {
      this.vedioCanPlay = true
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .fillWidth{
    width: 100%;
    // height: 100%;
  }
</style>