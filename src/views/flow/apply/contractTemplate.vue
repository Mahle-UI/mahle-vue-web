<template>
  <div class="app-container">
    <h3 style="text-align: center">{{$t('contractTemplate.functionName')+(templId?$t('contractTemplate.edit')
      :$t('contractTemplate.add'))}}</h3>
    <contractTemplate :templId="templId" :type="type" :history="history" @cancel="cancel"></contractTemplate>

  </div>
</template>

<script>
  import contractTemplate from '../../components/contractTemplate/contractTemplate'
  export default {
    components: {
      contractTemplate
    },
    data() {
      return {
        history:false,
        templId:'',
        type:''
      };
    },
    methods: {
      // 取消按钮
      cancel() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push("/contract/contractTemplate")
      },
      getItem(){
        this.templId = this.$route.query.id;
        this.type = this.$route.query.type;
      }
    },
    beforeRouteEnter(to,from,next){
        next((vm)=>{
          vm.getItem()
      })
    },
  };
</script>


<style>

  .header{text-align: center;
  }
  .text {
    font-size: 14px;
  }
  .selectWidth{width: 100%!important;}
  .item {
    margin-bottom: 18px;
    padding-bottom: 8px;
    text-align: center;
    border-bottom: 1px solid #f3f3f3;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
  .el-step__title{font-size: 13px}
</style>
