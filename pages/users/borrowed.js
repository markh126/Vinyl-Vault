/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import BorrowCard from '../../components/BorrowCard';
import { getBorrowedRecord } from '../../api/borrowedData';

export default function BorrowedDisplay() {
  const [borrowed, setBorrowed] = useState([]);
  const { user } = useAuth();

  const getBorrowed = () => {
    getBorrowedRecord(user.uid)
      .then(setBorrowed);
  };

  useEffect(() => {
    getBorrowed();
  }, []);

  return (
    <>
      <Head>
        <title>Borrowed Records</title>
      </Head>
      <div id="userBorrowedPage" className="userBorrowed-page">
        <div className="userBorrowed-desc-text">
          <h3><em>Borrowed Records</em></h3>
          <div className="text-center my-4">
            <div id="borrowedCards" className="d-flex flex-wrap">
              {borrowed.map((borrowedRecord) => (
                <BorrowCard key={borrowedRecord.id} recordObj={borrowedRecord.record} onUpdate={getBorrowed} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
