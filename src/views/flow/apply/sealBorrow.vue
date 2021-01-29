<template>
  <div class="app-container">
    <h3 style="text-align: center">{{$t('sealBorrow.functionName')}}</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="0px" style="width: 50%;margin:0 auto">
      <el-form-item >
        <el-steps align-center :space="500" finish-status="success">
          <el-step :description="$t('sealinfo.applicant')"></el-step>
          <el-step :description="$t('sealinfo.headOfApplicationDepartment')"></el-step>
          <el-step :description="$t('sealBorrow.custodian')"></el-step>
          <el-step :description="$t('sealinfo.applicant')"></el-step>
          <el-step :description="$t('sealBorrow.custodian')"></el-step>
        </el-steps>
      </el-form-item>
    </el-form>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'180px':'120px'" style="width: 50%;margin:0 auto">
      <el-form-item :label="$t('sealBorrow.sealId')"  prop="sealId">
        <el-select clearable v-model="form.sealId" @change="selectSeal" style="width: 100%" :placeholder="$t('common.placeSelect')+' '+$t('sealBorrow.sealId')" size="small">
          <el-option
            v-for="seal in sealOptions"
            :key="seal.supplyId"
            :label="seal.sealName"
            :value="seal.supplyId"
          />
        </el-select>
      </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowUserId')" prop="borrowUserName">
        <el-input v-model="form.borrowUserName" :placeholder="$t('common.placeholder')+' '+$t('sealBorrow.borrowUserId')" />
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowDeptId')" prop="borrowDeptId">
          <!-- <el-input v-model="form.borrowDeptName" disabled=""/> -->
          <treeselect v-model="form.borrowDeptId" :options="deptOptions" :show-count="true" :placeholder="$t('common.placeSelect')+' '+$t('sealBorrow.borrowDeptId')" />
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.planBorrowDate')" prop="planBorrowDate">
          <el-date-picker clearable size="small" style="width: 100%"
            v-model="form.planBorrowDate"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            :placeholder="$t('common.choose')+$t('sealBorrow.planBorrowDate')">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('sealBorrow.borrowExplain')" prop="borrowExplain">
          <el-input
            type="textarea"
            v-model="form.borrowExplain"
            :placeholder="$t('common.placeholder')+' '+$t('sealBorrow.borrowExplain')"
            clearable
            size="small"
          />
        </el-form-item>
    </el-form>
    <div style="text-align: center">
      <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
<!--      <el-button type="success" @click="temporaryStorageForm" v-prevent-repeat-click>{{$t('common.temporaryStorage')}}</el-button>-->
      <el-button @click="cancel">{{$t('common.cancle')}}</el-button>
    </div>
  </div>
</template>

<script>
  import {  checkSaveSealBorrow,addSealBorrow,editSealBorrow } from "@/api/flow/sealBorrow";
  import { sealcombo,searchkeeper } from "@/api/info/sealinfo";
  import { getToken } from "@/utils/auth";
  import { treeselect } from "@/api/system/dept";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  export default {
    components:{
      Treeselect
    },
    name: "SealBorrow",
    data() {
      return {
        sealOptions: [],
        // 表单参数
        form: {},
        // 表单校验
        rules: {
          sealId: [
            { required: true, message: "印章不能为空", trigger: "blur" }
          ],
          planBorrowDate: [
            { required: true,message: "计划借用日期不能为空",trigger: "blur" }
          ],
          borrowUserName: [
            { required: true, message: "借用人不能为空", trigger: "blur" }
          ],
          borrowExplain: [
            { required: true, message: "借用说明不能为空", trigger: "blur" }
          ],
          borrowDeptId: [
            { required: true, message: "借用部门不能为空", trigger: "blur" }
          ],
        },
        userOptions:[],
        deptOptions:[]
      };
    },
    created() {
    },
    methods: {
      // 取消按钮
      cancel() {
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push("/seal/sealBorrow")
        this.reset();
      },
      // 表单重置
      reset() {
        this.form = {
          id: null,
          status: null
        };
        this.resetForm("form");
      },
      /** 提交按钮 */
      submitForm() {
        this.form.status = 0
        this.submit()
      },
      temporaryStorageForm(){
        this.form.status = 1
        this.submit()
      },
      submit(){
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.id != null) {
              editSealBorrow(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successEdit'));
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/seal/sealBorrow")
                }
              });
            } else {
              addSealBorrow(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successAdd'));
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/seal/sealBorrow")
                }
              });
            }
          }
        });
      },
      selectSeal(supplyId){
        var sealItem = this.sealOptions.find((item)=>{
         return item.supplyId === supplyId;
        });
        this.form.sealName = sealItem.sealName
      },
      getItem(){
        this.form = {}
        this.userOptions = []
        checkSaveSealBorrow().then(response => {
          if(response.code=='200'){
            var data = response.data
            if(data){
              this.form = data;
              this.form.borrowDeptName = data.borrowDeptName
              this.userOptions = [{
                deptId: this.form.borrowDeptId,
                upDeptName: this.form.borrowDeptName,
                upDeptNameEn: this.form.borrowDeptNameEn,
                nickName: this.form.borrowUserName,
                userId: this.form.borrowUserId,
                userName: this.form.borrowUserName,
                userNameEn: this.form.borrowUserNameEn,
              }]
            }
          }
        });
        sealcombo().then(response => {
          if(response.code=='200'){
            this.sealOptions = response.data
          }
        });
        treeselect().then((response) => {
          this.deptOptions = response.data;
        });
      },
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
