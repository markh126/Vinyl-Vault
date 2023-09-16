import { Button, Form } from 'react-bootstrap';
import { useState } from 'react';
import Head from 'next/head';
import { getSpotifyToken, spotifySearch } from '../api/spotifyData';
import SpotifyCard from './SpotifySearchCard';

function Search() {
  const [formInput, setFormInput] = useState({ albumName: '' });
  const [search, setSearch] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const album = formInput.albumName;
    const token = await getSpotifyToken();
    spotifySearch(token, album).then((response) => {
      if (response && response.albums && response.albums.items.length > 0) {
        setSearch(response.albums.items);
      } else {
        alert('No Records Found');
      }
    });
  };

  return (
    <>
      <Head>
        <title>Album Search</title>
      </Head>
      <h1 className="text-center" style={{ marginTop: '-100px', marginBottom: '-50px' }}>
        <img src="/5.png" width="400px" height="400px" alt="icon" className="nav-logo" />
      </h1>
      <Form onSubmit={handleSubmit} className="search-album">
        <div className="d-flex justify-content-center" style={{ marginBottom: '10px' }}>
          <Form.Control className="text-center" type="text" placeholder="Record Search.." name="albumName" value={formInput.albumName} onChange={handleChange} required />
        </div><br />
        <div className="d-flex justify-content-center">
          <Button variant="outline-dark" className="search-btn" type="submit">Search</Button>
        </div>
      </Form>
      <div className="text-center my-4">
        <div id="searchAlbums" className="d-flex flex-wrap">
          {search.map((album) => (
            <SpotifyCard key={album.id} recordObj={album} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Search;
