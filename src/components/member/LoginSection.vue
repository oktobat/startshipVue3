<template>
  <div class="loginForm">
    <form @submit.prevent="fnLogin">
      <table border="0">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td><label for="userId">이메일 : </label></td>
            <td>
              <input type="email" id="userId" name="userId" v-model="dEmail" ref="emailInput" />
            </td>
          </tr>
          <tr>
            <td><label for="userPw">비밀번호 : </label></td>
            <td>
              <input type="password" id="userPw" name="userPw" v-model="dPassword" ref="pwInput" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button type="submit">로그인</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const dEmail = ref('')
    const dPassword = ref('')
    const emailInput = ref(null)
    const pwInput = ref(null)
    const fnLogin = () => {
      if (!dEmail.value) {
        alert('이메일을 입력하세요.')
        emailInput.value.focus()
        return false
      } else if (!dPassword.value) {
        alert('비밀번호를 입력하세요.')
        pwInput.value.focus()
        return false
      }
      store.commit('fnLogin', { email: dEmail.value, pw: dPassword.value })
      if (store.getters.fnGetLogined) {
        router.push(store.getters.fnGetPrevPath)
        store.state.prevPath = null // 이전 경로 초기화
      } else {
        alert('회원이 아닙니다.')
      }
    }
    return {
      dEmail,
      dPassword,
      fnLogin,
      emailInput,
      pwInput
    }
  }
}
</script>

<style lang="scss" scoped>
.loginForm {
  max-width: 600px;
  margin: 0px auto 50px;
  table {
    col:nth-child(1) {
      width: 150px;
    }
    col:nth-child(2) {
      width: auto;
    }
    td {
      padding: 5px;
      &:nth-child(1) {
        text-align: right;
      }
      input {
        border: 1px solid #ddd;
        height: 30px;
        width: 100%;
        text-indent: 1em;
      }
    }
  }
  .btn {
    text-align: center;
    margin-top: 20px;
    button {
      padding: 10px;
      background: red;
      color: #fff;
    }
  }
}
</style>
