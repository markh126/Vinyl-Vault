/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
// import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
// import { useAuth } from '../utils/context/authContext';

function RecordCard({ recordObj }) {
//   const { user } = useAuth();
  const router = useRouter();
  const itemClick = () => {
    if (recordObj.id) {
      router.push(`/records/${recordObj.id}`);
    }
  };

  return (
    <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={recordObj.record_image_url} alt={recordObj.name} onClick={itemClick} style={{ height: '250px' }} />
      <Card.Body className="product-content" onClick={itemClick} style={{ marginTop: '0px' }}>
        <Card.Title className="view-btn" style={{ fontFamily: 'Crimson Text Bold', fontSize: 22 }}>
          {recordObj.name}
        </Card.Title>
        <Card.Subtitle style={{ fontFamily: 'Crimson Text Bold', fontSize: 18 }}>
          {recordObj.artist}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

RecordCard.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    record_image_url: PropTypes.string,
    artist: PropTypes.string,
    track_list: PropTypes.string,
    genre: PropTypes.object,
    release_date: PropTypes.string,
    user: PropTypes.object,
  }).isRequired,
};

export default RecordCard;
