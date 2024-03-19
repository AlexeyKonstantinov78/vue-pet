import getApiArticle from '@/api/article';

const state = {
  data: null,
  isLoading: false,
  errors: null,
}

export const mutationTypes = {
  getArticleStart: '[article] Get article start',
  getArticleSuccess: '[article] Get article Success',
  getArticleFailure: '[article] Get article Failure',
}

export const actionTypes = {
  getArticle: '[article] Get Article',
}

const mutations = {
  [mutationTypes.getArticleStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getArticleSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getArticleFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
}

const actions = {
  [actionTypes.getArticle](context, { slug }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleStart, slug);

      getApiArticle.getArticle(slug)
        .then(article => {
          context.commit(mutationTypes.getArticleSuccess, article);
          resolve(article)
        })
        .catch(err => {
          context.commit(mutationTypes.getArticleFailure, err);
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
}