<template>
  <div class="cartTable">
    <table border="1">
      <colgroup>
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>
      <thead>
        <tr>
          <th>이미지</th>
          <th>상품명</th>
          <th>수량</th>
          <th>가격</th>
          <th>기타</th>
        </tr>
      </thead>
      <tbody v-if="carts.length">
        <tr v-for="(item, index) in products" :key="index">
          <td>
            <img :src="item.product.image" alt="" />
          </td>
          <td>{{ item.product.title }}({{ formatPrice(item.product.price) }})</td>
          <td>
            <input
              type="number"
              v-model="item.qty"
              @input="onInput($event, item.product.id, item.qty)"
              min="1"
            />
          </td>
          <td>
            {{ formatPrice(item.product.price * item.qty) }}
          </td>
          <td>
            <button type="button" @click="onRemoveItem(item.product.id)">삭제</button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="5" style="padding: 100px 0; text-align: center; font-size: 30px">
            장바구니가 비어 있습니다.
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            합계 : {{ formatPrice(calculateTotal) }}<br />
            주문상품수량 : {{ itemCount }}종 {{ allCount }}개
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    let products = ref([])
    let carts = ref([])

    carts.value = store.getters.fnGetCarts
    console.log(carts.value)
    for (let i in carts.value) {
      let product = store.getters.fnGetProducts.find((item) => item.id == carts.value[i].id)
      products.value.push({ product, qty: carts.value[i].qty })
    }

    const calculateTotal = computed(() => {
      return products.value.reduce((acc, item) => acc + item.qty * item.product.price, 0)
    })
    const itemCount = computed(() => {
      return carts.value.length
    })
    const allCount = computed(() => {
      return carts.value.reduce((acc, item) => acc + parseInt(item.qty), 0)
    })
    const onInput = (e, id, qty) => {
      if (qty < 1 || e.target.value < 1) {
        qty = 1
        e.target.value = 1
      }
      store.commit('qty__Update', { id, qty })
    }
    const onRemoveItem = (id) => {
      products.value = products.value.filter((item) => item.product.id !== id)
      carts.value = carts.value.filter((item) => item.id !== id)
      store.commit('item__Remove', id)
    }
    const formatPrice = (price) => {
      if (!parseInt(price)) {
        return ''
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
      products,
      carts,
      calculateTotal,
      itemCount,
      allCount,
      onInput,
      onRemoveItem,
      formatPrice
    }
  }
}
</script>

<style lang="scss" scoped>
.cartTable {
  col:nth-child(1) {
    width: 100px;
  }
  col:nth-child(2) {
    width: auto;
  }
  col:nth-child(3) {
    width: 100px;
  }
  col:nth-child(4) {
    width: 100px;
  }
  col:nth-child(5) {
    width: 100px;
  }
  th,
  td {
    padding: 7px;
  }
  tbody {
    td:nth-child(3) {
      text-align: center;
      input {
        border: 1px solid #000;
        text-align: center;
        padding: 5px 0;
        width: 50px;
      }
    }
    td:nth-child(4) {
      text-align: right;
    }
    td:nth-child(5) {
      text-align: center;
      button {
        padding: 5px 8px;
        border-radius: 3px;
        background: red;
        color: #fff;
      }
    }
  }
  tfoot {
    td {
      text-align: center;
    }
  }
}
</style>
