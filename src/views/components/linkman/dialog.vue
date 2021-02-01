<template>
    <!-- 添加或修改联系人对话框 -->
    <el-dialog :close-on-click-modal="false" :title="(form.linkId?$t('common.edit'):$t('common.add'))+$t('linkman.functionName')" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" :label-width="$i18n.locale=='en'?'120px':'80px'">
        <el-form-item :label="$t('linkman.linkManCn')" prop="linkManCn">
          <el-input v-model="form.linkManCn" :placeholder="$t('common.placeholder')+' '+$t('linkman.linkManCn')" />
        </el-form-item>
        <el-form-item :label="$t('linkman.linkManEn')" prop="linkManEn">
          <el-input v-model="form.linkManEn" :placeholder="$t('common.placeholder')+' '+$t('linkman.linkManEn')" />
        </el-form-item>
        <el-form-item :label="$t('linkman.sex')" prop="sex">
          <el-select class="select-width" v-model="form.sex" :placeholder="$t('common.placeSelect')+' '+$t('linkman.sex')">
            <el-option
              v-for="dict in sexOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="parseInt(dict.dictValue)"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('linkman.position')" prop="position">
          <el-input v-model="form.position" :placeholder="$t('common.placeholder')+' '+$t('linkman.position')" />
        </el-form-item>
        <el-form-item :label="$t('linkman.telephone')" prop="telephone">
          <el-input v-model="form.telephone" :placeholder="$t('common.placeholder')+' '+$t('linkman.telephone')+' 010-87654321'" />
        </el-form-item>
        <el-form-item :label="$t('linkman.mobile')" prop="mobile">
          <el-input v-model="form.mobile" :placeholder="$t('common.placeholder')+' '+$t('linkman.mobile')" />
        </el-form-item>
        <el-form-item :label="$t('linkman.email')" prop="email">
          <el-input v-model="form.email" :placeholder="$t('common.placeholder')+' '+$t('linkman.email')" />
        </el-form-item>
        <el-form-item :label="$t('linkman.fax')" prop="fax">
          <el-input v-model="form.fax" :placeholder="$t('common.placeholder')+' '+$t('linkman.fax')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" :loading="isLoading" @click="submitForm" v-prevent-repeat-click>{{$t('common.submit')}}</el-button>
        <el-button @click="cancel">{{$t('common.cancle')}}</el-button>
      </div>
    </el-dialog>
</template>

<script>
import { addLinkman,updateLinkman,vaillinkmobile } from "@/api/info/linkman";

export default {
  name: "Linkman",
  data() {
    return {
      isLoading:false,
      // 弹出层标题
      viewTitle:"",
      viewOpen:false,
      // 性别    0  :  未知 ; 1 : 男 ; 2 :  女 字典
      sexOptions: [],
      open:false,
      form:{},
      // 表单校验
      rules: {
        linkManCn: [
          { required: true, message: "姓名不能为空",trigger: "blur"}
        ],
        sex: [
          { required: true, message: "性别不能为空", trigger: "blur" }
        ],
        position: [
          { required: true, message: "职务不能为空", trigger: "blur" }
        ],
        // telephone: [
        //   { required: true, message: "联系方式不能为空", trigger: "blur" }
        // ],
        // mobile: [
        //   // { required: true, trigger: "blur",validator: vaillinkmobile }
        //   { required: true, trigger: "blur",message: "手机号不能为空" }
        // ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" }
        ],
      },
      type:1
    };
  },
  created() {
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
  },
  methods: {
    // 性别    0  :  未知 ; 1 : 男 ; 2 :  女 字典翻译
    sexFormat(row, column) {
      return this.selectDictLabel(this.sexOptions, row.sex);
    },
    /** 验证 */
    vaillinkmobile(callback) {
      if(this.form.mobile){
          vaillinkmobile({mobile:this.form.mobile,linkId:this.form.linkId}).then(response => {
            if(response.code=='200'){
              callback()
            }else{
              callback(new Error("手机号已存在"))
            }
          });
      }
    },
    // 取消按钮
    cancel() {
      this.open = false;
      //this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        linkId: null,
        createTime: null,
        createBy: null,
        linkManCn: null,
        linkManEn: null,
        sex: null,
        position: null,
        mobile: null,
        telephone: null,
        email: null,
        fax: null,
        remark: null,
        objId: null,
        isDefault: null,
        updateBy: null,
        updateTime: null,
        ver: null,
        isDelete: null
      };
      this.resetForm("form");
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if(this.type == 1){
            this.open=false;
            this.$emit("getLinkMan",this.form);
          }else{
              if (this.form.linkId != null) {
                updateLinkman(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess(this.$t('common.successEdit'));
                    this.form = {}
                    this.open=false;
                    this.$emit("getLinkMan","");
                  }
                });
              } else {
                addLinkman(this.form).then(response => {
                  if (response.code === 200) {
                    this.msgSuccess(this.$t('common.successAdd'));
                    this.form = {}
                    this.open=false;
                    this.$emit("getLinkMan","");
                  }
                });
              }
          }
        }
      });
    },
    showDialog (form,type) {
        this.open=true;
        this.form = form
        this.type = type
    }
  }
};
</script>
