<template>
  <main>
    <slider-section />
    <slider-section2 :slideAni="slideAni" />
    <new-arrival />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue'
import SliderSection from '@/components/section/SliderSection.vue'
import SliderSection2 from '@/components/section/SliderSection2.vue'
import NewArrival from '@/components/section/NewArrival.vue'

export default {
  name: 'HomeView',
  components: {
    SliderSection,
    SliderSection2,
    NewArrival
  },
  setup() {
    let slideAni = ref(false)
    let newAni = ref(false)

    const handleScroll = () => {
      console.log(window.scrollY)
      if (window.scrollY > 300) {
        slideAni.value = true
      } else {
        slideAni.value = false
      }
      if (window.scrollY > 600) {
        newAni.value = true
      } else {
        newAni.value = false
      }
    }

    onMounted(() => {
      document.addEventListener('scroll', handleScroll)
    })

    return {
      slideAni,
      newAni
    }
  }
}
</script>

<style lang="scss" scoped></style>
