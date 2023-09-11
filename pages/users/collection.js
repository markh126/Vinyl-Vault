/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getRecordsByUser } from '../../api/recordData';
import RecordCard from '../../components/recordCard';
import { useAuth } from '../../utils/context/authContext';
import DropdownFilter from '../../components/FilterDropdown';

export default function Shop() {
  const { user } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');

  const getAllRecords = () => {
    getRecordsByUser(user.id, user.uid).then(setRecords);
  };

  useEffect(() => {
    getAllRecords(user.id);
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
        <title>My Collection</title>
      </Head>
      <DropdownFilter onFilterChange={handleFilterChange} />
      <div id="userCollectionPage" className="userCollection-page">
        <div className="userCollection-desc-text">
          <h3><em>My Collection</em></h3>
          <Button
            className="new-record-btn"
            variant="dark"
            type="button"
            size="med"
            onClick={() => {
              router.push('/users/recordSearch');
            }}
          >
            Add a New Record
          </Button>
          <div className="text-center my-4">
            <div id="collectionCards" className="d-flex flex-wrap collection-cards">
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
