<template>
  <div class="sidebar">
    <p>Popular Tags</p>
    <mcv-loading v-if="isLoading" />

    <mcv-error-message v-if="errors" :message="errors" />

    <div class="post-preview" v-if="popularTags == []">
      No tags are here... yet.
    </div>

    <div class="tag-list" v-if="popularTags">
      <router-link
        class="tag-default tag-pill"
        v-for="(tag, i) in popularTags"
        :key="i"
        :to="{name: 'tag', params: {slug: tag}}"
      >
        {{ tag }}
      </router-link>
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/popularTags'
import {mapState} from 'vuex'
import McvLoading from '@/components/Loading'
import McvErrorMessage from '@/components/ErrorMessage'

export default {
  name: 'McvPopularTags',
  components: {
    McvLoading,
    McvErrorMessage,
  },

  computed: {
    ...mapState({
      popularTags: (state) => state.popularTags.data,
      isLoading: (state) => state.popularTags.isLoading,
      errors: (state) => state.popularTags.errors,
    }),
  },

  data() {
    return {}
  },

  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  },

  methods: {},
}
</script>
