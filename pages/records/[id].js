import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { deleteRecord, getSingleRecord } from '../../api/recordData';
import { getAlbumTracks, getSpotifyToken } from '../../api/spotifyData';

export default function ViewRecord() {
  const [recordDetails, setRecordDetails] = useState({});
  const [tracks, setTracks] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const formatDuration = (durationMs) => {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = ((durationMs % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds}`;
  };

  const deleteThisRecord = () => {
    if (window.confirm(`Do you want to remove ${recordDetails.name} from your store?`)) {
      deleteRecord(id).then(() => router.push('/users/collection'));
    }
  };

  useEffect(() => {
    getSingleRecord(id).then(setRecordDetails);
  }, [id]);

  const getTracks = async () => {
    const album = recordDetails.spotify_id;
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
    if (recordDetails.spotify_id) {
      getTracks();
    }
  }, [recordDetails]);

  return (
    <>
      <Head>
        <title>{recordDetails.name}</title>
      </Head>
      <div className="d-flex flex-column">
        <Image
          className="record-image"
          src={recordDetails.record_image_url}
          alt={recordDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h2 className="post-details-title">{recordDetails.name}</h2>
        <h5 className="post-details-title">{recordDetails.artist}</h5>
        <p className="post-content">Release Date: {recordDetails.release_date} </p>
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
        <div>
          {user.id === recordDetails.user?.id ? (
            <>
              <Button
                className="edit-btn"
                variant="dark"
                type="button"
                size="sm"
                onClick={() => {
                  router.push(`/records/edit/${recordDetails.id}`);
                }}
              >
                Edit
              </Button><Button variant="danger" size="sm" className="delete-btn" onClick={deleteThisRecord}> Delete</Button>
            </>
          ) : ('')}
        </div>
      </div>
    </>
  );
}
