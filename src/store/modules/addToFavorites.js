import addToFAvoriteApi from '@/api/addToFavorites'

export const mutationTypes = {
  addToFavoritesStart: '[addToFavorites] Add to favorites start',
  addToFavoritesSuccess: '[addToFavorites] Add to favorites Success',
  addToFavoritesFailure: '[addToFavorites] Add to favorites failure',
}

export const actionTypes = {
  addToFavorites: '[addToFavorites] Add to favorites',
}

const mutations = {
  [mutationTypes.addToFavoritesStart]() { },
  [mutationTypes.addToFavoritesSuccess]() { },
  [mutationTypes.addToFavoritesFailure]() { },
}

const actions = {
  [actionTypes.addToFavorites](context, { slug, isFavorited }) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoritesStart)

      const promise = isFavorited
        ? addToFAvoriteApi.removeFromFavorites(slug)
        : addToFAvoriteApi.addToFavorites(slug)

      promise
        .then(article => {
          context.commit(mutationTypes.addToFavoritesSuccess, article);
          resolve(article);
        })
        .catch(() => {
          context.commit(mutationTypes.addToFavoritesFailure);
        })
    });
  }
}

export default {
  actions,
  mutations,
}