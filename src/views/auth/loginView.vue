<template>
  <div style="width: 100vw; height: 100vh; overflow: hidden">
    <el-row>
      <el-col :span="8" :offset="8" style="margin-top: 10vh;">
        <div style="text-align: center; font-size: 30px; font-weight: bold; margin-bottom: 5vh">登录</div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" style="padding: 0 5vw;">
          <el-form-item style="margin-bottom: 3vh" prop="username">
            <el-input type="text" v-model="loginForm.username" placeholder="用户名或邮箱" size="large">
              <template #prefix><el-icon><User /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 3vh" prop="password">
            <el-input type="password" v-model="loginForm.password" placeholder="密码" size="large">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 2vh">
            <el-row style="width: 100%;">
              <el-col :span="12" style="text-align: left">
                <el-checkbox v-model="loginForm.remember" label="记住我" size="large" />
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-link style="translate: 0 5px;" @click="router.push('/resetPassword')">忘记密码？</el-link>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top: 4vh; margin-bottom: 1vh;">
            <el-button @click="login()" type="primary" plain size="large" style="width: 100%">登录</el-button>
          </el-form-item>
          <el-divider>
            <span style="color: gray">没有账号？</span>
          </el-divider>
          <el-button type="warning" plain size="large" style="width: 100%" @click="router.push('/signup')">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script setup>
import {Lock, User} from "@element-plus/icons-vue";
import {reactive, ref} from "vue";
import {post_form} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

const loginForm = reactive({
  username: '',
  password: '',
  password_repeat: '',
  remember: false
})

const loginRules = {
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
    {min: 3, max: 20, message: '用户名长度应在3-20之间', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
  ]
}

const loginFormRef = ref()
const login = () => {
  loginFormRef.value.validate((isValid) => {
    if (isValid) {
      post_form('/auth/login', {
        username: loginForm.username,
        password: loginForm.password,
        remember: loginForm.remember
      }, (data) => {
        ElMessage.success(data.resultMap.data)
        router.push('/index')
      })
    } else {
      ElMessage.warning('请正确填写登录信息')
    }
  })
}

</script>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "loginView"
})
</script>

<style scoped>

</style>