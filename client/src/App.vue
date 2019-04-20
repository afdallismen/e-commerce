<template>
  <div id="app" class="has-background-grey-lighter" style="min-height: 100vh;">
    <nav class="navbar mb32">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item is-size-3 mb16 mt8" :to="{ name: 'home' }">
            e-commerce
          </router-link>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start"></div>
          <div class="navbar-end">
            <div class="navbar-item" v-if="!loggedIn">
              <b-dropdown
                position="is-bottom-left"
                @active-change="onActiveChangeLogin"
                ref="ddLoginForm">
                <button class="button is-primary" slot="trigger">
                  <span>Login</span>
                </button>
                <b-dropdown-item custom>
                  <LoginForm
                    @success-login="onSuccessLogin"
                    ref="LoginForm">
                  </LoginForm>
                </b-dropdown-item>
              </b-dropdown>
              <b-dropdown
                position="is-bottom-left"
                @active-change="onActiveChangeRegister"
                ref="ddRegistrationForm">
                <button class="button" slot="trigger">
                  <span>Register</span>
                </button>
                <b-dropdown-item custom>
                  <RegisterForm
                    @success-registration="onSuccessRegistration"
                    ref="RegistrationForm">
                  </RegisterForm>
                </b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="navbar-item" v-if="loggedIn">
              <div class="buttons">
                <router-link class="button is-primary" :to="{ name: 'shop' }">Buka Toko</router-link>
                <router-link class="button is-primary" :to="{ name: 'cart' }">Keranjang</router-link>
                <b-button @click="onClickLogout">Logout</b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view :user="user" :token="token"/>
  </div>
</template>

<script>
import LoginForm from './components/LoginForm.vue'
import RegisterForm from './components/RegisterForm.vue'

export default {
  data: function () {
    return {
      user: {},
      token: ''
    }
  },
  computed: {
    loggedIn: function () {
      return !!this.user._id
    }
  },
  components: {
    LoginForm,
    RegisterForm
  },
  created: function () {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token')
    }
  },
  methods: {
    onActiveChangeLogin: function (isActive) {
      if (!isActive) {
        this.$refs.LoginForm.clear()
      }
    },
    onActiveChangeRegister: function (isActive) {
      if (!isActive) {
        this.$refs.RegistrationForm.clear()
      }
    },
    onSuccessRegistration: function () {
      this.$refs.ddRegistrationForm.toggle()
      this.$refs.ddLoginForm.toggle()
    },
    onSuccessLogin: function ({ user, token }) {
      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', token)
      this.user = user
      this.token = token
      this.$refs.ddLoginForm.toggle()
    },
    onClickLogout: function () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
      this.user = {}
      this.token = ''
    }
  }
}
</script>
