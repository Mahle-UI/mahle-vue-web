<template>
  <div class="app-container">
    <div class="title">{{$t('statistics.ContractProcessStatistics')}}</div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="8" :xs="24" v-for="item in figure" :key="item.deptId">
        <div class="title">{{item.deptName}}</div>
        <BarChart :xData="item.years" :number1="item.number1" :number2="item.number2" :number3="item.number3"></BarChart>
      </el-col>
    </el-row>
    <el-table v-loading="loading" :data="dataList" style="margin-top:20px"
      :span-method="objectSpanMethod" border >
        <el-table-column type="selection" width="50" align="center" v-if="false" />
        <el-table-column :label="$t('statistics.deptName')" align="center" prop="deptName" ></el-table-column>
        <el-table-column :label="$t('statistics.yearApply')" align="center" prop="year" ></el-table-column>
        <el-table-column :label="$t('statistics.min')" align="center" prop="min" ></el-table-column>
        <el-table-column :label="$t('statistics.max')" align="center" prop="max" ></el-table-column>
        <el-table-column :label="$t('statistics.median')" align="center" prop="median" >
          <template slot="header" slot-scope="scope">
            {{ $t('statistics.median') }}
            <el-tooltip class="item" effect="dark" placement="top">
              <div  slot="content">中位数（Median）又称中值，统计学中的专有名词，是按顺序排列的一组数据中居于中间位置的数，<br>
                                  代表一个样本、种群或概率分布中的一个数值，其可将数值集合划分为相等的上下两部分。对于有限的<br>
                                  数集，可以通过把所有观察值高低排序后找出正中间的一个作为中位数。如果观察值有偶数个，通常取<br>
                                  最中间的两个数值的平均数作为中位数。</div>
              <i class="el-icon-question custom-tips"></i>
            </el-tooltip>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {contractGroup} from "@/api/system/statistics";
import BarChart from './BarChart1'

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
      contractGroup().then((response) => {
          var figure = response.data.figure
          figure.forEach(item=>{
            item.number1 = []
            item.number2 = []
            item.number3 = []
            item.dataList.forEach(item1=>{
              item.number1.push(item1.min)
              item.number2.push(item1.max)
              item.number3.push(item1.median)
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
