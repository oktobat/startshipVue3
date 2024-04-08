<template>
  <div>
    <kakao-map :keyword="text" />
  </div>
</template>

<script>
import KakaoMap from '@/components/layout/KakaoMap.vue'
export default {
  components: {
    KakaoMap
  },
  data() {
    return {
      text: '강남 영화관'
    }
  }
}
</script>

<style lang="scss" scoped></style>
