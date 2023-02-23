<template>
  <div style="text-align: center; min-height: 80vh">
    <Loading v-if="isLoading" tip="Loading Product..." />
    <div style="">
      <a-card hoverable style="width: 300px; margin: auto">
        <img
          style="height: 100%; width: 100%"
          :alt="product.name"
          :src="product.image"
          slot="cover"
        />
        <div>
          <a-input-number
            :min="1"
            placeholder="quantity"
            v-model="quantity"
            :max="product.stock"
            @change="onChange"
          />
          stock: {{ product.stock }}
          <div style="margin: 1.5rem 0">
            <small>Total Price: </small>
            <h3 v-model="totalPrice">{{ totalPrice | totalPriceCurrency }}</h3>
          </div>
          <a-button @click="addToCart(product._id)" icon="shopping-cart">Add to cart</a-button>
        </div>
      </a-card>
      <div class="text-center" style="margin-top: 2rem">
        <h1>{{ product.name }}</h1>
        <p>
          {{ product.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Loading from '@/components/Loading'

export default {
  name: 'DetailProduct',
  components: {
    Loading
  },
  data() {
    return {
      quantity: 1
    }
  },
  methods: {
    ...mapActions('products', ['findOne']),
    ...mapActions('cart', { findAllCart: 'findAll' }),
    onChange(value) {},
    addToCart(productId) {
      if (!localStorage.getItem('token')) {
        this.$message.error('You need to login first', 3)
        this.$router.push('/').catch(err => {})
      } else {
        this.$store
          .dispatch('cart/create', {
            productId,
            quantity: this.quantity,
            totalPrice: this.totalPrice
          })
          .then(res => {
            this.$router.push('/cart')
            this.$message.success('Added to cart successfully', 3)
            this.findAllCart()
          })
          .catch(err => {
            this.$message.error(err.response.data, 3)
          })
      }
    }
  },
  computed: {
    ...mapState('products', ['product', 'isLoading']),
    ...mapState('cart', ['carts']),
    totalPrice() {
      return this.product.price * this.quantity
    }
  },
  filters: {
    totalPriceCurrency(value) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value)
    }
  },
  mounted() {
    this.findOne(this.$route.params.productId).catch(err => {
      this.$message.error(err.response.data, 3)
    })
    this.findAllCart()
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
  margin: auto;
  width: 50%;
}
</style>
