/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getRecordsByOtherUser } from '../../../api/recordData';
import RecordCard from '../../../components/recordCard';
import { getSingleUser } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';

export default function Shop() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const id = parseInt(router.query.id, 10);
  const { user } = useAuth();

  const getAllRecords = () => {
    getRecordsByOtherUser(id, user.uid).then(setRecords);
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
        <title>{userDetails.username}'s Collection</title>
      </Head>
      <div id="userCollectionPage" className="userCollection-page">
        <div className="userCollection-desc-text">
          <h3><em>{userDetails.username}'s Collection</em></h3>
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
