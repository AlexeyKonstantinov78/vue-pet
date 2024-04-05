<template>
  <div class="profile-page" v-if="userProfile">
    <dir class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img
              class="user-img"
              :src="userProfile.image"
              :alt="userProfile.username"
            />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                class="btn btn-sm btn-outline-secondary action-btn"
                v-if="isCurrentUserProfile"
                :to="{name: 'settings'}"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </dir>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfile',
                    params: {slug: userProfile.username},
                  }"
                  :class="{active: routeName === 'userProfile'}"
                  >My Post</router-link
                >
              </li>
              <li class="nav-item">
                <router-link
                  class="nav-link"
                  :to="{
                    name: 'userProfileFavorites',
                    params: {slug: userProfile.username},
                  }"
                  active-class="active"
                  >Favorites Post</router-link
                >
              </li>
            </ul>
          </div>
          <mcv-feed :api-url="apiUrl" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import McvFeed from '@/components/Feed.vue'
import {actionTypes as userProfileActionTypes} from '@/store/modules/userProfile'
import {gettersTypes as authGetterTypes} from '@/store/modules/auth'

export default {
  name: 'McvUserProfile',
  components: {
    McvFeed,
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userProfile: (stat) => stat.userProfile.data,
      isLoading: (stat) => stat.userProfile.isLoading,
      errors: (stat) => stat.userProfile.errors,
    }),
    ...mapGetters({
      currentUser: authGetterTypes.currentUser,
    }),
    isCurrentUserProfile() {
      if (!this.currentUser || !this.userProfile) {
        return false
      }
      return this.currentUser.username === this.userProfile.username
    },
    apiUrl() {
      const isFavorites = this.$route.path.includes('favorites')

      return isFavorites
        ? `/articles?favorited=${this.userProfileSlug}`
        : `/articles?author=${this.userProfileSlug}`
    },
    userProfileSlug() {
      return this.$route.params.slug
    },
    routeName() {
      return this.$route.name
    },
  },
  watch: {
    userProfileSlug() {
      this.getUserProfile()
    },
  },
  mounted() {
    this.getUserProfile()
  },

  methods: {
    getUserProfile() {
      this.$store.dispatch(userProfileActionTypes.getUserProfile, {
        slug: this.userProfileSlug,
      })
    },
  },
}
</script>
