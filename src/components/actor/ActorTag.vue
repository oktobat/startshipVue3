<template>
  <div>
    <div class="tag__list">
      <button
        :class="{ active: activeName == item.name }"
        @click="onClick(item.name)"
        type="button"
        v-for="(item, itemIndex) in actorName"
        :key="itemIndex"
      >
        {{ item.name }}
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'ActorTag',
  setup({ emit }) {
    const activeName = ref('')
    const actorName = ref([
      { name: '이동욱' },
      { name: '유연석' },
      { name: '김범' },
      { name: '손우현' },
      { name: '이동욱1' },
      { name: '유연석1' },
      { name: '김범1' },
      { name: '손우현1' },
      { name: '이동욱2' },
      { name: '유연석2' },
      { name: '김범2' },
      { name: '손우현2' }
    ])
    const onClick = (name) => {
      activeName = name
      emit('onSearch', name)
    }
    return {
      activeName,
      actorName,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
.tag__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  button {
    flex: 0 0 100px;
    border: 1px solid #00c183;
    padding: 10px 20px;
    margin: 0 10px 10px;
    color: #00c183;
    background: #fff;
    &.active,
    &:hover {
      color: #fff;
      background: #00c183;
    }
  }
}
</style>
