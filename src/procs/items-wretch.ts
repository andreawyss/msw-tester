import wretch from 'wretch';

export function getItemsWithWretch() {
  return wretch(`/items`)
    .get()
    .res((response) => response.json())
    .catch((error) => {
      throw new Error(
        `Request failed with status code ${error.status}: ${error.response.statusText}`
      );
    });
}

export function deleteWithWretch(item: string) {
  return wretch(`/items/${item}`)
    .delete()
    .res((response) => response.json())
    .catch((error) => {
      throw new Error(
        `Request failed with status code ${error.status}: ${error.response.statusText}`
      );
    });
}
