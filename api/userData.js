import { clientCredentials } from '../utils/client';

const getUsers = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const users = Object.values(data).filter((user) => user.id !== id);
      resolve(users);
    })
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const editUser = (user, uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
    body: JSON.stringify(user),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteUser = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
  editUser,
  deleteUser,
};
