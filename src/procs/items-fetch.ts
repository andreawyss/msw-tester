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

export function deleteWithFetch(item: string) {
  return fetch(`/items/${item}`, { method: "delete" })
    .then((res) => {
      console.log("res", res.status, res.statusText);
      return res.json();
    })
    .catch((err) => {
      console.log("ERR", err);
      return [];
    });
}
