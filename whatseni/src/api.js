const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

async function fetchAPI(url) {
  try {
    const result = await fetch(url)
    if (result) return result.json();
  } catch (e) {
    console.error(e);
  }
}
export const api = {
  fetchCats: keyword => {
    return fetchAPI(`${API_ENDPOINT}/api/cats/search?q=${keyword}`)
  },
  fetchCatId: id => {
    return fetchAPI(`${API_ENDPOINT}/api/cats/${id}`)
  },
  fetchCatRandom: () => {
    return fetchAPI(`${API_ENDPOINT}/api/cats/random50`)
  }
};

