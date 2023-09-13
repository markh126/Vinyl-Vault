/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getRecordsByOtherUser } from '../../../api/recordData';
import RecordCard from '../../../components/recordCard';
import { getSingleUser } from '../../../api/userData';
import { useAuth } from '../../../utils/context/authContext';
import DropdownFilter from '../../../components/FilterDropdown';

export default function Shop() {
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const id = parseInt(router.query.id, 10);
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('');

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

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  const filteredRecords = () => {
    if (selectedFilter === 'alpha') {
      return [...records].sort((a, b) => a.name.localeCompare(b.name));
    } if (selectedFilter === 'date') {
      return [...records].sort((b, a) => new Date(a.release_date) - new Date(b.release_date));
    } if (selectedFilter === 'artist') {
      const groupedRecords = {};
      records.forEach((record) => {
        const { artist } = record;
        if (!groupedRecords[artist]) {
          groupedRecords[artist] = [];
        }
        groupedRecords[artist].push(record);
      });
      const sortedGroups = Object.keys(groupedRecords).sort();
      const sortedRecords = [];
      sortedGroups.forEach((artist) => {
        sortedRecords.push(...groupedRecords[artist]);
      });
      return sortedRecords;
    }

    return records;
  };

  return (
    <>
      <Head>
        <title>{userDetails.username}'s Collection</title>
      </Head>
      <DropdownFilter onFilterChange={handleFilterChange} />
      <div id="userCollectionPage" className="userCollection-page">
        <div className="userCollection-desc-text">
          <h3><em>{userDetails.username}'s Collection</em></h3>
          <div className="text-center my-4">
            <div id="userCollectionCards" className="d-flex flex-wrap user-collection-cards">
              {filteredRecords().map((record) => (
                <RecordCard key={record.id} recordObj={record} onUpdate={getAllRecords} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
