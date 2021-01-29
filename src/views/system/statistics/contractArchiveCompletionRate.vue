<template>
  <div class="app-container">
    <div class="title">{{$t('statistics.ContractFilingCompletionRateStatistics')}}</div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8" :xs="24" v-for="item in figure" :key="item.deptId">
        <div class="title">{{item.deptName}}</div>
        <BarChart :xData="item.years" :number="item.number"></BarChart>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" style="margin-top:20px"
      :span-method="objectSpanMethod" border >
        <el-table-column type="selection" width="50" align="center" v-if="false" />
        <el-table-column :label="$t('statistics.deptName')" align="center" prop="deptName" ></el-table-column>
        <el-table-column :label="$t('statistics.yearApply')" align="center" prop="year" ></el-table-column>
        <el-table-column :label="$t('statistics.dividend1')" align="center" prop="dividend" ></el-table-column>
        <el-table-column :label="$t('statistics.divisor1')" align="center" prop="divisor" ></el-table-column>
        <el-table-column :label="$t('statistics.archiveRate')" align="center" prop="rate" ></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {contractArchiveCompletionRate} from "@/api/system/statistics";
import BarChart from './BarChart2'

export default {
  components:{
    BarChart
  },
  data() {
    return {
      dataList:[],
      loading:false,
      figure:[]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.loading = true
      contractArchiveCompletionRate().then((response) => {
          var figure = response.data.figure
          figure.forEach(item=>{
            item.number = []
            item.dataList.forEach(item1=>{
              item.number.push(item1.rate.replace("%",""))
            })
          })
          this.figure = figure
          var list = response.data.table
          list.forEach(item=>{
            this.figure.forEach(item1=>{
              if(item.deptId==item1.deptId&&item.year==item1.years[0]){
                item.size = item1.years.length
              }
            })
          })
          this.dataList = list
          this.loading = false
      });
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (row.size&&row.size>0) {
            return {
              rowspan: row.size,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }
  }
}
</script>
<style scoped>
.title{
  text-align: center;
  font-size: 20px;
  padding: 10px;
  font-weight: bold;
}
</style>
