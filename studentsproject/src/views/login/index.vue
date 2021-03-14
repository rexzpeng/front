<template>
  <div class="login">
    <div class="pictur">
      <div class="logo">
        <img src="../../assets/img/logo.png" alt="" />
      </div>
      <div class="form">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="dump">立即登录</el-button>
            <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="bottom-font">
      coderRex开发2020.11.23
    </div>
  </div>
</template>

<script>
import { Login } from '../../api'
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: '',
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: { required: true, message: '请输入密码', trigger: 'blur' },
      },
    }
  },
  methods: {
    dump() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          Login(this.ruleForm).then((res) => {
            sessionStorage.setItem('username',res.data.name)
            this.$router.replace('/layout')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert('submit!')
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // resetForm(formName) {
    //   this.$refs[formName].resetFields()
    // },
  },
}
</script>

<style>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(45deg, #9fbaa8, #31354c);
  display: flex;
  align-items: center;
  justify-content: center;
}
.pictur {
  position: relative;
  width: 926px;
  height: 475px;
  background-image: url('../../assets/img/project-login-bg.png');
  border-radius: 5px;
}
.logo img {
  position: absolute;
  right: 50px;
  top: 100px;
  width: 250px;
  height: 132px;
}
.form {
  width: 400px;
  float: right;
  padding: 20px 20px;
}
.el-form {
  margin-top: 240px;
}
.el-button {
  margin-left: 90px;
}
.bottom-font {
  position: absolute;
  color: #52595f;
  font-size: 12px;
  bottom: 150px;
}
</style>
