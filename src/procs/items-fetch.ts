export function getItemsWithFetch() {
  return fetch(`/items`).then((res) => {
    if (res.status !== 200) {
      return Promise.reject({ status: res.status, message: res.statusText });
    }
    return res.json();
  });
}

export function deleteWithFetch(item: string) {
  return fetch(`/items/${item}`, { method: 'delete' }).then((res) => {
    if (res.status !== 200) {
      return Promise.reject({ status: res.status, message: res.statusText });
    }
    return res.json();
  });
}
