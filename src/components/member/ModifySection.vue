<template>
  <div class="modifyForm">
    <form @submit.prevent="fnModifyUser">
      <table border="0">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td><label for="userId">이메일 : </label></td>
            <td><input type="email" id="userId" name="userId" v-model="dEmail" disabled /></td>
          </tr>
          <tr>
            <td><label for="userPw">비밀번호 : </label></td>
            <td>
              <input type="password" id="userPw" name="userPw" v-model="dPassword" ref="pw" />
            </td>
          </tr>
          <tr>
            <td><label for="userPwOk">비밀번호 확인 : </label></td>
            <td><input type="password" id="userPwOk" v-model="dPasswordOk" ref="pwok" /></td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button type="submit">정보수정</button>
        <button type="button" @click="onClick">회원탈퇴</button>
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
    const pw = ref('')
    dEmail.value = store.getters.fnGetLogined.email
    pw.value = store.getters.fnGetLogined.pw

    const fnModifyUser = (e) => {
      if (!dPassword.value) {
        alert('비밀번호를 입력하세요.')
        e.preventDefault()
      } else if (!dPasswordOk.value) {
        alert('비밀번호를 입력하세요.')
        e.preventDefault()
      } else if (dPassword.value !== dPasswordOk.value) {
        alert('비밀번호가 맞지 않습니다.')
        e.preventDefault()
      }
      store.commit('fnModifyUser', { email: dEmail.value, pw: dPassword.value })
      router.push('/')
    }
    const onClick = (e) => {
      if (!dPassword.value) {
        alert('비밀번호를 입력하세요.')
        e.preventDefault()
      } else if (!dPasswordOk.value) {
        alert('비밀번호를 입력하세요.')
        e.preventDefault()
      } else if (dPassword.value !== dPasswordOk.value || dPassword.value !== pw.value) {
        alert('비밀번호가 맞지 않습니다.')
        e.preventDefault()
      } else {
        let answer = confirm('정말로 탈퇴하시겠습니까?')
        if (!answer) e.preventDefault()
      }
      store.commit('memberPostRemove', dEmail.value)
      store.commit('fnRemoveUser', dEmail.value)
      store.commit('fnLogout')
      router.push('/')
    }
    return { dEmail, dPassword, dPasswordOk, pw, fnModifyUser, onClick }
  }
}
</script>

<style lang="scss" scoped>
.modifyForm {
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
      margin: 0 10px;
    }
  }
}
</style>
