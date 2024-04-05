<template>
  <div class="boardModify">
    <form @submit.prevent="onSubmit">
      <table border="1">
        <colgroup>
          <col />
          <col />
        </colgroup>
        <tbody>
          <tr>
            <td>작성자</td>
            <td><input type="text" v-model="writerInput" disabled /></td>
          </tr>
          <tr>
            <td>제목</td>
            <td><input type="text" v-model="subjectInput" /></td>
          </tr>
          <tr>
            <td>내용</td>
            <td><textarea v-model="contentInput"></textarea></td>
          </tr>
        </tbody>
      </table>
      <div class="btn">
        <button type="submit">완료</button>
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
    const idInput = ref('')
    const writerInput = ref('')
    const subjectInput = ref('')
    const contentInput = ref('')

    if (props.type == 'notice') {
      let { id, writer, subject, content } = store.getters.fnGetNoticeList.find(
        (item) => item.id == router.currentRoute.value.params.id
      )
      idInput.value = id
      writerInput.value = writer
      subjectInput.value = subject
      contentInput.value = content
    } else {
      let { id, writer, subject, content } = store.getters.fnGetReviewList.find(
        (item) => item.id == router.currentRoute.value.params.id
      )
      idInput.value = id
      writerInput.value = writer
      subjectInput.value = subject
      contentInput.value = content
    }
    const onSubmit = () => {
      store.commit('on__Update', {
        id: idInput.value,
        subject: subjectInput.value,
        content: contentInput.value
      })
      router.push('/communityList')
    }
    return { idInput, writerInput, subjectInput, contentInput, onSubmit }
  }
}
</script>

<style lang="scss" scoped>
.boardModify {
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
