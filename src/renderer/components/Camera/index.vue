<template>
  <div>
    <el-row :gutter="20">
      <div class="testTracking">
        <video id="video" width="500" height="340" preload autoplay loop muted></video>
        <canvas id="canvas" width="500" height="340" ></canvas>
        <div class="buttonDiv">
          <!-- <button type="button" @click="submit">上传照片</button> -->
          <button type="button" name="button" @click="openCamera">点击我拍照</button>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
  require('tracking/build/tracking-min.js')
  require('tracking/build/data/face-min.js')
  require('tracking/build/data/mouth-min.js')
  require('tracking/examples/assets/stats.min.js')

  export default {
    name:'Camera',
    data(){
      return {

      }
    },
    methods:{
      openCamera () {

        var video = document.getElementById('video');
        var canvas = document.getElementById('canvas');
        var context = canvas.getContext('2d');

        var tracker = new tracking.ObjectTracker('face');
        tracker.setInitialScale(4);
        tracker.setStepSize(2);
        tracker.setEdgesDensity(0.1);

        this.trackerTask = tracking.track('#video', tracker, { camera: true });

        tracker.on('track', function(event) {
          context.clearRect(0, 0, canvas.width, canvas.height);

          event.data.forEach(function(rect) {
            context.font = '11px Helvetica';
            context.fillText("已识别到人脸，请点击拍照",100,40);
            context.strokeStyle = '#a64ceb';
            context.strokeRect(rect.x, rect.y, rect.width, rect.height);
          });
        });
        

      },
      submit () {
          let that = this
          let canvas = document.getElementById('canvas')
          let context = canvas.getContext('2d')
          let video = document.getElementById('video')
          context.drawImage(video, 0,0, 500, 400)
          canvas.toBlob((blob) => {
            axios.post({faceUrl: URL.createObjectURL(blob)})
            .then((res) => {
             console.log('上传成功')
            })
          })
      }
    },
    destroyed () {
      // 停止侦测
      this.trackerTask.stop()
      // 关闭摄像头
      this.trackerTask.closeCamera()
    }
  }

</script>

<style lang="scss" scoped>
.testTracking {
  height: 80vh;
  width: 100%;
  position: relative;
  >* {
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
  }
  video, canvas {
    top: 0;
  }
  .buttonDiv {
    bottom: 10px;
  }
}

</style>
