import React, { useState } from 'react';
import { getItemsWithAxios, deleteWithAxios } from './procs/items-axios';
import { getItemsWithFetch, deleteWithFetch } from './procs/items-fetch';
import { getItemsWithWretch, deleteWithWretch } from './procs/items-wretch';

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

  const onWretchGet = async () => {
    setItems(null);
    try {
      const items = await getItemsWithWretch();
      setItems(items);
    } catch (e) {
      console.error(e);
    }
  };

  const onWretchDelete = async () => {
    try {
      const item = items && items[0];
      if (item) {
        const items = await deleteWithWretch(item);
        setItems(items);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      axios
      <br />
      <button onClick={onAxiosGet}>get items</button>
      <button onClick={onAxiosDelete}>delete item</button>
      <br />
      <br />
      fetch
      <br />
      <button onClick={onFetchGet}>get items</button>
      <button onClick={onFetchDelete}>delete item</button>
      <br />
      <br />
      wretch
      <br />
      <button onClick={onWretchGet}>get items</button>
      <button onClick={onWretchDelete}>delete item</button>
      <br />
      <br />
      items: <strong>{JSON.stringify(items, null, 2)}</strong>
    </div>
  );
}
