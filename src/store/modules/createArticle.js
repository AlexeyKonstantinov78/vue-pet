import articleApi from '@/api/article';

const state = {
  isSubmitting: false,
  validationErrors: null,
}

export const mutationTypes = {
  createArticleStart: '[CreateArticle] Create article start',
  createArticleSuccess: '[CreateArticle] Create article success',
  createArticleFailure: '[CreateArticle] Create article failure',
}

export const actionTypes = {
  createArticle: '[CreateArticle] Create article',
}

const mutations = {
  [mutationTypes.createArticleStart](state) {
    state.isSubmitting = true;
  },
  [mutationTypes.createArticleSuccess](state) {
    state.isSubmitting = false;
  },
  [mutationTypes.createArticleFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
}

const actions = {
  [actionTypes.createArticle](context, { articleInput }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleStart);

      articleApi.createArticle(articleInput)
        .then(
          (article) => {
            context.commit(mutationTypes.createArticleSuccess);
            resolve(article);
          }
        )
        .catch((err) => {
          context.commit(mutationTypes.createArticleFailure, err.response.data.errors);
        })
    });
  }
}

export default {
  state,
  actions,
  mutations,
}