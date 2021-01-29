<template>
    <div>
      <i :class="icon"></i> <span class="title">{{title}}</span>
      <el-divider ></el-divider>
      <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "el-group",
        props:{
          icon:{
            default:"el-icon-folder-checked"
          },
          title:String
        }
    }
</script>

<style scoped>
.title{font-size:16px;padding-left:10px;font-weight:bold;}
.el-divider--horizontal{margin: 10px 0px}
</style>
