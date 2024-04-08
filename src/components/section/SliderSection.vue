<template>
  <section id="sliderSection">
    <div class="slide__inner">
      <swiper
        class="swiper"
        :slides-per-view="1"
        :space-between="0"
        :navigation="true"
        :pagination="{ clickable: true }"
        :loop="true"
        :autoplay="true"
        :delay="2000"
      >
        <swiper-slide v-for="(slider, index) in sliders" :key="index">
          <img :src="slider.image" :alt="slider.alt" />
          <router-link :to="slider.href" class="detail">자세히보기</router-link>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue'
import SwiperCore, { Navigation, Pagination, A11y, Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
// import 'swiper/swiper.scss'
// import 'swiper/components/navigation/navigation.scss'
// import 'swiper/components/pagination/pagination.scss'
import '@/assets/css/myswiper.css'
SwiperCore.use([Navigation, Pagination, A11y, Autoplay])

export default {
  name: 'SliderSection',
  components: {
    Swiper,
    SwiperSlide
  },
  setup() {
    const sliders = ref([
      { image: './assets/image/main_slide_crvt_24205_pc_02.jpg', alt: '이미지1', href: '/aboutus' },
      { image: './assets/image/main_slide_crvt_240111_pc.jpg', alt: '이미지2', href: '/actor' },
      { image: './assets/image/main_slide_jsw_231212_pc.jpg', alt: '이미지3', href: '/artist' }
    ])
    return {
      sliders
    }
  }
}
</script>

<style lang="scss" scoped>
.swiper {
  .detail {
    width: 200px;
    height: 50px;
    border-radius: 25px;
    background: rgba(0, 0, 0, 0.5);
    color: #fff;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
