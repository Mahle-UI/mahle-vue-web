<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <el-popover
        placement="bottom"
        trigger="hover">
        <div v-hasPermi="['flow:contract:add']">
          <el-button @click="()=>{this.$router.push('/flow/applyContract?type=1')}"  :style="$i18n.locale=='en'?'width: 250px':'width: 180px'"  type="primary" icon="el-icon-document-add">{{$t('contract.child1')+$t('contract.application')}}</el-button>
          <br/>
          <el-button @click="()=>{this.$router.push('/flow/childContract?type=2')}"  :style="$i18n.locale=='en'?'width: 250px;margin-top: 15px':'width: 180px;margin-top: 15px'" type="success" icon="el-icon-collection">{{$t('contract.child2')+$t('contract.application')}}</el-button>
        </div>
        <div  slot="reference" class="card-panel" >
          <div class="card-panel-icon-wrapper">
            {{$t('common.add')}}
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text" >
              <svg-icon icon-class="documentation" class-name="card-panel-icon icon-people" />
            </div>
          </div>
          <div class="bottom-text">{{$t('contract.contractApplication')}}</div>
        </div>
      </el-popover>

    </el-col>


    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="()=>{this.$router.push('/seal/sealUse')}" style="background-color: #1ab394">
        <div class="card-panel-icon-wrapper">
          {{$t('common.add')}}
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text" >
            <svg-icon icon-class="form" class-name="card-panel-icon  icon-message" />
          </div>
        </div>
        <div class="bottom-text">{{$t('sealUse.functionName')}}</div>
      </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="()=>{this.$router.push('/flow/byme')}" style="background-color: #cd930f">
          <div class="card-panel-icon-wrapper">
            <count-to :start-val="0" :end-val="num1" :duration="3200" />
          </div>
          <div class="card-panel-description">
            <div class="card-panel-text" >
              <svg-icon icon-class="user" class-name="card-panel-icon icon-people" />
            </div>
          </div>
          <div class="bottom-text"> {{$t('common.proces')}} </div>
        </div>
    </el-col>

    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="()=>{this.$router.push('/flow/fromme')}"  style="background-color: #49a95f">
        <div class="card-panel-icon-wrapper">
          <count-to :start-val="0" :end-val="num2" :duration="3200" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text" >
            <svg-icon icon-class="people" class-name="card-panel-icon icon-people" />
          </div>
        </div>
        <div class="bottom-text"> {{$t('common.MyApplication')}} </div>
      </div>
    </el-col>

  </el-row>

</template>

<script>
import CountTo from 'vue-count-to'

export default {
  components: {
    CountTo
  },
  props: {
      num1:  {
        type: Number,
        default: 0
      },
      num2:  {
        type: Number,
        default: 0
      }
    },
  data() {
    return {
    }
  },
  methods: {
    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 10px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    border-radius: 5px;
    height: 108px;
    cursor: pointer;
    font-size: 30px;
    position: relative;
    overflow: hidden;
    color: #ffffff;
    background: #3c91ff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    .bottom-text{position: absolute;bottom:0px; padding:10px;font-size: 15px; text-align: center;width: 100%;opacity: 0.5;background-color: #717171
    }

    .card-panel-num {
      display: block;
      font-size: 20px;
      position: absolute;
      top:10px;
      right:10px;
    }


    .icon-people {
      color: #ffffff;
    }

    .icon-message {
      font-size: 2em!important;
      color: #f6f6f6;
    }

    .icon-money {
      color: #f6f6f6;
    }

    .icon-shopping {
      color: #ededed!important;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 30px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 33px;
      margin-left: 0px;
      position: relative;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 18px;
        margin-bottom: 12px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
