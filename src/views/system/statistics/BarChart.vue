<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')

const animationDuration = 6000

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    xData:{
      type: Array,
      default: []
    },
    number:{
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null,
      height:"700px"
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
         
        xAxis: [{
          type: 'value' 
        }],
        yAxis: [{
          type: 'category' ,
          data: this.xData,
        }],
        series: [{
          name: '数量',
          type: 'bar',
          data: this.number 
        }]
      })
    }
  },
  watch:{
    xData(){
      this.initChart()
    }
  }
}
</script>
