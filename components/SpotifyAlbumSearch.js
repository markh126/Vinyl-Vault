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
      <Form onSubmit={handleSubmit} className="search-album">
        <Form.Control type="text" placeholder="Record Search.." name="albumName" value={formInput.albumName} onChange={handleChange} required />
        <Button className="search-btn" type="submit">Search</Button>
      </Form>
      <div className="text-center my-4">
        <div id="searchAlbums" className="d-flex flex-wrap">
          {search.map((album) => (
            <SpotifyCard key={album.id} recordObj={album} />
          ))}
        </div>
        {console.warn(search)}
      </div>
    </>
  );
}

export default Search;
