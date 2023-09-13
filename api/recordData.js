import { clientCredentials } from '../utils/client';

const getRecords = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records`, {
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

const getSingleRecord = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getRecordsByUser = (userId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records?userId=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Sort the data by created date in descending order (most recent to least recent)
      data.sort((a, b) => new Date(a.createdDate) - new Date(b.createdDate));

      resolve(data);
    })
    .catch(reject);
});

const getRecordsByOtherUser = (userId, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records?userId=${userId}`, {
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

const createRecord = (record, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(record),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const editRecord = (record, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${record.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(record),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteRecord = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/records/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getRecords,
  getSingleRecord,
  getRecordsByUser,
  getRecordsByOtherUser,
  createRecord,
  editRecord,
  deleteRecord,
};
