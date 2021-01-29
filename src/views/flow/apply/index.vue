<template>
  <div class="app-container">
      <h3>{{$t('contract.process')}}</h3>
      <el-row :gutter="18" class="item">
        <el-col :span="3" class="apply" style="color: #0c88ff">
            <div @click="toContract">
            <i class="el-icon-document-add" ></i>
            <div>{{$t('contract.smts')}}</div>
            </div>
        </el-col>
        <el-col :span="3" class="apply" style="color: #26b55b">
          <div @click="toChildContract">
          <i class="el-icon-collection" ></i>
          <div>{{$t('contract.applicationForApprovalOfSubsidiaryContract')}}</div>
          </div>
        </el-col>
        <el-col :span="5" class="apply" style="color: #b5740c" v-has-role="['smts_senior_legalAffairs']">
          <div @click="toContractTemplate">
            <i class="el-icon-s-open" ></i>
            <div>{{$t('contract.addOrUpdate')}}</div>
          </div>
        </el-col>
      </el-row>

      <h3>{{$t('sealinfo.sealProcess')}}</h3>
      <el-row :gutter="16" class="item">
        <el-col :span="3" class="apply" style="color: #258bb5">
          <div @click="toSeal">
          <i class="el-icon-s-check" ></i>
          <div>{{$t('sealinfo.sealMaking')}}</div>
          </div>
        </el-col>
        <el-col :span="3" class="apply" style="color: #b52e1e">
          <div @click="()=>{this.$router.push('/seal/sealinfo')}">
            <i class="el-icon-remove" ></i>
            <div>{{$t('sealinfo.process')}}</div>
            </div>
        </el-col>
        <el-col  :span="4" class="apply" style="color: #26b55b">
          <div @click="toSealUse">
            <i class="el-icon-s-finance" ></i>
            <div>{{$t('sealinfo.childSeal')}}</div>
          </div>
        </el-col>
        <el-col class="apply" :span="3" style="color: #7736b5">
          <div @click="toSealBorrow">
            <i class="el-icon-receiving"></i>
            <div>{{$t('sealBorrow.functionName')}}</div>
          </div>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "flowApply",
  data() {
    return {
      isShanghai:''
    };
  },
  created() {
    this.isShanghai = this.$store.getters.isShanghai
  },
  methods:{
    toContract(){
      this.$router.push("applyContract?type=1")
    },
    toSeal(){
      this.$router.push("applySeal")
    },
    toContractTemplate(){
      this.$router.push("applyContractTemplate")
    },
    toSealUse(){
      this.$router.push("/flow/sealUse")
    },
    toSealBorrow(){
      this.$router.push("/flow/sealBorrow")
    },
    toChildContract(){
      this.$router.push("/flow/childContract?type=2")
    }
  }

};
</script>


<style type="text/css" scoped>
.item{text-align: center;padding: 10px;font-size: 15px}
.apply i{font-size: 40px;text-align: center;padding: 10px}
.apply{
  cursor: pointer;}
</style>
