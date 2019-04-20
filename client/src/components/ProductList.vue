<template>
  <div class="container">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="product in products" :key="product._Id">
        <div class="card">
          <div class="buttons pt8 pl8 pr8" style="position: absolute; top: 8px; right: 0px; z-index: 10;">
            <b-button type="is-danger" icon-left="cart-plus" @click="onClickBuy(product)">Beli ini</b-button>
          </div>
          <div class="card-image">
            <figure class="image">
              <img :src="product.image" alt="product name" />
            </figure>
          </div>
          <div class="card-content has-background-info">
            <p class="is-capitalized has-text-weight-bold has-text-white">{{ product.name }}</p>
            <ul>
              <li class="has-text-white">Tersedia <span class="has-text-weight-bold">{{ product.stock }}</span> produk</li>
              <li class="has-text-white">Harga <span class="has-text-weight-bold">{{ product.price }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProducts, addProduct } from '../api'
import Toast from './Toast'

export default {
  props: ['user', 'token'],
  created: function () {
    fetchProducts()
      .then(({ data }) => {
        this.products = data.products
      })
      .catch(err => console.log(err))
  },
  data: function () {
    return {
      products: []
    }
  },
  methods: {
    randomImage: function () {
      let width = Math.floor(Math.random() * 400) + 200
      let height = Math.floor(Math.random() * 400) + 200
      return `https://loremflickr.com/${width}/${height}?lock=1`
    },
    onClickBuy: function (product) {
      if (!this.user._id) {
        Toast.fire({
          type: 'warning',
          title: 'Silahkan login terlebih dahulu. Atau, registrasi jika anda belum memiliki akun.'
        })
      } else {
        addProduct(this.user, this.token, { product })
          .then(({ data }) => {
            Toast.fire({
              type: 'success',
              title: 'Item telah ditambahkan ke keranjang anda.'
            })
          })
      }
    }
  }
}
</script>

<style>

</style>
