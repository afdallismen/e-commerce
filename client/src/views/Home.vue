<template>
  <div>
    <ProductList :user="user" :token="token"/>
  </div>
</template>

<script>
import ProductList from '@/components/ProductList.vue'

export default {
  props: ['user', 'token'],
  components: {
    ProductList
  }
}
</script>
