/* eslint-disable camelcase */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createRecord, getRecordsByUser } from '../api/recordData';

function SpotifyCard({ recordObj }) {
  const [userRecords, setUserRecords] = useState([]);
  const { user } = useAuth();

  const getAllRecords = async () => {
    try {
      const records = await getRecordsByUser(user.id, user.uid);
      setUserRecords(records);
    } catch (error) {
      console.error('Error fetching user records:', error);
    }
  };

  useEffect(() => {
    getAllRecords();
  }, [user, userRecords]);

  const handleAddToCollection = async () => {
    const {
      name, artists, release_date, images, id,
    } = recordObj;

    const record = {
      name,
      artist: artists[0].name,
      releaseDate: release_date,
      recordImageUrl: images[0].url,
      spotifyId: id,
      userId: user.id,
    };

    try {
      // Check if any record in userRecords has the same spotifyId
      const isRecordInCollection = userRecords.some((userRecord) => userRecord.spotify_id === record.spotifyId);

      if (isRecordInCollection) {
        alert('Already in collection');
      } else {
        await createRecord(record, user.uid);
        alert('Record added to collection');
      }
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
