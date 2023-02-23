<template>
  <div>
    <Loading v-if="isLoading" tip="Loading..." />
    <a-list
      :grid="{ gutter: 12, xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 4 }"
      :dataSource="products.products"
    >
      <a-list-item slot="renderItem" slot-scope="product, index">
        <a-card hoverable style="width: 300px; margin: auto">
          <img style="height: 200px" :alt="product.name" :src="product.image" slot="cover" />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="setting" />
            <a-icon @click="showDrawer(product._id)" type="edit" />
            <a-icon @click="deleteProduct(product._id)" type="delete" />
          </template>
          <a-card-meta
            :title="product.name"
            :description="product.description | descriptionTrancate"
          >
          </a-card-meta>
        </a-card>
      </a-list-item>
    </a-list>
    <EditForm v-if="visible" :visible="visible" :onClose="onClose" />
  </div>
</template>

<script>
import truncate from 'truncate'

import { mapState, mapActions } from 'vuex'
import Loading from '@/components/Loading'
import EditForm from '@/components/EditForm'

export default {
  name: 'AddProductList',
  props: ['products'],
  components: {
    Loading,
    EditForm
  },
  data () {
    return {
      isLoading: false,
      visible: false
    }
  },
  filters: {
    descriptionTrancate (v) {
      return truncate(v, 30, { ellipsis: null })
    }
  },
  methods: {
    ...mapActions('products', {
      findAllProducts: 'findAll',
      findOne: 'findOne'
    }),
    showDrawer (id) {
      this.isLoading = true
      this.findOne(id).then(product => {
        this.isLoading = false
        this.visible = true
      })
    },
    onClose () {
      this.visible = false
      this.productId = null
    },
    deleteProduct (id) {
      this.$confirm({
        title: 'Are you sure delete this product?',
        content: "You can't undo this action",
        okText: 'Yes, delete it',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          this.isLoading = true
          this.$store
            .dispatch('products/destroy', id)
            .then(res => {
              this.isLoading = false
              this.$message.success('Product deleted successfully', 3)
              this.findAllProducts()
            })
            .catch(err => {
              this.isLoading = false
              this.$message.error(err.response.data, 3)
              this.findAllProducts()
            })
        }
      })
    }
  }
}
</script>
<style></style>
