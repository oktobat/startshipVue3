<script setup>
import { ref } from 'vue'
const emit = defineEmits(['onSearch'])
const inputRef = ref('')

function onKeyPress(event) {
  if (event.key === 'Enter') {
    onSearch()
  }
}

function onClick() {
  onSearch()
}

function onSearch() {
  console.log(inputRef.value)
  if (inputRef.value) {
    emit('onSearch', inputRef.value)
    inputRef.value = ''
  }
}
</script>

<template>
  <div class="actor__search">
    <input
      v-model="inputRef"
      type="text"
      placeholder="검색어를 입력하세요."
      @keypress="onKeyPress"
    />
    <button type="button" @click="onClick">검색하기</button>
  </div>
</template>

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
