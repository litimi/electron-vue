import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default // 个性主页
    },
    // {
    //   path: '*',
    //   redirect: '/'
    // },
    {
      path: '/Middletwodaily',
      name: 'Middletwodaily',
      component: require('@/components/Middletwodaily').default, // 中二日常
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Videoalbum',
      name: 'Videoalbum',
      component: require('@/components/Videoalbum').default, // 视频相册
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Myalbum',
      name: 'Myalbum',
      component: require('@/components/Myalbum').default, // 我的相册
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Myfilesets',
      name: 'Myfilesets',
      component: require('@/components/Myfilesets').default, // 我的文件集
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Printform',
      name: 'Printform',
      component: require('@/components/Printform').default, // 打印表单
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Mymusic',
      name: 'Mymusic',
      component: require('@/components/Mymusic').default, // 我的音乐
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Camera',
      name: 'Camera',
      component: require('@/components/Camera').default, // 我的相机
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Mylocation',
      name: 'Mylocation',
      component: require('@/components/Mylocation').default, // 我的位置
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Notepad',
      name: 'Notepad',
      component: require('@/components/Notepad').default, // 记事本
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Animation',
      name: 'Animation',
      component: require('@/components/Animation').default, // 动画集
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Weathercondition',
      name: 'Weathercondition',
      component: require('@/components/Weathercondition').default, // 天气情况
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Systeminformation',
      name: 'Systeminformation',
      component: require('@/components/Systeminformation').default, // 系统信息
      meta: {
        showSecNav: false
      }
    },
    {
      path: '/Setup',
      name: 'Setup',
      component: require('@/components/Setup').default, // 设置
      meta: {
        showSecNav: false
      }
    },
  ]
})
