const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '22697108-16f99a6bb7067689183444e58';
const PARAMETERS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

const fetchImg = (query, page) => {
  return fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&${PARAMETERS}`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`Немає зображення з ім'ям ${query}`));
  });
};

export default fetchImg;
