export function getItemsWithFetch() {
  return fetch(`/items`)
    .then((res) => {
      console.log("res", res.status, res.statusText);
      return res.json();
    })
    .catch((err) => {
      console.log("ERR", err);
      return [];
    });
}
