<template>
  <div id="product__wrap" class="row">
    <section-title title="product" />
    <product-category @onChange="onChange" />
    <product-section :title="title" />
  </div>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import SectionTitle from '@/components/layout/SectionTitle.vue'
import ProductCategory from '@/components/product/ProductCategory.vue'
import ProductSection from '@/components/product/ProductSection.vue'
export default {
  name: 'ProductView',
  components: {
    SectionTitle,
    ProductCategory,
    ProductSection
  },
  setup() {
    const store = useStore()
    let title = ref('all')
    store.dispatch('init__Store')
    const onChange = (name) => {
      title.value = name
    }
    return {
      title,
      onChange
    }
  }
}
</script>

<style lang="scss" scoped></style>
