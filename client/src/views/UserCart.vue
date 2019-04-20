<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12 box is-radiusless pb50 mb50">
        <p class="is-size-4 is-capitalized ml16 mt8" style="letter-spacing: 0.2em;">Keranjang belanja {{ user.username }}</p>
        <div class="is-divider mt16 mb50"></div>
        <div class="ml35 mb24" v-if="products.length">
          <b-button type="is-danger" icon-left="delete" @click="onClickClearCart">Hapus Semua Produk</b-button>
        </div>
        <div class="columns is-multiline ml24 mr24">
          <div class="column is-3" v-for="product in groupProducts" :key="product._Id">
            <div class="card">
              <div class="buttons pt8 pl8 pr8" style="position: absolute; top: 8px; right: 0px; z-index: 10;">
                <b-button type="is-success" icon-right="minus" @click="onClickRemove(product)"></b-button>
                <b-button type="is-success" icon-right="plus" @click="onClickAdd(product)"></b-button>
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
                  <li class="has-text-white">Jumlah di keranjang <span class="has-text-weight-bold">{{ countProduct(product) }}</span></li>
                  <li class="has-text-white">Harga <span class="has-text-weight-bold">{{ product.price }}</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCreate from '../components/ProductCreate'
import ProductEdit from '../components/ProductEdit'
import { fetchCart, addProduct, removeProduct, clearCart } from '../api'
import Swal from 'sweetalert2'

export default {
  props: ['user', 'token'],
  data: function () {
    return {
      products: [],
      showCreateForm: false,
      showEditForm: false,
      selected: {},
    }
  },
  computed: {
    groupProducts: function () {
      let seen = []
      return this.products.filter(
        product => {
          let found = seen.findIndex(s => s._id === product._id)
          if (found === -1) {
            seen.push(product)
            return true
          }
        }
      )
    }
  },
  created: function () {
    fetchCart(this.user, this.token)
      .then(({ data }) => {
        this.products = data.cart
      })
  },
  components: {
    ProductCreate,
    ProductEdit
  },
  methods: {
    onClickAdd: function (product) {
      addProduct(this.user, this.token, { product })
        .then(({ data }) => {
          this.products.push(product)
        })
    },
    onClickRemove: function (product) {
      removeProduct(this.user, this.token, product._id)
        .then(({ data }) => {
          this.products.splice(this.products.findIndex(p => p._id === data.product._id), 1)
        })
    },
    countProduct: function (product) {
      return this.products.filter(p => p._id === product._id).length
    },
    randomImage: function () {
      let width = Math.floor(Math.random() * 400) + 200
      let height = Math.floor(Math.random() * 400) + 200
      return `https://loremflickr.com/${width}/${height}?lock=1`
    },
    onClickClearCart: function () {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF2B56',
        cancelButtonColor: '#343434',
        confirmButtonText: 'Yes, deletes all!'
      }).then((result) => {
        if (result.value) {
          clearCart(this.user, this.token)
            .then(({ data }) => {
              this.products = data.cart
            })
        }
      })
    },
    onClickDelete: function (product) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#FF2B56',
        cancelButtonColor: '#343434',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          deleteProduct(this.user, this.token, product._id)
            .then(({ data }) => {
              this.products = this.products.filter(product => product._id !== data.product._id)
              Swal.fire(
                'Deleted!',
                'Your product has been deleted.',
                'success'
              )
            })
        }
      })
    }
  }
}
</script>

<style>

</style>
