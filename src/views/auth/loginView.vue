<template>
  <div style="width: 100%; height: 100%; overflow: hidden">
    <el-row>
      <el-col :span="colSpan" :offset="colOffset" class="board">
        <div class="title">登录</div>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" style="padding: 0 5vw;">
          <el-form-item style="margin-bottom: 3vh" prop="username">
            <el-input type="text" @keyup.enter="login()" v-model="loginForm.username" placeholder="用户名或邮箱" size="large">
              <template #prefix><el-icon><User /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 3vh" prop="password">
            <el-input type="password" @keyup.enter="login()" v-model="loginForm.password" placeholder="密码" size="large">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 2vh">
            <el-row style="width: 100%;">
              <el-col :span="12" style="text-align: left">
                <el-checkbox v-model="loginForm.remember" label="记住我" size="large" style="color: white"/>
              </el-col>
              <el-col :span="12" style="text-align: right;">
                <el-link style="translate: 0 5px; color: white" @click="router.push('/resetPassword')">忘记密码？</el-link>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-top: 4vh; margin-bottom: 1vh;">
            <el-button @click="login()" type="primary" plain size="large" style="width: 100%">登录</el-button>
          </el-form-item>
          <el-divider>
            <span style="color: gray">没有账号？</span>
          </el-divider>
          <el-button type="warning" plain size="large" style="width: 100%; margin-bottom: 5vh" @click="router.push('/register')">注册</el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script setup>
import {Lock, User} from "@element-plus/icons-vue";
import {computed, reactive, ref} from "vue";
import {post_form} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useStore} from "vuex";

const store = useStore()

const loginForm = reactive({
  username: '',
  password: '',
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
      post_form('/login', {
        username: loginForm.username,
        password: loginForm.password,
        remember: loginForm.remember
      }, (response) => {
        let jwt = response.headers['authorization']
        if (jwt) {
          localStorage.setItem('jwt', jwt)
          store.dispatch('handleLoginSuccessForJwt', jwt)
        }
        ElMessage.success(response.data.result)
        router.push('/profile')
      })
    } else {
      ElMessage.warning('请正确填写登录信息')
    }
  })
}

const colSpan = computed(() => {
  return window.innerWidth <= 570 ? 24 : 16
})

const colOffset = computed(() => {
  return window.innerWidth <= 570 ? 0 : 4;
});

</script>

<script>
import {defineComponent} from "vue";
export default defineComponent({
  name: "loginView"
})
</script>

<style scoped>
.title {
  color: white;
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin: 5vh
}

@media (max-width: 480px) {
  .board {
    margin-top: 5vh;
    border-radius: 10px;
    background-color: rgba(0,0,0,50%);
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .board {
    margin-top: 12vh;
    border-radius: 10px;
    background-color: rgba(0,0,0,50%);
  }
}

@media (min-width: 1025px) {
  .board {
    margin-top: 6vh;
    border-radius: 10px;
    background-color: rgba(0,0,0,50%);
  }
}
</style>
