import { clientCredentials } from '../utils/client';

const getWishlistRecord = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/wishlist`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createWishlistRecord = (recordId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${recordId}/add_to_wishlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(recordId),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteWishlistRecord = (recordId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${recordId}/remove_from_wishlist`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getWishlistRecord,
  createWishlistRecord,
  deleteWishlistRecord,
};
