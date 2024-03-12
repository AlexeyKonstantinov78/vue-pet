import { TOKEN_KEY } from '@/helpers/constants';
import { getItem } from '@/helpers/persistensSrorage';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.realworld.io/api';
//axios.defaults.baseURL = 'http://192.168.1.139:3000/api';
//axios.defaults.baseURL = 'http://localhost:3000/api';
axios.interceptors.request.use(config => {
  const token = getItem(TOKEN_KEY);

  const authorizationToken = token ? `Token ${token}` : '';
  console.log('config: ', config);
  config.headers.setAuthorization(authorizationToken);
  return config;
})

export default axios;