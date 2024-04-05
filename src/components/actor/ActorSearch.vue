<template>
  <div class="actor__search">
    <input ref="inputRef" type="text" placeholder="검색어를 입력하세요." @keypress="onKeyPress" />
    <button type="button" @click="onClick">검색하기</button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ActorSearch',
  setup(props, { emit }) {
    let inputRef = ref('')

    const onKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearch()
      }
    }

    const onClick = () => {
      onSearch()
    }

    const onSearch = () => {
      console.log(inputRef.value.value)
      if (inputRef.value.value) {
        emit('onSearch', inputRef.value.value)
        inputRef.value.value = ''
      }
    }

    return {
      inputRef,
      onKeyPress,
      onClick,
      onSearch
    }
  }
}
</script>

<style lang="scss" scoped>
.actor__search {
  text-align: center;
  margin-bottom: 70px;
  input {
    border: 1px solid #e8ecf2;
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 50px;
    max-width: 300px;
    margin-right: 10px;
  }
  button {
    color: #fff;
    background: #00c183;
    border-radius: 50px;
    padding: 10px 50px;
  }
}
</style>
