<template>
  <div>Feed{{ apiUrl }}</div>
</template>

<script>
export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true,
    },
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>
