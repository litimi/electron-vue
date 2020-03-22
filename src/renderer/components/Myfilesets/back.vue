<template>
  <div>
    <el-row :gutter="20">
      <div>
        <!-- <input type="file" @onchange="importf(this)" /> -->
        <input type="file" multiple="false" id="sheetjs-input" accept="xls,xlsx" @change="onchanges" />
         <!-- <br/> -->
        <!-- <button type="button" id="export-table" v-show="data.length>0" @click="onexportByHtml">根据Html导出Excel</button> -->
        <!-- <br/> -->
        <!-- <button type="button" id="export-table" v-show="data.length>0" @click="onexportByJson">根据Json导出Excel</button> -->
        <!-- <br/> -->
        <div id="out-table"></div>
        <!-- <div id="demo"></div> -->

      </div>
    </el-row>
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'Myfilesets',
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {
    /*
    FileReader共有4种读取方法：
    1.readAsArrayBuffer(file)：将文件读取为ArrayBuffer。
    2.readAsBinaryString(file)：将文件读取为二进制字符串
    3.readAsDataURL(file)：将文件读取为Data URL
    4.readAsText(file, [encoding])：将文件读取为文本，encoding缺省值为'UTF-8'
    */
    // importf(obj) {//导入
    //   console.log(obj)
    //   var wb;//读取完成的数据
    //   var rABS = false; //是否将文件读取为二进制字符串
    //   console.log(obj)
    //   if(!obj.files) {
    //     return;
    //   }
    //   var f = obj.files[0];
    //   var reader = new FileReader();
    //   reader.onload = function(e) {
    //     var data = e.target.result;
    //     if(rABS) {
    //       wb = XLSX.read(btoa(this.fixdata(data)), {//手动转化
    //         type: 'base64'
    //       });
    //     } else {
    //       wb = XLSX.read(data, {
    //         type: 'binary'
    //       });
    //     }
    //     //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
    //     //wb.Sheets[Sheet名]获取第一个Sheet的数据
    //     document.getElementById("demo").innerHTML= JSON.stringify( XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) );
    //   };
    //   if(rABS) {
    //     reader.readAsArrayBuffer(f);
    //   } else {
    //     reader.readAsBinaryString(f);
    //   }
    // },

    // fixdata (data) { //文件流转BinaryString
    //   var o = "",
    //   l = 0,
    //   w = 10240;
    //   for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    //   o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    //   return o;
    // },

    onchanges (evt) {
        var file;
        var files = evt.target.files;
        var self = this;
        if (!files || files.length == 0) return;
        file = files[0];
        var reader = new FileReader();
        reader.onload = function (e) {
          // 数据预处理
          var binary = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          /* 读取 workbook */
          var wb = XLSX.read(binary, {
            type: 'binary'
          });
          /* 选择第一个sheet */
          var wsname = wb.SheetNames[0];
          var ws = wb.Sheets[wsname];
          /* excel转换json数组,加上{header:1}是普通数组，不写是对象数组 */
          self.data = XLSX.utils.sheet_to_json(ws);
          console.log(self.data);
          /* 生成html表格 */
          var HTML = XLSX.utils.sheet_to_html(ws);
         
          document.getElementById('out-table').innerHTML = HTML;
          /* 显示导出Excel按钮 */
          document.getElementById('export-table').style.visibility = "visible";
        };
        reader.readAsArrayBuffer(file);
      },

      onexportByHtml () {
        /* html表格转excel */
        var wb = XLSX.utils.table_to_book(document.getElementById('out-table'));
        /* 生成文件，导出D盘 */
        XLSX.writeFile(wb, "D://sheetjs_html.xlsx");
      },
      onexportByJson () {
          /* json数组转换excel */
          var worksheet = XLSX.utils.aoa_to_sheet(this.data);
          var new_workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(new_workbook, worksheet, "sheetjs");
          /* 生成文件，导出D盘 */
          XLSX.writeFile(new_workbook, "D://sheetjs_json.xlsx");
      }
  }
}
</script>

<style lang="scss" scoped>

</style>