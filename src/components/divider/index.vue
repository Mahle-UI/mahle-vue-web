<template>
  <div>
    <div @click="toggle" style="height: 600px;display: flex;justify-content: center;align-items: center;background-color: #f6f6f6;"><i style="color: #8c8c8c" :class="icon"></i></div>
  </div>
</template>

<script>
export default {
  props:{
    show:Boolean
  },
  data() {
    return {
      icon:"el-icon-d-arrow-left",
      showDivider:true
    }
  },
  watch:{
    show(result){
       if(result){
         this.icon="el-icon-d-arrow-left";
       }else{
         this.icon="el-icon-d-arrow-right";
       }
    }
  },
  methods:{
    toggle(){
      if(this.showDivider){
        this.showDivider=false;
        this.$emit("update:show",false)
      }else{
        this.$emit("update:show",true)
        this.showDivider=true;
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>
