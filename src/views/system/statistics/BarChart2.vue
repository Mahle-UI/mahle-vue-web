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
    height: {
      type: String,
      default: '300px'
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
      chart: null
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
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: [{
          type: 'category',
          data: this.xData,
        }],
        yAxis: [{
          type: 'value',
          name: '单位：%'
        }],
        series: [{
          name: '完成率',
          type: 'bar',
          barWidth : 30,
          data: this.number,
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
