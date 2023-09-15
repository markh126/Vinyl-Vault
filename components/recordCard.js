/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import {
  Heart, HeartFill, ArrowRepeat, Trash,
} from 'react-bootstrap-icons';
import { createWishlistRecord, deleteWishlistRecord } from '../api/wishlistData';
import { useAuth } from '../utils/context/authContext';
import { createBorrowedRecord } from '../api/borrowedData';
import { getAlbumTracks, getSpotifyToken } from '../api/spotifyData';
import { deleteRecord } from '../api/recordData';

function RecordCard({ recordObj, onUpdate }) {
  const [tracks, setTracks] = useState([]);
  const ref = useRef();
  const { user } = useAuth();

  const deleteThisRecord = () => {
    if (window.confirm(`Are you sure you would like to delete ${recordObj.name}?`)) {
      deleteRecord(recordObj.id).then(() => onUpdate());
    }
  };

  const itemClick = () => {
    if (recordObj.id) {
      ref.current.toggle();
    }
  };

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0).padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const getTracks = async () => {
    const album = recordObj.spotify_id;
    const token = await getSpotifyToken();

    getAlbumTracks(token, album)
      .then((response) => {
        if (response) {
          setTracks(response);
        } else {
          alert('Error');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    if (recordObj.spotify_id) {
      getTracks();
    }
  }, [recordObj]);

  const wishlistButton = () => createWishlistRecord(recordObj.id, user.uid).then(() => onUpdate());
  const unwishlistButton = () => deleteWishlistRecord(recordObj.id, user.uid).then(() => onUpdate());
  const borrowButton = () => createBorrowedRecord(recordObj.id, user.uid).then(() => onUpdate());

  return (
    <div>
      <Flippy
        flipOnClick={false}
        flipDirection="horizontal"
        ref={ref}
        style={{ width: '300px', height: '350px' }}
      >
        <FrontSide>
          <img className="record-img" src={recordObj.record_image_url} alt={recordObj.name} style={{ height: '250px' }} onClick={itemClick} />
          <p> {recordObj.name} <br />
            Release Date: {recordObj.release_date}
          </p>
          <div className="wishlist-btn">
            {user.id !== recordObj.user.id ? (
              recordObj.wishlisted ? (
                <HeartFill variant="button" fill="red" onClick={unwishlistButton} className="unwish-btn">Remove from Wishlist</HeartFill>
              )
                : (
                  <Heart variant="button" onClick={wishlistButton} className="wish-btn">Add to Wishlist</Heart>
                )
            ) : ('')}
          </div>
          <div className="borrowing-btn">
            {user.id !== recordObj.user.id ? (
              recordObj.borrowed ? (
                <p />
              )
                : (
                  <ArrowRepeat variant="button" onClick={borrowButton} className="borrow-btn">Borrow</ArrowRepeat>
                )
            ) : ('')}
          </div>
          <div className="trash-btn">
            {user.id === recordObj.user.id ? (
              <Trash variant="button" className="profile-btn" style={{ marginLeft: 5 }} onClick={deleteThisRecord}>Delete</Trash>
            ) : ('')}
          </div>
        </FrontSide>
        <BackSide onClick={() => { ref.current.toggle(); }}>
          <h3><em>{recordObj.artist}</em></h3>
          <div className="track-list">
            <h4><em>Tracks:</em></h4>
            {Array.isArray(tracks.items) && tracks.items.length > 0 && (
            <ol>
              {tracks.items.map((track) => (
                <li key={track.id}>
                  {track.name} - {formatDuration(track.duration_ms)}
                </li>
              ))}
            </ol>
            )}
          </div>
        </BackSide>
      </Flippy>
    </div>
  );
}

RecordCard.propTypes = {
  recordObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    record_image_url: PropTypes.string,
    artist: PropTypes.string,
    release_date: PropTypes.string,
    spotify_id: PropTypes.string,
    user: PropTypes.object,
    wishlisted: PropTypes.bool,
    borrowed: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default RecordCard;
