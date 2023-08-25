/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createWishlistRecord, deleteWishlistRecord } from '../api/wishlistData';
import { useAuth } from '../utils/context/authContext';
import { createBorrowedRecord } from '../api/borrowedData';

function RecordCard({ recordObj, onUpdate }) {
  const { user } = useAuth();
  const router = useRouter();
  const itemClick = () => {
    if (recordObj.id) {
      router.push(`/records/${recordObj.id}`);
    }
  };

  const wishlistButton = () => createWishlistRecord(recordObj.id, user.uid).then(() => onUpdate());
  const unwishlistButton = () => deleteWishlistRecord(recordObj.id, user.uid).then(() => onUpdate());
  const borrowButton = () => createBorrowedRecord(recordObj.id, user.uid).then(() => onUpdate());

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
      <div className="wishlist-btn">
        {user.id !== recordObj.user.id ? (
          recordObj.wishlisted ? (
            <Button variant="outline-dark" onClick={unwishlistButton} className="unwish-btn">Remove from Wishlist</Button>
          )
            : (
              <Button variant="outline-dark" onClick={wishlistButton} className="wish-btn">Add to Wishlist</Button>
            )
        ) : ('')}
      </div>
      <div className="borrowing-btn">
        {user.id !== recordObj.user.id ? (
          recordObj.borrowed ? (
            <p>This record is borrowed out.</p>
          )
            : (
              <Button variant="outline-dark" onClick={borrowButton} className="borrow-btn">Borrow</Button>
            )
        ) : ('')}
      </div>
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
    wishlisted: PropTypes.bool,
    borrowed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecordCard;
