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
