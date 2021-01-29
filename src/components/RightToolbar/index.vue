<!-- @author Shiyn/   huangmx 20200807优化-->
<template>
  <div class="top-right-btn">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? $i18n.locale=='en'?'Hide search':'隐藏搜索' : $i18n.locale=='en'?'Show search':'显示搜索'" placement="top">
        <el-button size="mini" circle icon="el-icon-search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" :content="$i18n.locale=='en'?'Refresh':'刷新'" placement="top">
        <el-button size="mini" circle icon="el-icon-refresh" @click="refresh()" />
      </el-tooltip>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "RightToolbar",
  data() {
    return {};
  },
  props: {
    showSearch: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    //搜索
    toggleSearch() {
      this.$emit("update:showSearch", !this.showSearch);
    },
    //刷新
    refresh() {
      this.$emit("queryTable");
    },
  },
};
</script>
