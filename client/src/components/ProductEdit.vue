<template>
  <form @submit.prevent="onSubmit">
    <div class="modal-card" style="width: auto;">
      <div class="modal-card-body">
        <b-field label="Name">
          <b-input
            type="text"
            placeholder="Product Name"
            v-model="name"
            required>
          </b-input>
        </b-field>
        <b-field label="Stock">
          <b-input
            type="number"
            placeholder="Product Stock"
            v-model="stock"
            required>
          </b-input>
        </b-field>
        <b-field label="Image">
          <b-upload v-model="image">
            <a class="button">
              <b-icon icon="upload"></b-icon>
              <span v-if="image">{{ image.name }}</span>
              <span v-else>Click to upload</span>
            </a>
          </b-upload>
        </b-field>
        <b-field label="Price">
          <b-input
            type="price"
            placeholder="Product Price"
            v-model="price"
            required>
          </b-input>
        </b-field>
        <div class="is-divider"></div>
        <b-button native-type="submit" type="is-primary">Save</b-button>
      </div>
    </div>
  </form>
</template>

<script>
import { editProduct } from '../api'
import Toast from '../components/Toast'

export default {
  props: ['user', 'token', 'product'],
  created: function () {
    this.name = this.product.name
    this.stock = this.product.stock
    this.price = this.product.price
    this.image.name = this.product.image
  },
  data: function () {
    return {
      name: '',
      stock: 0,
      price: 0,
      image: {}
    }
  },
  methods: {
    onSubmit: function () {
      editProduct(this.user, this.token, {
        _id: this.product._id,
        name: this.name,
        stock: this.stock,
        price: this.price,
        image: this.image
      })
      .then(({ data }) => {
        this.$emit('success-edit', data)
        Toast.fire({
          type: 'success',
          title: 'Berhasil edit produk.'
        })
      })
    }
  }
}
</script>

<style>

</style>
