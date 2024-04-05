<template>
  <div class="product__list">
    <div class="btn">
      <button @click="sortProduct('title')" :class="{ on: flag == '상품명순' }">상품명순</button>
      <button @click="sortProduct('price')" :class="{ on: flag == '가격순' }">가격순</button>
    </div>
    <transition-group name="translist" tag="ul" class="ulbox">
      <li v-for="item in products" :key="item.id">
        <div class="photo">
          <router-link :to="{ name: 'Id', params: { id: item.id } }"
            ><img :src="item.image" alt=""
          /></router-link>
        </div>
        <div class="info">
          <p>
            <a href="#">{{ item.title }}</a>
          </p>
          <p>{{ formatPrice(item.price) }}</p>
          <p class="rating">
            <span v-for="n in 5" :key="n" :class="{ active: checkRating(n, item.rating) }">☆</span>
          </p>
          <button @click="addToCart(item.id)" v-if="canAddToCart(item)">
            <i class="fa-solid fa-cart-plus"></i>
          </button>
          <button disabled="true" v-else><i class="fa-solid fa-cart-shopping"></i></button>
          <span v-if="canAddToCart(item)"
            >{{ item.inventory - cartIdCount(item.id) }}개 남았습니다.</span
          >
          <span v-else>품절!</span>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  props: {
    title: String
  },
  setup(props) {
    const store = useStore()
    let flag = ref('')
    let titleFlag = ref(false)
    let items = ref([])

    const products = computed(() => {
      if (props.title == 'all') {
        items.value = store.getters.fnGetProducts
      } else {
        items.value = store.getters.fnGetProducts.filter((item) => item.category == props.title)
      }
      return items.value
    })

    const sortProduct = (keyname) => {
      if (keyname == 'title') {
        flag.value = '상품명순'
      } else {
        flag.value = '가격순'
      }
      titleFlag.value = !titleFlag.value
      if (titleFlag.value) {
        store.getters.fnGetProducts.sort((a, b) => (a[keyname] < b[keyname] ? -1 : 1))
      } else {
        store.getters.fnGetProducts.sort((a, b) => (a[keyname] > b[keyname] ? -1 : 1))
      }
    }
    const checkRating = (num, rating) => {
      return rating - num >= 0
    }
    const addToCart = (id) => {
      store.commit('add__Cart', id)
      console.log(store.getters.fnGetCarts)
    }
    const cartIdCount = (id) => {
      let findItem = store.getters.fnGetCarts.find((item) => item.id == id)
      if (findItem) {
        return findItem.qty
      } else {
        return 0
      }
    }
    const canAddToCart = (product) => {
      return product.inventory > cartIdCount(product.id)
    }
    const formatPrice = (price) => {
      if (!parseInt(price)) {
        return false
      }
      if (price > 999) {
        let priceString = String(price)
        let priceArray = priceString.split('').reverse()
        let index = 0
        while (priceArray.length > index + 3) {
          priceArray.splice(index + 3, 0, ',')
          index += 4
        }
        return priceArray.reverse().join('') + '원'
      }
    }
    return {
      flag,
      titleFlag,
      items,
      products,
      sortProduct,
      checkRating,
      addToCart,
      cartIdCount,
      canAddToCart,
      formatPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.product__list {
  margin-bottom: 50px;
  .btn {
    button {
      margin: 0 5px;
      padding: 5px 10px;
      &.on {
        background: red;
      }
    }
  }
  .ulbox {
    border: 1px solid #000;
    display: flex;
    flex-wrap: wrap;
    li {
      flex: 0 0 21%;
      margin: 20px 2%;
      .info {
        .rating {
          span {
            position: relative;
            &.active:before {
              content: '\2605';
              position: absolute;
              top: 0;
              left: 0;
            }
          }
        }
        button {
          background: none;
          font-size: 20px;
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .ulbox {
      li {
        flex: 0 0 46%;
        margin: 20px 2%;
      }
    }
  }
}

.translist-enter-active,
.translist-leave-active {
  transition: all 0.5s;
}
.translist-enter,
.translist-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
