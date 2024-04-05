<template>
  <button
    class="btn btn-sm"
    :class="{
      'btn-primary': isFavoritedOptimistic,
      'btn-outline-primary': !isFavoritedOptimistic,
    }"
    @click="handleLike"
  >
    <i class="ion-heart"></i>
    <span>&nbsp;{{ favoritesCountOptimistic }}</span>
  </button>
</template>

<script>
import {actionTypes} from '@/store/modules/addToFavorites'

export default {
  name: 'McvAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true,
    },
    articleSlug: {
      type: String,
      required: true,
    },
    favoritesCount: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      isFavoritedOptimistic: this.isFavorited,
      favoritesCountOptimistic: this.favoritesCount,
    }
  },

  mounted() {},

  methods: {
    handleLike() {
      this.$store.dispatch(actionTypes.addToFavorites, {
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOptimistic,
      })

      if (this.isFavoritedOptimistic) {
        this.favoritesCountOptimistic -= 1
      } else {
        this.favoritesCountOptimistic += 1
      }

      this.isFavoritedOptimistic = !this.isFavoritedOptimistic
    },
  },
}
</script>
