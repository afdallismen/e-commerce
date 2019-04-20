<template>
  <form @submit.prevent="onSubmit" ref="LoginForm" style="width: 240px;">
    <b-field label="Email">
      <b-input
        type="email"
        placeholder="Your email"
        v-model="email"
        required>
      </b-input>
    </b-field>
    <b-field label="Password">
      <b-input
        type="password"
        password-reveal
        placeholder="Your password"
        v-model="password"
        required>
      </b-input>
    </b-field>
    <button class="button is-primary">Login</button>
  </form>
</template>

<script>
import { loginUser } from '../api'
import Toast from '../components/Toast'

export default {
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      loginUser({
        email: this.email,
        password: this.password
      })
      .then(({ data }) => {
        Toast.fire({
          type: 'success',
          title: `Selamat datang, ${data.user.username}`
        })
        this.$emit('success-login', data)
      })
      .catch(err => console.log(err))
    },
    clear: function () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
