<template>
  <div>
    <el-row :gutter="20">
      <div class="header">
        <!-- 按钮 -->
        <div class="win_btn">
          <TitleButton type="skin" @changeSkin="changeSkin"/>
          <TitleButton type="min" />
          <TitleButton type="close" />
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import TitleButton from './TitleButton'
export default {
  name: 'Header',
  components: {
    TitleButton
  },
  data() {
    return {
      
    }
  },
  methods: {
   changeSkin(){
      this.$emit('changeSkin')
    },
  }
}
</script>

<style lang="scss" scoped>
  .header{
    width: 100%;
    height: 50px;
    line-height: 50px;
  }
</style>