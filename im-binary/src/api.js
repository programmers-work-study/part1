const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const request = async (url) => {
  const response = await fetch(url);
  return await response.json();
};

const api = {
  fetchCats: (keyword) => {
    return request(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
  },

  fetchCatDetail: (id) => {
    return request(`${API_ENDPOINT}/api/cats/${id}`);
  },

  fetchRandomCats: () => {
    return request(`${API_ENDPOINT}/api/cats/random50`);
  },
};
