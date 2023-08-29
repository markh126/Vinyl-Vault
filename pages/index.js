/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';
import { useEffect } from 'react';
import { getSpotifyToken } from '../api/spotifyData';

function Home() {
  const router = useRouter();

  useEffect(() => {
    getSpotifyToken();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <div id="homePage" className="home-page">
        <div className="homepage-desc-text">
          <h3><em>Welcome to Vinyl Vault</em></h3>
          <h5>View your collection!</h5>
          <Button
            variant="dark"
            type="button"
            size="med"
            className="collection-btn"
            onClick={() => {
              router.push('/users/collection');
            }}
          >
            Let's Go!
          </Button>
        </div>
      </div>
    </>
  );
}

export default Home;
