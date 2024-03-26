<template>
  <div class="container">
    <mcv-article-form
      :initial-values="initialValues"
      :errors="validationErrors"
      :is-submitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'
import {actionTypes} from '@/store/modules/createArticle'
import {mapState} from 'vuex'

export default {
  name: 'McvCreateArticle',
  components: {
    McvArticleForm,
  },

  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: [],
      },
    }
  },

  computed: {
    ...mapState({
      isSubmitting: (state) => state.articleCreate.isSubmitting,
      validationErrors: (state) => state.articleCreate.validationErrors,
    }),
  },

  mounted() {},

  methods: {
    onSubmit(articleInput) {
      this.$store
        .dispatch(actionTypes.createArticle, {articleInput})
        .then((article) => {
          this.$router.push({name: 'article', params: {slug: article.slug}})
        })
    },
  },
}
</script>
