/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getRecordsByUser } from '../../../api/recordData';
import RecordCard from '../../../components/recordCard';
import { getSingleUser } from '../../../api/userData';

export default function Shop() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const id = parseInt(router.query.id, 10);

  const getAllRecords = () => {
    getRecordsByUser(id).then(setRecords);
  };

  const getAUser = () => {
    getSingleUser(id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAllRecords(id);
    getAUser(id);
  }, []);

  return (
    <>
      <Head>
        <title>{userDetails.first_name}'s Collection</title>
      </Head>
      <div id="userCollectionPage" className="userCollection-page">
        <div className="userCollection-desc-text">
          <h3><em>{userDetails.first_name}'s Collection</em></h3>
          <div className="text-center my-4">
            <div id="collectionCards" className="d-flex flex-wrap">
              {records.map((record) => (
                <RecordCard key={record.id} recordObj={record} onUpdate={getAllRecords} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
