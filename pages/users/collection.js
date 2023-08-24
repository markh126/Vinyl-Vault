/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getRecordsByUser } from '../../api/recordData';
import RecordCard from '../../components/recordCard';
import { useAuth } from '../../utils/context/authContext';

export default function Shop() {
  const { user } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState([]);

  const getAllRecords = () => {
    getRecordsByUser(user.id).then(setRecords);
  };

  useEffect(() => {
    getAllRecords(user.id);
  }, []);

  return (
    <>
      <Head>
        <title>My Collection</title>
      </Head>
      <Button
        className="new-record-btn"
        variant="dark"
        type="button"
        size="med"
        onClick={() => {
          router.push('/users/newRecord');
        }}
      >
        Add a New Record
      </Button>
      <div className="text-center my-4">
        <div id="collectionCards" className="d-flex flex-wrap">
          {records.map((record) => (
            <RecordCard key={record.id} recordObj={record} onUpdate={getAllRecords} />
          ))}
        </div>
      </div>
    </>
  );
}
