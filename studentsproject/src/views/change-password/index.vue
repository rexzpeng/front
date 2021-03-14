<template>
  <div >
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/layout' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>修改密码</el-breadcrumb-item>
    </el-breadcrumb>

    <div class="change-password-wrapper">
      <div class="box1">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="当前密码" prop="nowPassword">
            <el-input type="password" v-model="ruleForm.nowPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="aginPassword">
            <el-input type="password" v-model="ruleForm.aginPassword" clearable autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { changePassword } from '../../api'
export default {
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else{
        if(value !== this.ruleForm.newPassword){
          console.log('no');
          callback(new Error('两次密码不一致'))
        }else{
         callback()
        }
      }
    }
    return {
      ruleForm: {
        nowPassword: '',
        newPassword: '',
        aginPassword: '',
      },
      rules: {
        nowPassword: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        aginPassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.username = sessionStorage.getItem('username')
          changePassword(this.ruleForm).then(res=>{

          })
          console.log();
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>
<style scoped>
.el-breadcrumb {
  margin-bottom: 8px;
}

.change-password-wrapper{
  background: #fff;
  height: 500px;
  padding: 50px 20px;
  
}
.el-input{
    width: 300px;
  }
</style>
