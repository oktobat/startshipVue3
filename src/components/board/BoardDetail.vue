<template>
  <div class="boardDetail">
    <table border="1">
      <colgroup>
        <col />
        <col />
      </colgroup>
      <tbody>
        <tr>
          <td>작성자</td>
          <td>{{ item.writer }}</td>
        </tr>
        <tr>
          <td>제목</td>
          <td>{{ item.subject }}</td>
        </tr>
        <tr>
          <td>내용</td>
          <td>{{ item.content }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btn">
      <span v-if="showBtn">
        <router-link :to="{ name: 'communityModify', params: { id: item.id } }">수정</router-link>
        <button type="button" @click="onRemove(item.id)">삭제</button>
      </span>
      <router-link to="/communityList">목록</router-link>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  props: { type: String },
  setup(props) {
    const store = useStore()
    const router = useRouter()
    const item = ref(null)
    const showBtn = ref(false)

    if (props.type == 'notice') {
      item.value = store.getters.fnGetNoticeList.find(
        (item) => item.id == router.currentRoute.value.params.id
      )
    } else {
      item.value = store.getters.fnGetReviewList.find(
        (item) => item.id == router.currentRoute.value.params.id
      )
    }
    if (store.getters.fnGetLogined) {
      if (item.value.writer == store.getters.fnGetLogined.email) {
        showBtn.value = true
      }
    }
    store.commit('hit__Update', router.currentRoute.value.params.id)
    const onRemove = (id) => {
      store.commit('on__Remove', id)
      router.push('/communityList')
    }
    return { item, showBtn, onRemove }
  }
}
</script>

<style lang="scss" scoped>
.boardDetail {
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
