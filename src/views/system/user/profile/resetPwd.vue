<template>
  <el-form ref="form" :model="user" :rules="rules" label-width="140px">
    <el-form-item :label="$t('system.oldPassword')" prop="oldPassword">
      <el-input v-model="user.oldPassword" :placeholder="$t('system.oldPassword')" type="password" />
    </el-form-item>
    <el-form-item :label="$t('system.newPassword')" prop="newPassword">
      <el-input v-model="user.newPassword" :placeholder="$t('system.newPassword')" type="password" />
    </el-form-item>
    <el-form-item :label="$t('system.confirmPassword')" prop="confirmPassword">
      <el-input v-model="user.confirmPassword" :placeholder="$t('system.confirmPassword')" type="password" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" size="mini" @click="submit">{{$t('common.submit')}}</el-button>
      <el-button type="danger" size="mini" @click="close">{{$t('common.cancle')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateUserPwd } from "@/api/system/user";

export default {
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      test: "1test",
      user: {
        oldPassword: undefined,
        newPassword: undefined,
        confirmPassword: undefined
      },
      // 表单校验
      rules: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          updateUserPwd(this.user.oldPassword, this.user.newPassword).then(
            response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
              }
            }
          );
        }
      });
    },
    close() {
      this.$store.dispatch("tagsView/delView", this.$route);
      this.$router.push({ path: "/index" });
    }
  }
};
</script>
