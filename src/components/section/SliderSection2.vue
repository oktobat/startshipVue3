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
  name: 'SliderSection2',
  components: { Swiper, SwiperSlide },
  props: { slideAni: Boolean },
  setup() {
    const sliders = ref([
      {
        currentImage: './assets/image/p_cravity_g.jpg',
        image1: './assets/image/p_cravity_g.jpg',
        image2: './assets/image/p_cravity.jpg',
        alt: '김은영'
      },
      {
        currentImage: './assets/image/p_ive_g.jpg',
        image1: './assets/image/p_ive_g.jpg',
        image2: './assets/image/p_ive.jpg',
        alt: '홍길동'
      },
      {
        currentImage: './assets/image/p_jeongsewoon_g.jpg',
        image1: './assets/image/p_jeongsewoon_g.jpg',
        image2: './assets/image/p_jeongsewoon.jpg',
        alt: '장나라'
      },
      {
        currentImage: './assets/image/p_cravity_g.jpg',
        image1: './assets/image/p_cravity_g.jpg',
        image2: './assets/image/p_cravity.jpg',
        alt: '김은영'
      },
      {
        currentImage: './assets/image/p_ive_g.jpg',
        image1: './assets/image/p_ive_g.jpg',
        image2: './assets/image/p_ive.jpg',
        alt: '홍길동'
      },
      {
        currentImage: './assets/image/p_jeongsewoon_g.jpg',
        image1: './assets/image/p_jeongsewoon_g.jpg',
        image2: './assets/image/p_jeongsewoon.jpg',
        alt: '장나라'
      },
      {
        currentImage: './assets/image/p_cravity_g.jpg',
        image1: './assets/image/p_cravity_g.jpg',
        image2: './assets/image/p_cravity.jpg',
        alt: '김은영'
      },
      {
        currentImage: './assets/image/p_ive_g.jpg',
        image1: './assets/image/p_ive_g.jpg',
        image2: './assets/image/p_ive.jpg',
        alt: '홍길동'
      },
      {
        currentImage: './assets/image/p_jeongsewoon_g.jpg',
        image1: './assets/image/p_jeongsewoon_g.jpg',
        image2: './assets/image/p_jeongsewoon.jpg',
        alt: '장나라'
      }
    ])
    function changeImage(index, isMouseOver) {
      const slider = this.sliders[index]
      slider.currentImage = isMouseOver ? slider.image2 : slider.image1
    }
    return {
      sliders,
      changeImage
    }
  }
}
</script>

<template>
  <section id="sliderSection2" :class="{ row: true, on: slideAni }">
    <div class="slide__inner">
      <swiper
        class="swiper"
        :slides-per-view="5"
        :space-between="50"
        :navigation="true"
        :pagination="false"
        :loop="true"
        :autoplay="true"
        :delay="2000"
      >
        <swiper-slide v-for="(slider, index) in sliders" :key="index">
          <img
            :src="slider.currentImage"
            :alt="slider.alt"
            @mouseover="changeImage(index, true)"
            @mouseout="changeImage(index, false)"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<style lang="scss" scoped>
#sliderSection2 {
  margin: 100px auto;
  transform: translateY(100%);
  transition: all 0.5s;
  &.on {
    transform: translateY(0%);
  }
  .slide__inner {
    padding: 0 50px;
    overflow: hidden;
    .swiper {
      img {
        border-radius: 20px;
        cursor: pointer;
      }
    }
  }
}
</style>
