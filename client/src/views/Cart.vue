<template>
  <div style="min-height: 76vh">
    <Loading v-if="isLoading" tip="Loading Cart..." />
    <div v-if="!carts.length && !isLoading" style="margin: auto; text-align: center">No Data</div>
    <a-card v-if="!isLoading && carts.length" title="Cart">
      <h3 slot="extra">
        <b>Total Price: {{ totalPrice | totalPriceCurrency }}</b>
      </h3>
      <CardCart v-for="cart in carts" :cart="cart" :key="cart.id" />
    </a-card>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import CardCart from '@/components/CardCart'
import Loading from '@/components/Loading'

export default {
  name: 'Cart',
  components: {
    CardCart,
    Loading
  },
  data () {
    return {}
  },
  filters: {
    totalPriceCurrency (value = 0) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value)
    }
  },
  computed: {
    ...mapState('cart', ['carts', 'isLoading']),
    ...mapGetters('cart', ['totalPrice'])
  },
  methods: {
    ...mapActions('cart', { findAllCarts: 'findAll' })
  },
  mounted () {
    this.findAllCarts()
  }
}
</script>
<style></style>
