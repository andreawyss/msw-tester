import React, { useState } from "react";
import { getItemsWithAxios } from "./procs/items-axios";
import { getItemsWithFetch } from "./procs/items-fetch";

export function App() {
  const [items, setItems] = useState(null);

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

  return (
    <div>
      <button onClick={onAxiosClick}>get items with axios</button>
      <br />
      <button onClick={onFetchClick}>get items with fetch</button>
      <br />
      items: <strong>{JSON.stringify(items, null, 2)}</strong>
    </div>
  );
}
