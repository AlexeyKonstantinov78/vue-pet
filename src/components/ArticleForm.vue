<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <mcv-validation-errors v-if="errors" :validation-errors="errors" />

          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  name="title"
                  placeholder="Article Title"
                  v-model="title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  name="Description"
                  placeholder="Description"
                  v-model="description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  name="body"
                  placeholder="What is this article about?"
                  v-model="body"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  name="tagList"
                  placeholder="Enter tags"
                  v-model="tagList"
                />
              </fieldset>
            </fieldset>
            <fieldset class="form-group">
              <button
                type="submit"
                class="btn btn-lg pull-xs-right btn-primary"
                :disabled="isSubmitting"
              >
                Publish Article
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'

export default {
  name: 'McvArticleForm',
  props: {
    initialValues: {
      type: Object,
      require: true,
    },
    errors: {
      type: Object,
      require: false,
    },
    isSubmitting: {
      type: Boolean,
      require: true,
    },
  },
  components: {
    McvValidationErrors,
  },

  data() {
    return {
      title: '',
      description: '',
      body: '',
      tagList: '',
    }
  },

  mounted() {},

  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' '),
      }
      this.$emit('articleSubmit', form)
    },
  },
}
</script>
