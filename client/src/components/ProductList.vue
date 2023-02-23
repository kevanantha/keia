<template>
  <div>
    <Loading v-if="products.isLoading" tip="Loading Products..." />
    <a-list
      :grid="{ gutter: 12, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }"
      :dataSource="products.products"
    >
      <a-list-item slot="renderItem" slot-scope="product, index">
        <a-card hoverable style="width: 300px; margin: auto">
          <img style="height: 200px" :alt="product.name" :src="product.image" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <router-link :to="product._id | detailProduct">
              <a-icon type="shopping" />
            </router-link>
            <!-- <a-icon type="edit" /> -->
            <!-- <a-icon @click="deleteProduct(product._id)" type="delete" /> -->
          </template>
          <!-- <a-card-meta -->
          <!--   :title="product.name" -->
          <!--   :description="product.description | descriptionTrancate" -->
          <!-- > -->
          <a-card-meta :title="product.name" :description="product.price | currency"> </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import truncate from 'truncate'

export default {
  name: 'AddProductList',
  components: {
    Loading
  },
  data () {
    return {
      isLoading: false
    }
  },
  filters: {
    currency (v) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(v)
    },
    detailProduct (v) {
      return `/products/${v}`
    }
  },
  computed: {
    ...mapState(['products'])
  },
  methods: {
    ...mapActions('products', {
      findAllProducts: 'findAll'
    })
  },
  mounted () {
    this.findAllProducts()
  }
}
</script>
<style></style>
