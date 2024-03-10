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
  authorizationStart: '[authorization] authorizationStart',
  authorizationSuccess: '[authorization] authorizationSuccess',
  authorizationFailure: '[authorization] authorizationFailure'
}

export const actionTypes = {
  authorization: '[authorization] authorization'
}

const mutations = {
  [mutationTypes.authorizationStart](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [mutationTypes.authorizationSuccess](state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLoggedIn = true
  },
  [mutationTypes.authorizationFailure](state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },
};

const actions = {
  [actionTypes.authorization](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationTypes.authorizationStart);

      authApi.login(credentials)
        .then(response => {
          const user = response.data.user;
          context.commit(mutationTypes.authorizationSuccess, user)
          setItem(TOKEN_KEY, user.token);
          resolve(user);
        })
        .catch(err => {
          let errors = {};
          if (err.response) {
            errors = err.response.data.errors;
          } else {
            errors = { code: ["Ошибка соединения"] };
          }

          context.commit(mutationTypes.authorizationFailure, errors);
        })
    })



  }
};

export default {
  state,
  mutations,
  actions
}