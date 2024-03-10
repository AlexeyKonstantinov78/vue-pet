import authApi from '@/api/auth';
import { TOKEN_KEY } from '@/helpers/constants';
import { setItem } from '@/helpers/persistensSrorage';

const state = {
  isSubmiting: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
}

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
}

const mutations = {
  [mutationTypes.registerStart](state) {
    state.isSubmiting = true
    state.validationErrors = null

  },
  [mutationTypes.registerSuccess](state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.registerFailure](state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
  [mutationTypes.loginStart](state) {
    state.isSubmiting = true
    state.validationErrors = null

  },
  [mutationTypes.loginSuccess](state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.loginFailure](state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.registerStart);

      authApi.register(credentials)
        .then(response => {
          context.commit(mutationTypes.registerSuccess, response.data.user);
          setItem(TOKEN_KEY, response.data.user.token);
          resolve(response.data.user)
        })
        .catch(err => {
          let errors = {};
          if (err.response) {
            errors = err.response.data.errors;
          } else {
            errors = { code: ["Ошибка соединения"] };
          }

          context.commit(mutationTypes.registerFailure, errors);
        });
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.loginStart);

      authApi.login(credentials)
        .then(response => {
          context.commit(mutationTypes.loginSuccess, response.data.user);
          setItem(TOKEN_KEY, response.data.user.token);
          resolve(response.data.user)
        })
        .catch(err => {
          let errors = {};
          if (err.response) {
            errors = err.response.data.errors;
          } else {
            errors = { code: ["Ошибка соединения"] };
          }

          context.commit(mutationTypes.loginFailure, errors);
        });
    })
  },
}

export default {
  state,
  mutations,
  actions
}