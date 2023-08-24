/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { deleteBorrowedRecord } from '../api/borrowedData';

function WishlistCard({ recordObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const itemClick = () => {
    if (recordObj.id) {
      router.push(`/records/${recordObj.id}`);
    }
  };

  const returnButton = () => deleteBorrowedRecord(recordObj.id, user.uid).then(() => onUpdate());

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
      <div className="return-btn">
        <Button variant="outline-dark" onClick={returnButton} className="return">Return</Button>
      </div>
    </Card>
  );
}

WishlistCard.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    record_image_url: PropTypes.string,
    artist: PropTypes.string,
    track_list: PropTypes.string,
    genre: PropTypes.object,
    release_date: PropTypes.string,
    user: PropTypes.object,
    wishlisted: PropTypes.bool,
    borrowed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default WishlistCard;
