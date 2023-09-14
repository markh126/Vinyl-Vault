/* eslint-disable react/forbid-prop-types */
import { Accordion, Button, Image } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { deleteWishlistRecord } from '../api/wishlistData';
import { getAlbumTracks, getSpotifyToken } from '../api/spotifyData';

export default function AccordionRowWishlist({ wishlistRecord, onUpdate, keyNumber }) {
  const [tracks, setTracks] = useState([]);
  const { user } = useAuth();
  const returnRecord = () => {
    if (window.confirm(`Return ${wishlistRecord.record.name} to ${wishlistRecord.record.user.first_name}?`)) {
      deleteWishlistRecord(wishlistRecord.record.id, user.uid).then(() => onUpdate());
    }
  };

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
  };

  const getTracks = async () => {
    const album = wishlistRecord.record.spotify_id;
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
    if (wishlistRecord.record.spotify_id) {
      getTracks();
    }
  }, [wishlistRecord]);

  return (
    <Accordion.Item eventKey={keyNumber}>
      <Accordion.Header className="wishlistRecordContainer">
        <Image className="wish-img" src={wishlistRecord.record.record_image_url} />
        <div className="wish-head">{wishlistRecord.record.name} - {wishlistRecord.record.artist}</div>
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
        <div className="removeWishContainer">
          <Button className="removeWishBtn" variant="dark" onClick={returnRecord}>Remove from Wishlist</Button>
        </div>
      </Accordion.Body>
      {console.warn(wishlistRecord)}
    </Accordion.Item>
  );
}

AccordionRowWishlist.propTypes = {
  wishlistRecord: PropTypes.shape({
    user: PropTypes.object,
    record: PropTypes.object,
    id: PropTypes.number,
    album: PropTypes.string,
    spotify_id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  keyNumber: PropTypes.number.isRequired,
};
