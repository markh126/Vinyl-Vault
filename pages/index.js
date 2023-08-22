/* eslint-disable react/no-unescaped-entities */
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Head from 'next/head';

function Home() {
  const router = useRouter();
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
            size="lg"
            className="edit-btn"
            onClick={() => {
              router.push('/profile');
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
