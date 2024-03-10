<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{name: 'login'}">Need an account?</router-link>
          </p>
          <mcv-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                v-model="email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                v-model="password"
                placeholder="Password"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmiting"
            >
              Sign Up
            </button>
            {{ isSubmiting }}
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/authorization'

export default {
  name: 'MsvLogin',
  components: {
    McvValidationErrors,
  },

  data() {
    return {
      email: '',
      password: '',
    }
  },

  computed: {
    isSubmiting() {
      return this.$store.state.authorization.isSubmiting
    },
    validationErrors() {
      return this.$store.state.authorization.validationErrors
    },
  },

  mounted() {},

  methods: {
    onSubmit() {
      this.$store
        .dispatch(actionTypes.authorization, {
          email: this.email,
          password: this.password,
        })
        .then((user) => {
          console.log('authorization successful user ', user)
          this.$router.push({name: 'home'})
        })
    },
  },
}
</script>
