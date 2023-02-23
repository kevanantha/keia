<template>
  <a-drawer
    title="Create an account"
    :width="720"
    @close="onClose"
    :visible="visible"
    :wrapStyle="{ height: 'calc(100% - 108px)', overflow: 'auto', paddingBottom: '108px' }"
  >
    <Alert
      v-if="error.message"
      :message="error.message"
      :description="error.description"
      :type="error.type"
    />
    <a-form
      id="components-form-demo-normal-login"
      :form="form"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'email',
            { rules: [{ required: true, message: 'Please input your email!' }] }
          ]"
          placeholder="Email"
        >
          <a-icon slot="prefix" type="mail" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'password',
            { rules: [{ required: true, message: 'Please input your password!' }] }
          ]"
          type="password"
          placeholder="Password"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['phoneNumber']" type="number" placeholder="Phone Number">
          <a-icon slot="prefix" type="phone" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input v-decorator="['address']" type="text" placeholder="Address">
          <a-icon slot="prefix" type="home" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button :loading="loadingBtn" type="primary" html-type="submit" class="login-form-button">
          Create an account
        </a-button>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>

<script>
import { mapActions } from 'vuex'
import Alert from '@/components/Alert'

export default {
  name: 'SignupForm',
  props: ['visible', 'onClose'],
  components: {
    Alert
  },
  data () {
    return {
      loadingBtn: false,
      error: {
        message: ''
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'normal_login' })
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          this.error = {}
          this.loadingBtn = true
          this.$store
            .dispatch('users/register', values)
            .then(() => {
              this.loadingBtn = false
              this.form.resetFields()
              this.$message.success('Logged in successfully', 3)
              this.onClose()
              this.$router.push('/').catch(err => {})
            })
            .catch(err => {
              this.loadingBtn = false
              this.form.resetFields()
              this.error = {
                message: 'Error',
                description: err.response.data,
                type: 'error'
              }
              // this.$message.error(err.response.data, 3)
            })
        }
      })
    }
  }
}
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>
