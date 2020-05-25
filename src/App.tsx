import React, { useState } from "react";
import { getItemsWithAxios, deleteWithAxios } from "./procs/items-axios";
import { getItemsWithFetch, deleteWithFetch } from "./procs/items-fetch";

export function App() {
  const [items, setItems] = useState<string[] | null>(null);

  const onAxiosGet = async () => {
    setItems(null);
    const items = await getItemsWithAxios();
    setItems(items);
  };

  const onAxiosDelete = async () => {
    const item = items && items[0];
    if (item) {
      const items = await deleteWithAxios(item);
      setItems(items);
    }
  };

  const onFetchGet = async () => {
    setItems(null);
    const items = await getItemsWithFetch();
    setItems(items);
  };

  const onFetchDelete = async () => {
    const item = items && items[0];
    if (item) {
      const items = await deleteWithFetch(item);
      setItems(items);
    }
  };

  return (
    <div>
      <button onClick={onAxiosGet}>get items with axios</button>
      <br />
      <button onClick={onAxiosDelete}>delete item with axios</button>
      <br />
      <br />
      <button onClick={onFetchGet}>get items with fetch</button>
      <br />
      <button onClick={onFetchDelete}>delete item with fetch</button>
      <br />
      items: <strong>{JSON.stringify(items, null, 2)}</strong>
    </div>
  );
}
