<template>
  <div style="height: 500px;min-height:500px;position:relative">
    <el-row :gutter="20">
      <!-- 百度地图 -->
      <baidu-map 
      :center="center" 
      :zoom="zoom" 
      @ready="handler" 
      class="bm-view"
      :scroll-wheel-zoom="true"
      :mapType="maptype"
      >
        <!-- 比例尺 -->
        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
        <!-- 缩放控件 -->
        <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
        <!-- 地图类型控件 -->
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP', 'BMAP_SATELLITE_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
        <!-- 缩略图控件 -->
        <!-- <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true"></bm-overview-map> -->
        <!-- 定位控件 -->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <!-- 城市列表控件 -->
        <bm-city-list anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-city-list>
        <!-- 全景控件 -->
        <!-- <bm-panorama></bm-panorama> -->
        <!-- 搜索 -->
        <!-- <bm-view class="map"></bm-view> -->
        <!-- <bm-local-search :keyword="keyword" :auto-viewport="true" :location="location"></bm-local-search> -->
      </baidu-map>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'Mylocation',
  data() {
    return {
      center: {lng: 0, lat: 0},
      zoom: 3,
      maptype: '', // BMAP_SATELLITE_MAP
      keyword:'',
      location: ''
    }
  },
  methods: {
    handler ({BMap, map}) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    }
  }
}
</script>

<style lang="scss" scoped>
  .bm-view {
    width: 100%;
    height: 350px;
    margin-top: 40px;
  }
</style>