import fs from 'fs'

export default{
  install (Vue) {
    Vue.prototype.readFileList = function (paths, filesList) {
      const files = fs.readdirSync(paths)
      // console.log(files)
      files.forEach((itm, index) => {
        const stat = fs.statSync(paths + itm)
        // console.log(stat)
        if (stat.isDirectory()) {
          // 递归读取文件
          this.readFileList(`${paths + itm}/`, filesList)
        } else {
          const obj = {}
          obj.paths = paths.replace(/\\/g, '/')
          obj.filename = itm
          obj.files = paths.replace(/\\/g, '/') + itm
          filesList.push(obj)
        }
      })
    }
    Vue.prototype.getFileList = function (paths) {
      const filesList = []
      this.readFileList(paths, filesList)
      return filesList
    }
    Vue.prototype.S4 = function () {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    }
   Vue.prototype.guid = function () { 
      return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4()); 
   };
  }
}