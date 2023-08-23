import { clientCredentials } from '../utils/client';

const getGenres = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/genres`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export default getGenres;
