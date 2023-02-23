<template>
  <div :style="{ background: '#fff', padding: '24px', minHeight: '81vh' }">
    <Carousel />
    <div class="mt-3">
      <FeaturedProduct />
    </div>
    <ProductList />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import FeaturedProduct from '@/components/FeaturedProduct'
import ProductList from '@/components/ProductList'

export default {
  name: 'Home',
  components: {
    Carousel,
    FeaturedProduct,
    ProductList
  }
}
</script>

<style scoped>
.mt-3 {
  margin-top: 3rem;
}
</style>
