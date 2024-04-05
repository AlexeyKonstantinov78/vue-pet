import userProfileApi from '@/api/userProfle';

const state = {
  data: null,
  isLoading: false,
  errors: null,
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] Get user profile start',
  getUserProfileSuccess: '[userProfile] Get user profile Success',
  getUserProfileFailure: '[userProfile] Get user profile Failure',
}

export const actionTypes = {
  getUserProfile: '[UserProfile] Get user profile',
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getUserProfileFailure](state, payload) {
    state.isLoading = false;
    state.errors = payload;
  },
}

const actions = {
  [actionTypes.getUserProfile](context, { slug }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileStart);

      userProfileApi.getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile);
          resolve(userProfile)
        })
        .catch(err => {
          context.commit(mutationTypes.getUserProfileFailure, err);
        })
    })
  }
}

export default {
  state,
  actions,
  mutations,
}