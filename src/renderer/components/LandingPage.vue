<template>
  <div id="wrapper">
    <!-- 背景视频 -->
    <div class="homepage-hero-module">
      <div class="video-container">
        <div :style="fixStyle" class="filter"></div>
        <video :style="fixStyle" autoplay loop class="fillWidth" v-on:canplay="canplay">
          <source :src="path" type="video/mp4"/>
          浏览器不支持 video 标签，建议升级浏览器。
          <source :src="paths" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="" alt="">
        </div>
      </div>
    </div>
    <!-- ------------- -->

    
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    data() {
      return {
        vedioCanPlay: false,
        path: 'static/video/MP4/Puppiness.mp4',
        paths: 'static/video/OGV/Puppiness.ogv',
        fixStyle: ''
      }
    },
    components: {  },
    mounted() {
      console.log(this.$db)
    },
    methods: {
      canplay() {
        this.vedioCanPlay = true
      }
      // open (link) {
      //   this.$electron.shell.openExternal(link)
      // }
    }
  }
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  .wrapper{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .homepage-hero-module,
  .video-container {
    position: relative;
    height: 459px;
    overflow: hidden;
  }

  .video-container .poster img,
  .video-container video {
    z-index: 0;
    position: absolute;
  }

  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 1000px;
    height: 500px;
    top: 0;
    left: 0;
  }
  .fillWidth{
    width: 100%;
    height: 100%;
  }
</style>
