<template>
  <div>
    <el-row>
      <el-col :span="colSpan" :offset="colOffset" class="board">
        <div class="title">密码重置</div>
        <el-form
            :model="resetPasswordForm"
            :rules="resetPasswordRules"
            style="padding: 0 5vw;"
            @validate="onValidate"
            ref="resetPasswordFormRef">
          <el-form-item style="margin-bottom: 3vh" prop="email">
            <el-input type="email" v-model="resetPasswordForm.email" placeholder="注册用的邮箱地址" size="large">
              <template #prefix><el-icon><Message /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 3vh">
            <el-row style="width: 100%">
              <el-col :span="15">
                <el-input type="email" v-model="resetPasswordForm.validcode" placeholder="验证码" size="large">
                  <template #prefix><el-icon><EditPen /></el-icon></template>
                </el-input>
              </el-col>
              <el-col :span="8" :offset="1">
                <el-button type="success"
                           plain size="large"
                           :disabled="validcodeBtnDisable()"
                           @click="handleButtonClick"
                           style="width: 100%">{{validcodeBtnText}}</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="margin-bottom: 3vh" prop="password">
            <el-input type="password" v-model="resetPasswordForm.password" placeholder="输入新密码" size="large">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 3vh" prop="password_repeat">
            <el-input type="password" v-model="resetPasswordForm.password_repeat" placeholder="确认新密码" size="large">
              <template #prefix><el-icon><Lock /></el-icon></template>
            </el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 2vh">
            <el-button type="primary" plain size="large" style="width: 100%" @click="resetPassword">重置密码</el-button>
          </el-form-item>
          <el-link style="translate: 0 5px; color: gray; text-align: center; margin-top: 2vh; margin-bottom: 5vh; color: white" @click="router.push('/login')">返回登录</el-link>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {computed, onUnmounted, reactive, ref, watchEffect} from "vue";
import {post_json} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";
import {EditPen, Lock, Message} from "@element-plus/icons-vue";

const resetPasswordForm = reactive({
  email: '',
  validcode: ''
})

const validatePasswordRepeat = (rule, value, callback) => {
  if (value !== resetPasswordForm.password) {
    callback(new Error("两次输入的密码不一致"))
  } else {
    callback()
  }
}
const resetPasswordRules = {
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 100, message: '密码长度应在6-100之间', trigger: 'blur'},
  ],
  password_repeat: [
    {validator: validatePasswordRepeat, trigger: 'blur'},
  ],
  email: [
    { type: 'email', required: true, message: '请填入正确的邮箱地址', trigger: ['change', 'blur']},
  ],
  validcode: [
    {required: true, message: '验证码不能为空', trigger: 'blur'},
  ]
}

const isEmailValid = ref(false)
const validcodeBtnText = ref("发送验证码")
const disabledTime = ref(60)
const countdown = ref(disabledTime.value)
const inDisabledTime = ref(false)

const onValidate = (prop, isValid, message) => {
  if (prop === 'email') {
    isEmailValid.value = isValid
  }
}
const validcodeBtnDisable = () => {
  return !(isEmailValid.value && !inDisabledTime.value)
}

// 发送验证码按钮点击事件
function handleButtonClick() {
  inDisabledTime.value = true;

  post_json('/auth/validcode/resetPassword/' + resetPasswordForm.email,
      {},
      (data) => {
        ElMessage.success(data.resultMap.data)
      })

  const timer = setInterval(() => {
    countdown.value--;
    validcodeBtnText.value = `${countdown.value} 秒冷却`;
    if (countdown.value === 0) {
      clearInterval(timer); // 停止定时器
      inDisabledTime.value = false;
      validcodeBtnText.value = '发送验证码'; // 恢复按钮文本
      countdown.value = disabledTime.value; // 重置倒计时
    }
  }, 1000);

  // 在组件销毁时清除计时器，避免内存泄漏
  const clearTimer = () => {
    clearInterval(timer);
  };
  onUnmounted(clearTimer);
}

// 监听禁用时间变化，重置倒计时
watchEffect(() => {
  countdown.value = disabledTime.value;
});

const resetPasswordFormRef = ref()
const resetPassword = () => {
   resetPasswordFormRef.value.validate((isValid) => {
    if (isValid) {
      post_json('/auth/resetPassword/', {
        password: resetPasswordForm.password,
        validcode: resetPasswordForm.validcode,
        email: resetPasswordForm.email
      }, (data) => {
        ElMessage.success(data.resultMap.data)
        router.push('/login')
      })
    } else {
      ElMessage.warning('请正确填写信息')
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
export default {
  name: "resetPasswordView"
}
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
    margin-top: 6vh;
    border-radius: 10px;
    background-color: rgba(0,0,0,50%);
  }
}

@media (min-width: 481px) and (max-width: 1024px) {
  .board {
    margin-top: 10vh;
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
