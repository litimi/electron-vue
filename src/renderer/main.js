import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import db from '../../static/js/datastore'
import filedb from '../../static/js/fileList'
import BaiduMap from 'vue-baidu-map'
import fun from '../../static/js/getFileList'
import moment from 'moment'//导入文件 

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
window.jquery = window.$ = jquery // 引入jq用于解析xml或json
Vue.prototype.$moment = moment;//赋值使用

Vue.prototype.$db = db // 轻量级数据库(记事本)  ----
Vue.prototype.$filedb = filedb // 轻量级数据库(记事本)  ----
Vue.use(ElementUI)
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Gy90I9RagO98T7OC2HO4Pb4t1BFCiUcg'
})
Vue.use(fun)

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
