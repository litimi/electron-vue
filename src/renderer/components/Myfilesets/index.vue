<template>
  <div>
    <el-row :gutter="20" style="padding: 10px 0">
      <el-button type="primary" @click="importFile()">导入excel文件</el-button>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-row>
    <el-row :gutter="20">
      <el-table
      ref="multipleTable"
      border
      :data="tableInfo.tableData"
      tooltip-effect="dark"
      style="width: 100%"
      height="400"
      @selection-change="handleSelectionChange">
        <el-table-column
          v-if="tableInfo.tableHead.length"
          type="index"
          >
        </el-table-column>
        <el-table-column
          :prop="item.label"
          :label="item.label"
          sortable
          width="150"
          v-for="(item, index) in tableInfo.tableHead" :key="index">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100"
          v-if="tableInfo.tableHead.length">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script>
import XLSX from 'xlsx'
import electron from 'electron';
const fs = require('fs');
const path  = require('path')
export default {
  name: 'Myfilesets',
  data() {
    return {
      tableInfo: {
        tableHead: [], // 表格头部
        tableData: [], // 表体数据
      }, // 表格数据
      multipleSelection: [],
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '' // 下拉选框选择值
    }
  },
  mounted() {
    
  },
  methods: {
    // 查看
    handleClick(row) {
      console.log(row);
    },
    // 选择单行数据
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 导入文件
    importFile () {
      var arr = []
      let properties = ['openFile'];
      var self = this;
      electron.remote.dialog.showOpenDialog({
          properties
        }, function (path) {
          if (path) {
            console.log(path[0])
            var binary = "";
            // let paths = path[0].replace(/\\/g, '/')
            const files = fs.readFileSync(path[0])
            var length = files.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(files[i]);
            }
            var wb = XLSX.read(binary, {
              type: 'binary'
            });
            /* 选择第一个sheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            /* excel转换json数组,加上{header:1}是普通数组，不写是对象数组 */
            self.data = XLSX.utils.sheet_to_json(ws);
            console.log(self.data);
            
            for(var i in self.data[0]){
              console.log(i)
              arr.push({label: i, id: self.guid()})
            }
            setTimeout(() => {
              self.tableInfo.tableHead = arr
              self.tableInfo.tableData = self.data
              console.log(self.tableInfo)
            }, 100)
            // console.log(ws)
          }
        })
        
    },
    S4 () {
      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    },
    guids () { 
        return (this.S4()+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+"-"+this.S4()+this.S4()+this.S4()); 
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
<style>
  .el-scrollbar__wrap{
    margin-bottom: 0 !important;
  }
</style>