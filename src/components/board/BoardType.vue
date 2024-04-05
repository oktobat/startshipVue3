<template>
  <div class="boardType">
    <button v-for="item in type" :key="item" @click="onClick(item)" :class="{ on: active == item }">
      {{ item }}
    </button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(props, { emit }) {
    const store = useStore()
    const type = ref(['notice', 'review'])
    const active = ref(store.getters.fnGetBoardType)

    const onClick = (select) => {
      store.commit('change__Type', select)
      emit('changeType', select)
      active.value = select
    }

    onMounted(() => {
      active.value = store.getters.fnGetBoardType
    })

    return {
      type,
      active,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
.boardType {
  text-align: center;
  margin-top: 30px;
  button {
    margin: 20px;
    width: 100px;
    height: 40px;
    &.on {
      background: #000;
      color: #fff;
    }
  }
}
</style>
