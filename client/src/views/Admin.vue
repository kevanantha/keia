<template>
  <a-layout style="min-height: 81vh" id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null" collapsible v-model="collapsed">
      <div class="logo" />
      <a-menu theme="dark" mode="inline">
        <a-menu-item key="1">
          <router-link to="/admin">
            <a-icon type="ordered-list" />
            <span>Products</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/admin/add-product">
            <a-icon type="upload" />
            <span>Add Product</span>
          </router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/admin">
            <a-icon type="shopping" />
            <span>Orders</span>
          </router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
      </a-layout-header>
      <a-layout-content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view />
        <Loading v-if="products.isLoading" tip="Loding Products..." />
        <AdminProductList :products="products" />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Loading from '@/components/Loading'
import AdminProductList from '@/components/AdminProductList'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Admin',
  components: {
    Loading,
    AdminProductList
  },
  data () {
    return {
      collapsed: false
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

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
