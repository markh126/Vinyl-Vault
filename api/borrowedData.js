import { clientCredentials } from '../utils/client';

const getBorrowedRecord = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/borrowed`, {
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

const createBorrowedRecord = (recordId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${recordId}/borrow_record`, {
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

const deleteBorrowedRecord = (recordId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${recordId}/return_record`, {
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
  getBorrowedRecord,
  createBorrowedRecord,
  deleteBorrowedRecord,
};
