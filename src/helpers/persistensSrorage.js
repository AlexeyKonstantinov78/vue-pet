export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (error) {
    console.log('Ошибка получения данных из LocalStorage', error);
    return null;
  }
}

export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log('Ошибка записи данных в LocalStorage', error);
    return null;
  }
};