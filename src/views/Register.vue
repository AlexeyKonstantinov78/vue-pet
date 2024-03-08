<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Need an account?</router-link>
          </p>
          ValidationErrors
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                name="username"
                placeholder="Username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                name="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                name="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmiting"
            >
              Sign Up
            </button>
          </form>
          {{ isSubmiting }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'McvRegister',

  data() {
    return {}
  },
  computed: {
    isSubmiting() {
      return this.$store.state.auth.isSubmiting
    },
  },

  mounted() {},

  methods: {
    onSubmit() {
      console.log('On submit')
      this.$store.dispatch('register')
    },
  },
}
</script>
