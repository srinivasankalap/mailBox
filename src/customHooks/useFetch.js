const useFetch = (url, m, obj) => {
  switch (m) {
    case "":
      return fetch(url);
    case "DELETE":
      return fetch(url, {
        method: m,
      });
    default:
      return fetch(url, {
        method: m,
        body: JSON.stringify(obj),

        headers: {
          "Content-Type": "application/json",
        },
      });
  }
};

export default useFetch;
