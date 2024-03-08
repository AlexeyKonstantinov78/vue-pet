import authApi from '@/api/auth';

const state = {
  isSubmiting: false,
}

const mutations = {
  registerStart(state) {
    state.isSubmiting = true
  },
  registerSuccess(state) {
    state.isSubmiting = false;
  },
  registerFailure(state) {
    state.isSubmiting = false;
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve, reject) => {
      context.commit('registerStart');
      console.log('reject: ', reject);
      console.log('resolve: ', resolve);
      authApi.register(credentials)
        .then(response => {
          console.log('response: ', response.data);
          context.commit('registerSuccess', response.data.user);
          resolve(response.data.user)
        })
        .catch(err => {
          context.commit('registerFailure', err.response.data.errors);
          console.log('error: ', err)
        });
    })
  }
}

export default {
  state,
  mutations,
  actions
}