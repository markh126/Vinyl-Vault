/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/context/authContext';
import { getRecordsByUser } from '../api/recordData';
import RecordCard from '../components/recordCard';

export default function Shop() {
  const { user } = useAuth();
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
        <title>Collection</title>
      </Head>
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
