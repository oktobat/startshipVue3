<template>
  <div class="joinForm">
    <form @submit.prevent="fnRegisterUser">
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
          <tr>
            <td><label for="userPwOk">비밀번호 확인 : </label></td>
            <td><input type="password" id="userPwOk" v-model="dPasswordOk" ref="pwokInput" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button type="submit">회원가입</button>
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
    const dPasswordOk = ref('')
    const emailInput = ref(null)
    const pwInput = ref(null)
    const pwokInput = ref(null)
    const fnRegisterUser = () => {
      if (!dEmail.value) {
        alert('이메일을 입력하세요.')
        emailInput.value.focus()
        return false
      } else if (!dPassword.value) {
        alert('비밀번호를 입력하세요.')
        pwInput.value.focus()
        return false
      } else if (!dPasswordOk.value) {
        alert('비밀번호를 입력하세요.')
        pwokInput.value.focus()
        return false
      } else if (dPassword.value !== dPasswordOk.value) {
        alert('비밀번호가 맞지 않습니다.')
        pwokInput.value.focus()
        return false
      }
      store.commit('fnRegisterUser', { email: dEmail.value, pw: dPassword.value })
      if (store.getters.fnGetMessage) {
        alert('회원가입이 성공했습니다.')
        dEmail.value = ''
        dPassword.value = ''
        dPasswordOk.value = ''
        router.push('/login')
      } else {
        alert('중복된 이메일입니다.')
      }
    }
    return {
      dEmail,
      dPassword,
      dPasswordOk,
      emailInput,
      pwInput,
      pwokInput,
      fnRegisterUser
    }
  }
}
</script>

<style lang="scss" scoped>
.joinForm {
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
