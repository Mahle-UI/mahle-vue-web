<template>
  <div class="app-container">
    <h3 style="text-align: center">{{$t('sealinfo.sealDelete')}}</h3>

    <el-form ref="form" :model="form" :rules="rules" label-width="130px" style="width: 50%;margin:0 auto">
      <el-form-item>
        <el-steps align-center :space="200" finish-status="success">
          <el-step :title="$t('sealinfo.applicant')"></el-step>
          <el-step :title="$t('sealinfo.headOfApplicationDepartment')"></el-step>
          <el-step :title="$t('sealinfo.generalOfficeMinister')"></el-step>
        </el-steps>
      </el-form-item>
        <el-form-item :label="$t('sealinfo.seal')" prop="supplyId">
          <el-input type="input" v-model="form.sealName" class="select-width" disabled=""></el-input>

        </el-form-item>
        <el-form-item :label="$t('sealinfo.reason')" prop="reason">
          <el-input type="textarea" v-model="form.reason" :placeholder="$t('common.placeholder')+' '+$t('sealinfo.reason')"/>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
        <el-button @click="cancel">{{$t('common.cancle')}}</el-button>
      </div>
  </div>
</template>

<script>
  import { sealcombo,sealtrash } from "@/api/info/sealinfo";
  import { getToken } from "@/utils/auth";
  export default {
    name: "Sealinfo",
    data() {
      return {
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 显示搜索条件
        showSearch: true,
        // 总条数
        total: 0,
        // 印章查询表格数据
        SealinfoList: [],
        // 弹出层标题
        title: "",
        // 是否显示弹出层
        open: false,
        sealOptions: [],
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          name: null,
          startTime: null,
          keeperUser: null,
          status: null
        },
        // 表单参数
        form: {sealName:'',supplyId:''},
        // 表单校验
        rules: {
          supplyId: [
            { required: true, message: "印章不能为空", trigger: "blur" }
          ],
          reason: [
            { required: true, message: "作废原因不能为空", trigger: "blur" }
          ]
        }
      };
    },
    beforeRouteEnter(to,from,next){
         next((vm)=>{
            vm.change()
        })
    },
    methods: {
      // 取消按钮
      cancel() {
        this.form.supplyId = ""
        this.form.reason = ""
        this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
        this.$router.push("/seal/sealinfo")

      },
      change(){
        this.form.sealName=this.$route.query.sealName;
        this.form.supplyId=this.$route.query.id;
      },
      /** 提交按钮 */
      submitForm() {
        this.$refs["form"].validate(valid => {
          if (valid) {
            sealtrash(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess(this.$t('common.successAdd'));
                  this.$store.state.tagsView.visitedViews.splice(this.$store.state.tagsView.visitedViews.findIndex(item => item.path === this.$route.path), 1)
                  this.$router.push("/seal/sealinfo")

                }
              });
          }
        });
      }
    }
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
