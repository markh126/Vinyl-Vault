/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createRecord } from '../api/recordData';

function SpotifyCard({ recordObj }) {
  const { user } = useAuth();

  const handleAddToCollection = async () => {
    const {
      name, artists, release_date, images,
    } = recordObj;

    const record = {
      name,
      artist: artists[0].name,
      releaseDate: release_date,
      recordImageUrl: images[0].url,
      spotifyId: recordObj.id,
      userId: user.id,
    };

    try {
      await createRecord(record, user.uid);

      alert('Record added to collection');
    } catch (error) {
      console.error('Error adding record to collection:', error);
    }
  };

  return (
    <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={recordObj.images[0].url} alt={recordObj.name} style={{ height: '250px' }} />
      <Card.Body className="product-content" style={{ marginTop: '0px' }}>
        <Card.Title className="view-btn" style={{ fontFamily: 'Crimson Text Bold', fontSize: 22 }}>
          {recordObj.name}
        </Card.Title>
        <Card.Subtitle style={{ fontFamily: 'Crimson Text Bold', fontSize: 18 }}>
          {recordObj.artists[0].name}<br />
          {recordObj.release_date}
        </Card.Subtitle>
      </Card.Body>
      <Button onClick={handleAddToCollection}>Add To Collection</Button>
    </Card>
  );
}

SpotifyCard.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.string,
    spotifyId: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.array,
    artists: PropTypes.array,
    release_date: PropTypes.string,
  }).isRequired,
};

export default SpotifyCard;