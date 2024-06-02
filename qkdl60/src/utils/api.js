const API_END_POINT = "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

export const api = {
  fetchCats: (keyword, page = 1) => {
    return fetch(`${API_END_POINT}/api/cats/search?q=${keyword}&page=${page}`).then((res) => res.json());
  },
  fetchRandom50: () => {
    return fetch(`${API_END_POINT}/api/cats/random50`)
      .then((res) => {
        if (!res.ok) throw new Error("not work ");
        return res.json();
      })
      .catch((error) => {
        window.alert("네트워크 연결에 실패했습니다\n 다시 시도해주세요😿😾");
      });
  },
  fetchCat: (id) => {
    return fetch(`${API_END_POINT}/api/cats/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("not work ");
        return res.json();
      })
      .catch((error) => {
        window.alert("네트워크 연결에 실패했습니다.\n 다시 시도해주세요😿😾");
      });
  },
};
