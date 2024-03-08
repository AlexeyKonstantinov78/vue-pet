<template>
  <ul class="error-messages">
    <li v-for="errorMessegs in errorMessegs" :key="errorMessegs">
      {{ errorMessegs }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {}
  },

  mounted() {},
  computed: {
    errorMessegs() {
      return Object.keys(this.validationErrors).map((name) => {
        const messages = this.validationErrors[name].join(', ')
        return `${name} ${messages}`
      })
    },
  },

  methods: {},
}
</script>
