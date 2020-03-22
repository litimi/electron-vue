<template>
  <div>
    <el-row :gutter="20">
      <div style="width:100%;height: 460;position:relative;">
        <!-- <el-col :span="20" :offset="1" style="padding-bottom: 15px;position: absolute;z-index:2;">
          <el-select v-model="value" placeholder="请选择" @change="changeAnimation">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col> -->
        <!-- <div id="container"></div> -->
        <div id="indexLizi" />
      </div>
    </el-row>
  </div>
</template>

<script>
import * as Three from 'three'   // 引入three
export default {
  name: 'Animation',
  props: {
    amountX: {
      type: Number,
      default: 50
    },
    amountY: {
      type: Number,
      default: 50
    },
    color: {
      type: Number,
      default: 0xffffff
    },
    top: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // camera:null,
      // scene:null,
      // renderer:null,
      // mesh:null

      count: 0,
      // 用来跟踪鼠标水平位置
      mouseX: 0,
      windowHalfX: null,
      // 相机
      camera: null,
      // 场景
      scene: null,
      // 批量管理粒子
      particles: null,
      // 渲染器
      renderer: null,

      options: [{
          value: '1',
          label: '粒子特效背景'
        }, {
          value: '2',
          label: '双皮奶'
        }, {
          value: '3',
          label: '蚵仔煎'
        }, {
          value: '4',
          label: '龙须面'
        }, {
          value: '5',
          label: '北京烤鸭'
      }],
      value: ''
    }
  },
  mounted(){
    this.init()
    this.animate()
  },
  methods: {
  //  init(){
  //     let container=document.getElementById('container')
  //     this.camera=new Three.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.01,10)

  //     this.camera.position.z=0.6
  //     this.scene=new Three.Scene()
  //     let geometry=new Three.BoxGeometry(0.2,0.2,0.2)
  //     let material=new Three.MeshNormalMaterial()
  //     this.mesh=new Three.Mesh(geometry,material)
  //     this.scene.add(this.mesh)

  //     this.renderer=new Three.WebGLRenderer({antialias:true})
  //     this.renderer.setSize(container.clientWidth,container.clientHeight)
  //     container.appendChild(this.renderer.domElement)
  //   },
  //   animate(){
  //     requestAnimationFrame(this.animate)
  //     this.mesh.rotation.x+=0.09
  //     this.mesh.rotation.y+=0.1
  //     this.renderer.render(this.scene,this.camera)
  //   },

    init: function() {
      const SEPARATION = 100
      const SCREEN_WIDTH = window.innerWidth // 窗口宽度
      const SCREEN_HEIGHT = 460 // 窗口高度
      const container = document.createElement('div') // 创建容器
      this.windowHalfX = window.innerWidth / 2
      container.style.position = 'relative'
      container.style.top = `${this.top}px`
      container.style.height = `${(SCREEN_HEIGHT - this.top)}px`
      document.getElementById('indexLizi').appendChild(container) // 将容器追加至预设div
      this.camera = new Three.PerspectiveCamera(75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000) // 创建相机（远景相机）
      this.camera.position.z = 1000 // 设置相机z轴位置
      this.scene = new Three.Scene() // 创建一个场景
      const numParticles = this.amountX * this.amountY
      const positions = new Float32Array(numParticles * 3)
      const scales = new Float32Array(numParticles)
      // 初始化粒子位置和大小
      let i = 0
      let j = 0
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i] = ix * SEPARATION - ((this.amountX * SEPARATION) / 2)
          positions[i + 1] = 0
          positions[i + 2] = iy * SEPARATION - ((this.amountY * SEPARATION) / 2)
          scales[j] = 1
          i += 3
          j++
        }
      }
      const geometry = new Three.BufferGeometry()
      geometry.addAttribute('position', new Three.BufferAttribute(positions, 3))
      geometry.addAttribute('scale', new Three.BufferAttribute(scales, 1))
      // 初始化粒子材质
      const material = new Three.ShaderMaterial({
        uniforms: {
          color: { value: new Three.Color(this.color) }
        },
        vertexShader: `
          attribute float scale;
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4( position, 2.0 );
            gl_PointSize = scale * ( 300.0 / - mvPosition.z );
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 color;
          void main() {
            if ( length( gl_PointCoord - vec2( 0.5, 0.5 ) ) > 0.475 ) discard;
            gl_FragColor = vec4( color, 1.0 );
          }
        `
      })
      this.particles = new Three.Points(geometry, material)
      this.scene.add(this.particles)
      this.renderer = new Three.WebGLRenderer({ antialias: true, alpha: true })
      this.renderer.setSize(container.clientWidth, container.clientHeight)
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setClearAlpha(0)
      container.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, { passive: false })
      document.addEventListener('mousemove', this.onDocumentMouseMove, { passive: false })
      document.addEventListener('touchstart', this.onDocumentTouchStart, { passive: false })
      document.addEventListener('touchmove', this.onDocumentTouchMove, { passive: false })
    },
    render: function() {
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 0.05
      this.camera.position.y = 400
      this.camera.lookAt(this.scene.position)
      const positions = this.particles.geometry.attributes.position.array
      const scales = this.particles.geometry.attributes.scale.array
      // 计算粒子位置及大小
      let i = 0
      let j = 0
      for (let ix = 0; ix < this.amountX; ix++) {
        for (let iy = 0; iy < this.amountY; iy++) {
          positions[i + 1] = (Math.sin((ix + this.count) * 0.3) * 100) + (Math.sin((iy + this.count) * 0.5) * 100)
          scales[j] = (Math.sin((ix + this.count) * 0.3) + 1) * 8 + (Math.sin((iy + this.count) * 0.5) + 1) * 8
          i += 3
          j++
        }
      }
      // 重新渲染粒子
      this.particles.geometry.attributes.position.needsUpdate = true
      this.particles.geometry.attributes.scale.needsUpdate = true
      this.renderer.render(this.scene, this.camera)
      this.count += 0.1
    },
    animate: function() {
      requestAnimationFrame(this.animate)
      this.render()
    },
    onDocumentMouseMove: function(event) {
      this.mouseX = event.clientX - this.windowHalfX
    },
    onDocumentTouchStart: function(event) {
      if (event.touches.length === 1) {
        this.mouseX = event.touches[0].pageX - this.windowHalfX
      }
    },
    onDocumentTouchMove: function(event) {
      if (event.touches.length === 1) {
        event.preventDefault()
        this.mouseX = event.touches[0].pageX - this.windowHalfX
      }
    },
    onWindowResize: function() {
      this.windowHalfX = window.innerWidth / 2
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    // 切换动效
    changeAnimation (value) {
      console.log(value)
      if (value === '1') {
        
        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  #container,#indexLizi{
    height: 100%;
  }
</style>