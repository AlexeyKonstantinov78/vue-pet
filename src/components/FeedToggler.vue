<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          class="nav-link"
          :class="{active: routeName === 'yourFeed'}"
          :to="{name: 'yourFeed'}"
        >
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          :to="{name: 'globalFeed'}"
          :class="{active: routeName === 'globalFeed'}"
        >
          GlobalFeed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          class="nav-link"
          :to="{name: 'tag', params: {slug: tagName}}"
          :class="{active: routeName === 'tag'}"
        >
          <i class="ion-pound" />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {gettersTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'

export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      require: false,
    },
  },

  data() {
    return {}
  },

  computed: {
    ...mapGetters({
      isLoggedIn: gettersTypes.isLoggedIn,
    }),
    routeName() {
      return this.$route.name
    },
  },

  mounted() {},

  methods: {},
}
</script>
