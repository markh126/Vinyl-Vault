import { spotifyToken } from '../utils/client';

const encodedCredentials = Buffer.from(`${spotifyToken.clientId}:${spotifyToken.clientSecret}`).toString('base64');

const getSpotifyToken = () => new Promise((resolve, reject) => {
  fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${encodedCredentials}`,
    },
    body: 'grant_type=client_credentials',
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data.access_token);
    })
    .catch(reject);
});

const spotifySearch = (token, albumTitle) => new Promise((resolve, reject) => {
  fetch(`https://api.spotify.com/v1/search?q=${albumTitle}&type=album`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

const getAlbumTracks = (token, id) => new Promise((resolve, reject) => {
  fetch(`https://api.spotify.com/v1/albums/${id}/tracks`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      reject(error);
    });
});

export {
  getSpotifyToken,
  spotifySearch,
  getAlbumTracks,
};
