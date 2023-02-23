<template>
  <div>
    <Loading v-if="isLoading" tip="Loading..." />
    <a-card v-if="!isLoading" style="margin-bottom: 2rem" :title="cart.product.name">
      <div slot="extra">{{ cart.total_price | totalPriceCurrency }}</div>
      <div style="display: flex">
        <img :src="cart.product.image" height="100px" :alt="cart.product.name" />
        <a-form style="margin-left: 2rem">
          <a-form-item label="Quantity">
            <a-input-number
              :min="0"
              :max="cart.product.stock"
              :value="cart.quantity"
              @change="update"
            />
            <a-button
              @click="deleteCart(cart._id)"
              type="danger"
              size="small"
              style="margin-left: 1rem"
            >
              <a-icon type="delete" />
            </a-button>
          </a-form-item>
          <a-button :disabled="cart.quantity < 1" type="primary" html-type="submit">
            Checkout
          </a-button>
        </a-form>
      </div>
    </a-card>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { mapActions } from 'vuex'

export default {
  name: 'CardCart',
  components: {
    Loading
  },
  props: ['cart'],
  data () {
    return {
      isLoading: false
    }
  },
  filters: {
    totalPriceCurrency (value) {
      return new Intl.NumberFormat('in-ID', { style: 'currency', currency: 'IDR' }).format(value)
    }
  },
  methods: {
    ...mapActions('cart', ['findAll']),
    deleteCart (id) {
      this.$confirm({
        title: 'Are you sure delete this cart?',
        content: "You can't undo this action",
        okText: 'Yes, delete it',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.isLoading = true
          this.$store
            .dispatch('cart/destroy', id)
            .then(_ => {
              this.isLoading = false
              this.$message.success('Cart deleted successfully', 3)
              this.findAll()
            })
            .catch(err => {
              this.$message.error(err.response.data, 3)
            })
        }
      })
    },
    update (v) {
      this.$store.commit('cart/updateQty', {
        id: this.cart.id,
        qty: v,
        totalPrice: v * this.cart.product.price
      })
      this.$store
        .dispatch('cart/updateQty', {
          id: this.cart.id,
          qty: v,
          totalPrice: v * this.cart.product.price
        })
        .catch(err => {
          this.$message.error(err.response.data)
        })
    }
  }
}
</script>
