<template>
  <div class="boardWrite">
    <form @submit.prevent="onSubmit">
      <table border="1">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>작성자</td>
            <td><input type="text" v-model="writer" disabled /></td>
          </tr>
          <tr>
            <td>제목</td>
            <td><input type="text" v-model="subject" /></td>
          </tr>
          <tr>
            <td>내용</td>
            <td><textarea v-model="content"></textarea></td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button type="submit">작성</button>
        <router-link to="/communityList">목록</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: {
    type: String
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const writer = ref('')
    const subject = ref('')
    const content = ref('')
    writer.value = store.getters.fnGetLogined.email
    const onSubmit = () => {
      store.commit('on__Insert', {
        writer: writer.value,
        subject: subject.value,
        content: content.value,
        type: props.type
      })
      router.push('/communityList')
    }
    return { writer, subject, content, onSubmit }
  }
}
</script>

<style lang="scss" scoped>
.boardWrite {
  max-width: 600px;
  margin: 0 auto 50px;
  table {
    col:nth-child(1) {
      width: 100px;
    }
    col:nth-child(2) {
      width: auto;
    }
    td {
      padding: 5px;
      input {
        width: 100%;
        border: 1px solid #ddd;
        height: 30px;
        padding: 5px;
      }
      textarea {
        width: 100%;
        border: 1px solid #ddd;
        padding: 5px;
        height: 200px;
      }
    }
  }
  .btn {
    text-align: center;
    margin-top: 20px;
    button,
    a {
      margin: 0 10px;
      padding: 10px 20px;
      background: #ddd;
      font-size: 14px;
    }
  }
}
</style>
