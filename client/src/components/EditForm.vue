<template>
  <a-drawer
    title="Edit Product"
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
    <a-form id="components-form-demo-validate-other" :form="form" @submit.prevent="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="Name" has-feedback>
        <a-input
          v-decorator="[
            'name',
            {
              rules: [{ required: true, message: 'Name is required!' }],
              initialValue: product.name
            }
          ]"
          placeholder="Product name"
        >
        </a-input>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Price">
        <a-input-number
          v-decorator="[
            'price',
            {
              rules: [{ required: true, message: 'Price is required!' }],
              initialValue: product.price
            }
          ]"
          :min="0"
        />
        <span class="ant-form-text">
          Rp
        </span>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Stock">
        <a-input-number
          v-decorator="[
            'stock',
            {
              rules: [{ required: true, message: 'Stock is required!' }],
              initialValue: product.stock
            }
          ]"
          :min="0"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Description">
        <a-textarea
          v-decorator="[
            'description',
            {
              rules: [{ required: true, message: 'Description is required!' }],
              initialValue: product.description
            }
          ]"
          placeholder="Product Description"
          :autosize="{ minRows: 4 }"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Image" extra="Format image must be JPG">
        <a-upload
          v-decorator="[
            'image',
            {
              rules: [{ required: true, message: 'Image is required!' }],
              initialValue: product.image
            }
          ]"
          :remove="handleRemove"
          :image="image"
          :beforeUpload="beforeUpload"
          list-type="picture"
        >
          <a-button :disabled="image.length === 0">
            <a-icon type="upload" /> Select image
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button :loading="loadingBtn" type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
    {{ product._id }}
  </a-drawer>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'EditForm',
  props: ['visible', 'onClose'],
  data () {
    return {
      isLoading: false,
      /* name: this.product.name,
      price: this.product.price,
      stock: this.product.stock,
      description: this.product.description, */
      image: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      loadingBtn: false,
      error: {
        message: ''
      }
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  computed: {
    ...mapState('products', ['product'])
  },
  methods: {
    ...mapActions('products', ['findOne', 'findAll']),
    handleSubmit () {
      this.loadingBtn = true
      this.form.validateFields((err, values) => {
        if (!err) {
          const formData = new FormData()
          if (values.image.fileList) {
            formData.append('image', values.image.fileList[0].originFileObj)
          } else {
            formData.set('image', values.image)
          }
          formData.set('name', values.name)
          formData.set('price', values.price)
          formData.set('stock', values.stock)
          formData.set('description', values.description)
          formData.set('id', this.product._id)
          this.$store
            .dispatch('products/update', formData)
            .then(_ => {
              this.loadingBtn = false
              this.$message.success('Product updated successfully', 3)
              this.image = []
              this.form.resetFields()
              this.findAll()
              this.onClose()
            })
            .catch(err => {
              this.loadingBtn = false
              this.$message.error(err.response.data, 3)
              this.image = []
              this.form.resetFields()
              this.onClose()
            })
        }
      })
    },
    handleRemove (file) {
      const index = this.image.indexOf(file)
      const newImage = this.image.slice()
      newImage.splice(index, 1)
      this.image = newImage
    },
    beforeUpload (file) {
      this.image = [file]
      return false
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
