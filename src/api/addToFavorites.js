import axios from '@/api/axios';

const getUrl = slug => `/articles/${slug}/favorite`;

const addToFavorites = slug => {
  const url = getUrl(slug);
  return axios
    .post(url)
    .then(response => response.date.article);
};

const removeFromFavorites = slug => {
  const url = getUrl(slug);
  return axios
    .delete(url)
    .then(response => response.date.article);
};

export default {
  addToFavorites,
  removeFromFavorites,
}