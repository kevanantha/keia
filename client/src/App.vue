<template>
  <div id="app">
    <a-layout id="components-layout-top" class="layout">
      <a-layout-header>
        <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
          <a-menu-item key="1">
            <router-link to="/">Keia</router-link>
          </a-menu-item>
          <a-menu-item v-if="isLogin" @click="logout" class="right-menu" key="6">
            Logout
          </a-menu-item>
          <a-menu-item v-if="isLogin" class="right-menu" key="7">
            <router-link to="/cart">
              <a-badge :count="totalCarts" :overflowCount="10">
                <a-icon type="shopping-cart" />
              </a-badge>
            </router-link>
          </a-menu-item>
          <a-menu-item v-if="!isLogin" @click="showDrawerSignup" class="right-menu" key="4"
            >Sign up</a-menu-item
          >
          <a-menu-item v-if="!isLogin" @click="showDrawer" class="right-menu" key="5">
            Login
          </a-menu-item>
        </a-menu>
      </a-layout-header>
      <a-layout-content style="padding: 0 50px; margin: 3rem 0">
        <router-view />
      </a-layout-content>
      <LoginForm :visible="visible" :onClose="onClose" />
      <SignupForm :visible="visibleSignup" :onClose="onClose" />
      <a-layout-footer style="text-align: center">
        Kevin Anantha ©{{ new Date().getFullYear() }}
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'
import SignupForm from '@/components/SignupForm'
import { mapState, mapGetters } from 'vuex'
import {supabase} from "@/supabase";

export default {
  name: 'App',
  components: {
    LoginForm,
    SignupForm
  },
  data() {
    return {
      visible: false,
      visibleSignup: false
    }
  },
  computed: {
    ...mapState('users', ['isLogin']),
    ...mapGetters('cart', ['totalCarts'])
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    showDrawerSignup() {
      this.visibleSignup = true
    },
    onClose() {
      this.visible = false
      this.visibleSignup = false
    },
    logout() {
      this.$store.dispatch('users/logout')
      this.$store.commit('users/isLogin')
      this.$message.success('Logged out successfully', 3)
      this.$router.push('/').catch(err => {})
    }
  },
  async mounted() {
    await supabase.auth.getSession().then(({ data }) => {
      this.$store.commit('users/isLogin', data.session)
    })
    await supabase.auth.onAuthStateChange().then((_, _session) => {
      this.$store.commit('users/isLogin', _session)
    })
    // this.$store.commit('users/isLogin')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat&display=swap');

#app {
  font-family: 'Montserrat', sans-serif;
}

#components-layout-top .logo {
  width: 120px;
  height: 31px;
  background: url('./assets/logobrand.png');
  margin: 16px 24px 16px 0;
  float: left;
}

#components-layout-top .right-menu {
  float: right;
}
</style>
