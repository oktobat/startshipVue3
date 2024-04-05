<template>
  <div class="cate__button">
    <button
      v-for="(item, index) in category"
      :key="index"
      @click="onClick(item)"
      :class="{ on: ontitle == item }"
    >
      {{ item }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup(props, { emit }) {
    const category = ['all', 'woman', 'man', 'underwear', 'kids']
    let ontitle = ref('all')
    const onClick = (name) => {
      emit('onChange', name)
      ontitle.value = name
    }
    return {
      category,
      ontitle,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
.cate__button {
  display: flex;
  justify-content: center;
  button {
    width: 100px;
    height: 40px;
    margin: 0 20px;
    background: blue;
    color: #fff;
    &.on {
      background: red;
    }
  }
}
</style>
