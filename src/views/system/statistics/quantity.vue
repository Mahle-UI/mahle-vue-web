<template>
  <div class="app-container">
    <div class="title">{{$t('statistics.StatisticsContractsPendingApproval')}}</div>
    <el-divider></el-divider>
    <el-row :gutter="20">
      <el-col :span="12" :xs="24">
        <BarChart :xData="xData" :number="number"></BarChart>
      </el-col>
      <el-col :span="12" :xs="24">
        <el-table v-loading="loading" :data="dataList" style="margin-top:20px" border>
          <el-table-column type="selection" width="50" align="center" v-if="false" />
          <el-table-column :label="$t('statistics.userName')" align="center" prop="userName" ></el-table-column>
          <el-table-column :label="$t('statistics.count')" align="center" prop="count" ></el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {quantity} from "@/api/system/statistics";
import BarChart from './BarChart'

export default {
  components:{
    BarChart
  },
  data() {
    return {
      dataList:[],
      loading:false,
      xData:[],
      number:[]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(){
      this.loading = true
      quantity().then((response) => {
          this.dataList = response.data
          this.dataList.forEach(item=>{
            this.xData.push(item.userName)
            this.number.push(item.count)
          })
          this.loading = false
      });
    },
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
