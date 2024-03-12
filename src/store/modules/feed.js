import getApi from '@/api/feed';

const state = {
  data: null,
  isLoading: false,
  errors: null,
}

export const mutationTypes = {
  getFeedStart: '[feed] Get feed start',
  getFeedSuccess: '[feed] Get feed Success',
  getFeedFailure: '[feed] Get feed Failure',
}

export const actionTypes = {
  getFeed: '[feed] Get feed',
}

const mutations = {
  [mutationTypes.getFeedStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getFeedSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getFeedFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
}

const actions = {
  [actionTypes.getFeed](context, { apiUrl }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getFeedStart);

      getApi.getFeed(apiUrl)
        .then(response => {
          context.commit(mutationTypes.getFeedSuccess, response.data);
          resolve(response.data)
        })
        .catch(err => {
          context.commit(mutationTypes.getFeedFailure, err);
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
}