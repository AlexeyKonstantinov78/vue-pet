import authApi from '@/api/auth';
import { TOKEN_KEY } from '@/helpers/constants';
import { setItem } from '@/helpers/persistensSrorage';

const state = {
  isSubmiting: false,
  isLoading: false,
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
  loginFailure: '[auth] loginFailure',

  getCurrentUserStart: '[auth] getCurrentUserStart',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailure: '[auth] getCurrentUserFailure',

  updateCurrentUserStart: '[auth] updateCurrentUserStart',
  updateCurrentUserSuccess: '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailure: '[auth] updateCurrentUserFailure',

  logout: '[auth] logout'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout',
}

export const gettersTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous',
}

const getters = {
  [gettersTypes.currentUser]: state => (state.currentUser),
  [gettersTypes.isLoggedIn]: state => (Boolean(state.isLoggedIn)),
  [gettersTypes.isAnonymous]: state => (state.isLoggedIn === false)
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
  [mutationTypes.getCurrentUserStart](state) {
    state.isLoading = true
  },
  [mutationTypes.getCurrentUserSuccess](state, payload) {
    state.isLoggedIn = true
    state.currentUser = payload
    state.isLoading = false
  },
  [mutationTypes.getCurrentUserFailure](state) {
    state.isLoading = false
    state.isLoggedIn = false
    state.currentUser = null
  },
  [mutationTypes.updateCurrentUserStart]() { },
  [mutationTypes.updateCurrentUserSuccess](state, payload) {
    state.currentUser = payload;
  },
  [mutationTypes.updateCurrentUserFailure]() { },
  [mutationTypes.logout](state) {
    state.currentUser = null;
    state.isLoggedIn = false;
  }
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
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getCurrentUserStart);

      authApi.getCurrentUser()
        .then(response => {
          context.commit(mutationTypes.getCurrentUserSuccess, response.data.user)
          resolve(response.data.user)
        })
        .catch(() => {
          context.commit(mutationTypes.getCurrentUserFailure);
        })
    })
  },
  [actionTypes.updateCurrentUser](context, { currentUserInput }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateCurrentUserStart);
      console.log('currentUserInput: ', currentUserInput);
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(mutationTypes.updateCurrentUserSuccess, user)
          resolve(user)
        })
        .catch((result) => {
          context.commit(mutationTypes.updateCurrentUserFailure, result.response.data.errors);
        })
    })
  },
  [actionTypes.logout](context) {
    return new Promise((resolve) => {
      setItem(TOKEN_KEY, '');
      context.commit(mutationTypes.logout);
      resolve();
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}