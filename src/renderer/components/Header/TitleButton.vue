<template>
  <div 
    class="titlebtn" 
    :style="style"
    @click="click"/>
</template>

<script>
  const {ipcRenderer: ipc} = require('electron')
  const style = {
    min: {
      // backgroundColor: '#66b1ff',
      backgroundImage: 'url('+ require('../../assets/images/minwindow.png') +')',
      backgroundSize:'25px 25px',
      right: '65px',
      cursor: 'pointer'
    },
    close: {
      // backgroundColor: '#ff8d00',
      backgroundImage: 'url('+ require('../../assets/images/closesystem.png') +')',
      backgroundSize:'25px 25px',
      right: '25px',
      cursor: 'pointer'
    },
    skin: {
      // backgroundColor: 'white',
      backgroundImage: 'url('+ require('../../assets/images/changeskin.png') +')',
      backgroundSize:'25px 25px',
      right: '105px',
      cursor: 'pointer'
    }
  }
export default {
      name: 'TitleButton',
      props: ['type'],
      computed: {
        style: function () {
          return style[this.type]
        }
      },
      methods: {
        // 修改皮肤/关闭/最小化窗口
        click: function () {
          if (this.type === 'skin') {
            this.$emit('changeSkin')
          } else {
            ipc.send(this.type)
          }
        }
      }
    }
</script>
    
<style>
.titlebtn {
    position: absolute;
    top: 10px;
    width: 25px;
    height: 25px;
    -webkit-app-region: no-drag;
    border-radius: 50%;
}
.titlebtn:hover{
    /* border: 1px solid rgba(248, 242, 242, 0.6); */
}
</style>