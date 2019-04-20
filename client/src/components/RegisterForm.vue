<template>
  <form @submit.prevent="onSubmit" style="width: 240px;">
    <b-field label="Username">
      <b-input
        type="text"
        placeholder="Your username"
        v-model="username"
        required>
      </b-input>
    </b-field>
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
    <button class="button is-primary">Register</button>
  </form>
</template>

<script>
import { registerUser } from '../api'
import Toast from '../components/Toast'

export default {
  data: function () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit: function () {
      registerUser({
        username: this.username,
        email: this.email,
        password: this.password
      })
      .then(_ => {
        Toast.fire({
          type: 'success',
          title: 'Resgistrasi berhasil, silahkan login.'
        })
        this.$emit('success-registration')
      })
      .catch(err => console.log(err))
    },
    clear: function () {
      this.username = ''
      this.email = ''
      this.password = ''
    }
  }

}
</script>