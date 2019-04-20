<template>
  <div class="container">
    <div class="columns">
      <div class="column is-12 box is-radiusless pb50 mb50">
        <p class="is-size-4 is-capitalized ml16 mt8" style="letter-spacing: 0.2em;">Toko {{ user.username }}</p>
        <div class="is-divider mt16 mb50"></div>
        <div class="ml35 mb24">
          <b-button type="is-success" icon-left="plus" @click="showCreateForm = true">Produk Baru</b-button>
        </div>
        <div class="columns is-multiline ml24 mr24">
          <div class="column is-3" v-for="product in products" :key="product._Id">
            <div class="card">
              <div class="buttons has-background-white pt8 pl8 pr8" style="position: absolute; top: 8px; right: 0px; z-index: 10;">
                <b-button type="is-info" icon-right="pencil" @click="onClickEdit(product)"></b-button>
                <b-button type="is-danger" icon-right="delete" @click="onClickDelete(product)"></b-button>
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
    </div>
    <b-modal :active.sync="showCreateForm" has-modal-card>
      <ProductCreate :user="user" :token="token" @success-create="onSuccessCreate"></ProductCreate>
    </b-modal>
    <b-modal :active.sync="showEditForm" has-modal-card>
      <ProductEdit :user="user" :token="token" :product="selected" @success-edit="onSuccessEdit"></ProductEdit>
    </b-modal>
  </div>
</template>

<script>
import ProductCreate from '../components/ProductCreate'
import ProductEdit from '../components/ProductEdit'
import { fetchProducts, deleteProduct } from '../api'
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
  created: function () {
    fetchProducts()
      .then(({ data }) => {
        this.products = data.products.filter(product => product.owner_id == this.user._id)
      })
  },
  components: {
    ProductCreate,
    ProductEdit
  },
  methods: {
    randomImage: function () {
      let width = Math.floor(Math.random() * 400) + 200
      let height = Math.floor(Math.random() * 400) + 200
      return `https://loremflickr.com/${width}/${height}?lock=1`
    },
    onSuccessCreate: function (data) {
      this.products.unshift(data.product)
      this.showCreateForm = false
    },
    onSuccessEdit: function (data) {
      this.products.splice(
        this.products.findIndex(
          product => product._id === data.product._id
        ), 1, data.product
      )
      this.showEditForm = false
    },
    onClickEdit: function (product) {
      this.showEditForm = true
      this.selected = product
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
