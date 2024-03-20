<template>
  <ul class="tag-list">
    <li
      class="tag-default tag-pill tag-outline"
      v-for="tag in tagsList"
      :key="tag"
    >
      {{ tag }}
    </li>
  </ul>
</template>

<script>
export default {
  name: 'McvTagList',
  props: {
    tagsList: {
      type: Array,
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
