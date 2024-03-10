import authApi from '@/api/auth';
import { TOKEN_KEY } from '@/helpers/constants';
import { setItem } from '@/helpers/persistensSrorage';

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

const mutations = {
  registerStart(state) {
    state.isSubmiting = true
    state.validationErrors = null

  },
  registerSuccess(state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  registerFailure(state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
}

const actions = {
  register(context, credentials) {
    return new Promise((resolve) => {
      context.commit('registerStart');

      authApi.register(credentials)
        .then(response => {
          context.commit('registerSuccess', response.data.user);
          setItem(TOKEN_KEY, response.data.user.token);
          resolve(response.data.user)
        })
        .catch(err => {
          if (err.response) {
            context.commit('registerFailure', err.response.data.errors);
          } else {
            context.commit('registerFailure', { code: ["Ошибка соединения"] });
          }
        });
    })
  }
}

export default {
  state,
  mutations,
  actions
}