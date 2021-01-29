<template>
  <div >
      <el-collapse v-model="activeNames">
        <el-collapse-item :title="$t('sealinfo.flowTracing')" name="4">
          <el-steps :space="200" finish-status="success">
            <flow-pic :workId="workId"></flow-pic>
          </el-steps>
        </el-collapse-item>
        <el-collapse-item :title="$t('sealinfo.approvalOpinions')" name="2">
          <el-form v-if="mShowComment" ref="form2"  :label-width="$i18n.locale=='en'?'130px':'80px'">
            <el-form-item :label="$t('sealinfo.opinioncontent')" prop="attachment">
              <el-input
                type="textarea"
                v-model="temp.comment"
                :placeholder="$t('common.placeholder')+$t('sealinfo.opinioncontent')"
                maxlength="1000"
                show-word-limit
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form  label-width="80px">
            <el-table
              :data="tableData"
              style="width: 100%;margin-top: 15px" border>
              <el-table-column
                prop="nodename"
                :label="$t('sealinfo.nodename')"
                width="240">
              </el-table-column>
              <el-table-column
                prop="username"
                :label="$t('sealinfo.username')"
                width="100">
              </el-table-column>
              <el-table-column
                prop="deptname"
                width="150"
                :label="$t('sealinfo.deptname')">
              </el-table-column>
              <el-table-column
                prop="dotime"
                width="150"
                :label="$t('sealinfo.dotimemin')">
<!--                <template scope="scope">
                    {{scope.row.dotimemin}}分钟
                </template>-->
              </el-table-column>
              <el-table-column
                prop="actiontime"
                width="160"
                :label="$t('sealinfo.actiontime')">
              </el-table-column>
              <el-table-column
                prop="actionname"
                width="150"
                :label="$t('sealinfo.actionMemo')">
              </el-table-column>
              <el-table-column
                prop="comments"
                :label="$t('sealinfo.comments')">
              </el-table-column>
            </el-table>
          </el-form>
        </el-collapse-item>

      </el-collapse>

    <div style="margin-top: 30px;background-color: white;padding: 10px;border: 1px solid #ededed">
      <!-- 暂存：save   提交：submit  退回： reject  撤销：cancel -->
      <el-button type="primary" @click="handleUpdate(item.buttonId)" v-for="(item,index) in btn" :key="index">
        {{item.buttonName}}</el-button>
    </div>
  </div>
</template>

<script>
  import { getFlowOperateButton,getFlowOperateOperate } from "@/api/info/flow";
  import FlowPic from "@/components/IFrameItem/FlowPic"

  export default {
    name: "Contract",
    components: {
      FlowPic
    },
     props: {
      tableData: Array,
      workId:String,
      showComment: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        userId:"",
        hostId:"",
        activeNames: ['4','2'],
        activeName: 'first',
        //暂存：save   提交：submit  退回： reject  撤销：cancel
        btn:[],
        temp:{radio:'',comment:''},
        mShowComment:false
      };
    },
    created() {
      this.hostId = this.$route.query.id;
      this.userId = this.$store.getters.userId
      this.getFlowOperateButton();
    },
    methods: {
      getFlowOperateButton(){
          getFlowOperateButton({hostId:this.hostId}).then(response => {
            this.btn = response.data;
            if(!this.showComment){
              this.mShowComment = false
              this.btn.forEach(item=>{
                if(item.buttonId=='submit'){
                  this.mShowComment = true
                }
              })
            }else{
              this.mShowComment = false
            }
          });
      },
      /** 按钮操作 */
      handleUpdate(btn) {
        //暂存：save   提交：submit  退回： reject  撤销：cancel 任意退回：jumpreject
        let temp = {}
        temp.hostId  = this.hostId
        temp.operate  = btn
        temp.comment = this.temp.comment.trim();

        if(this.mShowComment && temp.comment.length === 0){
          let tip = '';
          if(btn === 'reject' || btn === 'jumpreject'){
            //退回 提示输入信息
            tip = this.$t('common.rejectTips');
          }
          if(btn === 'stop'){
            //撤销 提示信息
            tip = this.$t('common.stopTips');
          }
          if(btn === 'submit' && this.userId != this.tableData[0].userid){ //提交操作提示输入意见内容 申请人提交可以不写
            tip = this.$t('common.placeholder') + this.$t('sealinfo.opinioncontent');
          }
          if(!!tip ){
            this.msgError(tip);
            return
          }
        }


        getFlowOperateOperate(temp).then(response => {
           //操作成功返回上一页
           if (response.code === 200) {
              this.msgSuccess(this.$t('common.successOperate'));
              this.closeCurrentTag();
            }
        });
      },
    }
  };
</script>


<style>
  .header {
    text-align: center;
  }

  .text {
    font-size: 14px;
  }

  .selectWidth {
    width: 100% !important;
  }

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

  .el-collapse{
    border: 0px;
  }

  .el-collapse-item__header{font-size:16px;
    background-color: #f9f9f9;margin-bottom: 10px; padding-left: 10px;
    border-bottom: 1px solid #ededed;
  }

  .el-collapse-item{
    background-color: white;
    border:1px solid #ededed;
    margin-top: 20px;
  }

  .el-collapse-item__content{
    padding: 10px;
  }
</style>
