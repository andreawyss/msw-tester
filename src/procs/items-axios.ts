import axios from "axios";

export function getItemsWithAxios() {
  return axios("/items")
    .then((res: any) => {
      console.log("res", res);
      return res.data;
    })
    .catch((err: any) => {
      console.log("ERR", err);
      return [];
    });
}

export function deleteWithAxios(item: string) {
  return axios(`/items/${item}`, { method: "delete" })
    .then((res) => {
      console.log("res", res);
      return res.data;
    })
    .catch((err) => {
      console.log("ERR", err);
      return [];
    });
}
