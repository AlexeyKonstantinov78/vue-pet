<template>
  <div>
    <mcv-topbar />
    <router-view />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar.vue'
import {actionTypes} from './store/modules/auth'
export default {
  name: 'McvApp',
  components: {
    McvTopbar,
  },

  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser).then((user) => {
      console.log('succes registr user', user)
      this.$router.push({name: 'home'})
    })
  },
}
</script>
