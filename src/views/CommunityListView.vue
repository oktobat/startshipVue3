<template>
  <div id="community__list" class="row">
    <board-type @changeType="changeType" />
    <board-list :type="type" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import BoardType from '@/components/board/BoardType.vue'
import BoardList from '@/components/board/BoardList.vue'
export default {
  components: {
    BoardType,
    BoardList
  },
  setup() {
    const store = useStore()
    let type = ref(store.getters.fnGetBoardType)
    const changeType = (value) => {
      type.value = value
    }
    return {
      type,
      changeType
    }
  }
}
</script>

<style lang="scss" scoped></style>
