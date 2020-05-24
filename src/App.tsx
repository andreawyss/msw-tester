import React, { useState } from "react";
import { getItemsWithAxios, deleteWithAxios } from "./procs/items-axios";
import { getItemsWithFetch, deleteWithFetch } from "./procs/items-fetch";

export function App() {
  const [items, setItems] = useState<string[] | null>(null);

  const onAxiosClick = () => {
    setItems(null);
    getItemsWithAxios().then((items) => {
      setItems(items);
    });
  };

  const onFetchClick = () => {
    setItems(null);
    getItemsWithFetch().then((items) => {
      setItems(items);
    });
  };

  const onAxiosDelete = () => {
    const item = items && items[0];
    if (item) {
      deleteWithAxios(item).then((items) => {
        setItems(items);
      });
    }
  };

  const onFetchDelete = () => {
    const item = items && items[0];
    if (item) {
      deleteWithFetch(item).then((items) => {
        setItems(items);
      });
    }
  };

  return (
    <div>
      <button onClick={onAxiosClick}>get items with axios</button>
      <br />
      <button onClick={onFetchClick}>get items with fetch</button>
      <br />
      <button onClick={onAxiosDelete}>delete item with axios</button>
      <br />
      <button onClick={onFetchDelete}>delete item with fetch</button>
      <br />
      items: <strong>{JSON.stringify(items, null, 2)}</strong>
    </div>
  );
}
