<template>
  <div>
    <el-row :gutter="20">
      <div>
        <!-- 天气情况 -->
        <iframe src="https://apip.weatherdt.com/h5.html?id=X0HjqPwx3v" frameborder="0" width="780" height="460" allowtransparency="true"></iframe>
        <!-- <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=tk&skin=banana" frameborder="0" width="260" height="195" allowtransparency="true"></iframe> -->
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Weathercondition',
  data() {
    return {
      
    }
  },
  methods: {
   
  }
}
</script>

<style lang="scss" scoped>

</style>