<template>
  <div class="boardList">
    <table border="1">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>날짜</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in showList" :key="index">
          <td>{{ countMinus(index) }}</td>
          <td>
            <router-link :to="{ name: 'communityDetail', params: { id: item.id } }">{{
              item.subject
            }}</router-link>
          </td>
          <td>{{ item.writer }}</td>
          <td>{{ item.date }}</td>
          <td>{{ item.hit }}</td>
        </tr>
      </tbody>
    </table>
    <div class="btn" v-if="showBtn">
      <router-link to="/communityWrite"> 글쓰기 </router-link>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  props: ['type'],
  setup(props) {
    const store = useStore()
    const email = ref('')
    const count = ref(0)

    const showBtn = computed(() => {
      if (props.type === 'notice' && email.value === 'tsalt@hanmail.net') {
        return true
      } else if (props.type === 'notice' && email.value !== 'tsalt@hanmail.net') {
        return false
      } else if (props.type === 'review' && email.value) {
        return true
      } else if (props.type === 'review' && !email.value) {
        return false
      }
    })

    const showList = computed(() => {
      if (props.type === 'notice') {
        count.value = store.getters.fnGetNoticeList.length
        return store.getters.fnGetNoticeList
      } else {
        count.value = store.getters.fnGetReviewList.length
        return store.getters.fnGetReviewList
      }
    })

    const countMinus = (index) => {
      return count.value - index
    }

    onMounted(() => {
      if (store.getters.fnGetLogined) {
        email.value = store.getters.fnGetLogined.email
        console.log(email.value)
      }
    })

    return {
      email,
      count,
      showBtn,
      showList,
      countMinus
    }
  }
}
</script>

<style lang="scss" scoped>
.boardList {
  margin: 0px 0 50px;
  table {
    col:nth-child(1) {
      width: 50px;
    }
    col:nth-child(2) {
      width: auto;
    }
    col:nth-child(3) {
      width: 200px;
    }
    col:nth-child(4) {
      width: 100px;
    }
    col:nth-child(5) {
      width: 100px;
    }
    th {
      padding: 5px;
    }
    td {
      padding: 5px;
      text-align: center;
      &:nth-child(2) {
        text-align: left;
      }
    }
  }
  .btn {
    text-align: center;
    margin: 20px 0;
    a {
      padding: 10px 20px;
      background: red;
      color: #fff;
    }
  }
}
</style>
