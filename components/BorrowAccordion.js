/* eslint-disable react/forbid-prop-types */
import { Accordion, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteBorrowedRecord } from '../api/borrowedData';
import { getAlbumTracks, getSpotifyToken } from '../api/spotifyData';

export default function AccordionRow({ borrowedRecord, onUpdate, keyNumber }) {
  const [tracks, setTracks] = useState([]);
  const { user } = useAuth();
  const returnRecord = () => {
    if (window.confirm(`Return ${borrowedRecord.record.name} to ${borrowedRecord.record.user.first_name}?`)) {
      deleteBorrowedRecord(borrowedRecord.record.id, user.uid).then(() => onUpdate());
    }
  };

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
  };

  const getTracks = async () => {
    const album = borrowedRecord.record.spotify_id;
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
    if (borrowedRecord.record.spotify_id) {
      getTracks();
    }
  }, [borrowedRecord]);

  return (
    <Accordion.Item style={{ fontFamily: 'Ysabeau Office' }} eventKey={keyNumber}>
      <Accordion.Header className="borrowedRecordContainer">
        <Image className="borrow-img" src={borrowedRecord.record.record_image_url} />
        <div className="borrow-head">{borrowedRecord.record.name} - {borrowedRecord.record.artist}</div>
      </Accordion.Header>
      <Accordion.Body>
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
        <div className="returnBtnContainer">
          <Button className="returnBtn" variant="dark" onClick={returnRecord}>Return</Button>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}

AccordionRow.propTypes = {
  borrowedRecord: PropTypes.shape({
    user: PropTypes.object,
    record: PropTypes.object,
    id: PropTypes.number,
    album: PropTypes.string,
    spotify_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  keyNumber: PropTypes.number.isRequired,
};
