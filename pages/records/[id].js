import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Image } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
import { deleteRecord, getSingleRecord } from '../../api/recordData';

export default function ViewRecord() {
  const [recordDetails, setRecordDetails] = useState({});
  //   const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const deleteThisRecord = () => {
    if (window.confirm(`Do you want to remove ${recordDetails.name} from your store?`)) {
      deleteRecord(id).then(() => router.push('/users/collection'));
    }
  };

  useEffect(() => {
    getSingleRecord(id).then(setRecordDetails);
  }, [id]);

  return (
    <>
      <Head>
        <title>Record Details</title>
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
        <p className="post-details-text">Genre: {recordDetails.genre?.label} </p>
        <div>
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
          </Button>
          <Button variant="danger" size="sm" className="delete-btn" onClick={deleteThisRecord}> Delete</Button>
        </div>
      </div>
    </>
  );
}
