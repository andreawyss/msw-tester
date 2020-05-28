import axios from 'axios';

export function getItemsWithAxios() {
  return axios('/items').then((res) => {
    return res.data;
  });
}

export function deleteWithAxios(item: string) {
  return axios(`/items/${item}`, { method: 'delete' }).then((res) => {
    return res.data;
  });
}
