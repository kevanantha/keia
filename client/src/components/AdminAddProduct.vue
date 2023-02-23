<template>
  <div>
    <a-form id="components-form-demo-validate-other" :form="form" @submit.prevent="handleSubmit">
      <a-form-item v-bind="formItemLayout" label="Name" has-feedback>
        <a-input
          v-decorator="['name', { rules: [{ required: true, message: 'Name is required!' }] }]"
          placeholder="Product name"
        >
        </a-input>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Price">
        <a-input-number
          v-decorator="['price', { rules: [{ required: true, message: 'Price is required!' }] }]"
          :min="0"
        />
        <span class="ant-form-text">
          Rp
        </span>
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Stock">
        <a-input-number
          v-decorator="['stock', { rules: [{ required: true, message: 'Stock is required!' }] }]"
          :min="0"
        />
      </a-form-item>

      <a-form-item v-bind="formItemLayout" label="Description">
        <a-textarea
          v-decorator="[
            'description',
            { rules: [{ required: true, message: 'Description is required!' }] }
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
              valuePropName: 'image'
            }
          ]"
          :remove="handleRemove"
          :image="image"
          :beforeUpload="beforeUpload"
          list-type="picture"
        >
          <a-button :disabled="isDisabled"> <a-icon type="upload" /> Select image </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 12, offset: 6 }">
        <a-button :loading="loadingBtn" type="primary" html-type="submit">
          Submit
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'AdminAddProduct',
  data () {
    return {
      image: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      },
      loadingBtn: false
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  computed: {
    isDisabled () {
      if (this.image.length) return true
      return false
    }
  },
  methods: {
    ...mapActions('products', {
      findAllProducts: 'findAll'
    }),
    handleSubmit () {
      this.loadingBtn = true
      this.form.validateFields((err, values) => {
        if (!err) {
          // const formData = new FormData()
          // formData.append('image', values.image.fileList[0].originFileObj)
          // formData.set('name', values.name)
          // formData.set('price', values.price)
          // formData.set('stock', values.stock)
          // formData.set('description', values.description)
          const payload = new Map()
          payload.set('name', values.name)
          payload.set('price', values.price)
          payload.set('stock', values.stock)
          payload.set('description', values.description)
          this.$store
            .dispatch('products/create', payload)
            .then(res => {
              this.loadingBtn = false
              this.$message.success('Product added successfully', 3)
              this.image = []
              this.form.resetFields()
              this.findAllProducts()
            })
            .catch(err => {
              this.loadingBtn = false
              this.$message.error(err.response.data, 3)
              this.image = []
              this.form.resetFields()
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
