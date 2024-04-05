<template>
  <div class="tag__list">
    <button
      :class="{ active: activeName == item.name }"
      v-for="(item, index) in movieType"
      :key="index"
      @click="onClick(item.media, item.type, item.name)"
    >
      {{ item.name }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup(props, { emit }) {
    const store = useStore()
    const activeName = ref('인기 영화')
    const movieType = [
      { name: '인기 영화', media: 'movie', type: 'popular' },
      { name: '현재 상영', media: 'movie', type: 'now_playing' },
      { name: '최신 영화', media: 'movie', type: 'upcoming' },
      { name: '인기 TV SHOW', media: 'tv', type: 'popular' },
      { name: 'TV 순위', media: 'tv', type: 'top_rated' },
      { name: 'TV SHOW', media: 'tv', type: 'on_the_air' }
    ]

    const onClick = (media, type, name) => {
      // this.$emit("onSearch", { media, type })
      store.commit('on__Update', { media, type, name })
      emit('onSearch', 1)
      emit('update:currentPage', 1)
      activeName.value = name
    }
    return {
      activeName,
      movieType,
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
    flex: 0 0 120px;
    border: 1px solid #00c183;
    padding: 10px 0px;
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
