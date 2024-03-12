<template>
  <div class="home-page">
    BANNER
    <div class="container">
      <div class="row">
        <div class="col-md-9">
          <mcv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">POPULAR TEGS</div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed.vue'
export default {
  name: 'McvGlobalFeed',
  components: {
    McvFeed,
  },

  data() {
    return {
      apiUrl: '/articles',
    }
  },

  mounted() {},

  methods: {},
}
</script>
