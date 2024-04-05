<template>
  <div class="detailBox">
    <h2>{{ product.title }}</h2>
    <div class="content">
      <div class="photo">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="info">
        <p>이 상품의 아이디는 {{ product.id }}</p>
        <p>카테고리 : {{ product.category }}</p>
        <p>가격 : {{ product.price }}</p>
        <p>요약설명 : <span v-html="product.description"></span></p>
        <p v-if="showBtn"><button type="button" @click="onClick">리뷰쓰기</button></p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
  setup() {
    const store = useStore()
    const router = useRouter()

    let product = ref(null)
    let showBtn = ref(false)

    product.value = store.getters.fnGetProducts.find(
      (item) => item.id == router.currentRoute.value.params.id
    )
    if (store.getters.fnGetLogined) {
      showBtn.value = true
    } else {
      showBtn.value = false
    }

    // 개발할때 상세이미지 경로
    product.value.image = '/' + product.value.image

    // build 할때 상세이미지 경로
    // product.value.image = '/starMart/'+product.value.image

    const onClick = () => {
      store.commit('change__Type', 'review')
      router.push('/communityWrite')
    }

    return {
      product,
      showBtn,
      onClick
    }
  }
}
</script>

<style lang="scss" scoped>
.detailBox {
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    .photo {
      width: 300px;
      margin-right: 50px;
    }
    .info {
      flex: 1;
      button {
        background: red;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0;
      }
    }
  }
}
</style>
