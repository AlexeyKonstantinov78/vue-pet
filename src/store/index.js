
import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'
import article from '@/store/modules/article'
import articleCreate from '@/store/modules/createArticle';
import editArticle from '@/store/modules/editArticle';

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    popularTags,
    article,
    articleCreate,
    editArticle,
  }
})
