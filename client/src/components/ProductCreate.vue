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
import { createProduct } from '../api'
import Toast from '../components/Toast'

export default {
  props: ['user', 'token'],
  data: function () {
    return {
      name: '',
      stock: 0,
      price: 0,
      image: null
    }
  },
  methods: {
    onSubmit: function () {
      createProduct(this.user, this.token, {
        name: this.name,
        stock: this.stock,
        price: this.price,
        image: this.image
      })
      .then(({ data }) => {
        this.clear()
        this.$emit('success-create', data)
        Toast.fire({
          type: 'success',
          title: 'Berhasil membuat produk baru.'
        })
      })
    },
    clear: function () {
      this.name = ''
      this.stock = ''
      this.price = ''
      this.image = {}
    }
  }
}
</script>

<style>

</style>
