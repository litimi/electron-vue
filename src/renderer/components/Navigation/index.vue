<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router>
          <el-menu-item index="/">
            <i class="el-icon-cold-drink"></i>
            <span slot="title">个性主页</span>
          </el-menu-item>
          <el-menu-item index="/Middletwodaily">
            <i class="el-icon-user"></i>
            <span slot="title">中二日常</span>
          </el-menu-item>
          <el-menu-item index="/Videoalbum">
            <i class="el-icon-film"></i>
            <span slot="title">视频相册</span>
          </el-menu-item>
          <el-menu-item index="/Myalbum">
            <i class="el-icon-picture-outline"></i>
            <span slot="title">我的相册</span>
          </el-menu-item>
          <el-menu-item index="/Myfilesets">
            <i class="el-icon-folder"></i>
            <span slot="title">我的文件集</span>
          </el-menu-item>
          <el-menu-item index="/Printform">
            <i class="el-icon-printer"></i>
            <span slot="title">打印表单</span>
          </el-menu-item>
          <el-menu-item index="/Mymusic">
            <i class="el-icon-headset"></i>
            <span slot="title">我的音乐</span>
          </el-menu-item>
          <el-menu-item index="/Camera">
            <i class="el-icon-headset"></i>
            <span slot="title">我的相机</span>
          </el-menu-item>
          <el-menu-item index="/Animation">
            <i class="el-icon-magic-stick"></i>
            <span slot="title">动画集</span>
          </el-menu-item>
          <el-menu-item index="/Mylocation">
            <i class="el-icon-map-location"></i>
            <span slot="title">我的位置</span>
          </el-menu-item>
          <el-menu-item index="/Notepad">
            <i class="el-icon-notebook-1"></i>
            <span slot="title">记事本</span>
          </el-menu-item>
          <el-menu-item index="/Weathercondition">
            <i class="el-icon-sunrise"></i>
            <span slot="title">天气情况</span>
          </el-menu-item>
          <el-menu-item index="/Systeminformation">
            <i class="el-icon-cpu"></i>
            <span slot="title">系统信息</span>
          </el-menu-item>
          <el-menu-item index="/Setup">
            <i class="el-icon-setting"></i>
            <span slot="title">设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
  
</style>