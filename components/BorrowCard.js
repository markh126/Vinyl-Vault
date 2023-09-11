/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { useAuth } from '../utils/context/authContext';
import { deleteBorrowedRecord } from '../api/borrowedData';
import { getAlbumTracks, getSpotifyToken } from '../api/spotifyData';

function RecordCard({ recordObj, onUpdate }) {
  const [tracks, setTracks] = useState([]);
  const ref = useRef();
  const { user } = useAuth();

  const itemClick = () => {
    if (recordObj.id) {
      ref.current.toggle();
    }
  };

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
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

  const returnButton = () => deleteBorrowedRecord(recordObj.id, user.uid).then(() => onUpdate());

  return (
    <div>
      <Flippy
        flipOnClick={false}
        flipDirection="horizontal"
        ref={ref}
        style={{ width: '300px', height: '325px' }}
      >
        <FrontSide>
          <img className="record-img" src={recordObj.record_image_url} alt={recordObj.name} style={{ height: '250px' }} onClick={itemClick} />
          <p> {recordObj.artist} - {recordObj.name} <br />
            Release Date: {recordObj.release_date}
          </p>
          <div className="borrowing-btn">
            <ArrowRepeat variant="button" onClick={returnButton} className="borrow-btn" />
          </div>
        </FrontSide>
        <BackSide onClick={() => { ref.current.toggle(); }}>
          <div className="track-list">
            <h3>Tracks:</h3>
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
