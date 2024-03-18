import getApiPopularTags from '@/api/popularTags';

const state = {
  data: null,
  isLoading: false,
  errors: null,
}

export const mutationTypes = {
  getPopularTagsStart: '[PopularTags] Get popular tags start',
  getPopularTagsSuccess: '[PopularTags] Get popular tags Success',
  getPopularTagsFailure: '[PopularTags] Get popular tags Failure',
}

export const actionTypes = {
  getPopularTags: '[PopularTags] Get Popular Tags',
}

const mutations = {
  [mutationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getPopularTagsSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getPopularTagsFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
}

const actions = {
  [actionTypes.getPopularTags](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getPopularTagsStart);

      getApiPopularTags.getPopularTags()
        .then(tags => {
          context.commit(mutationTypes.getPopularTagsSuccess, tags);
          resolve(tags)
        })
        .catch(err => {
          context.commit(mutationTypes.getPopularTagsFailure, err);
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
}