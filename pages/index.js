/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Form } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { searchRecords } from '../api/recordData';
import RecordCard from '../components/recordCard';
import { useAuth } from '../utils/context/authContext';
import DropdownFilter from '../components/FilterDropdown';

export default function Shop() {
  const { user } = useAuth();
  const router = useRouter();
  const [records, setRecords] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const getAllRecords = () => {
    searchRecords(user.id, searchQuery, user.uid)
      .then((Data) => {
        setRecords(Data);
      });
  };

  useEffect(() => {
    getAllRecords();
  }, [searchQuery]);

  const handleFilterChange = (filterValue) => {
    setSelectedFilter(filterValue);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredRecords = () => {
    if (selectedFilter === 'alpha') {
      return [...records].sort((a, b) => a.name.replace(/^"(.*)"$/, '$1').localeCompare(b.name));
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
      <h1 className="text-center" style={{ marginTop: '-100px', marginBottom: '-50px' }}>
        <img src="/5.png" width="400px" height="400px" alt="icon" className="nav-logo" />
      </h1>
      <div className="text-center" style={{ marginBottom: '10px', fontFamily: 'Ysabeau Office' }}>
        <DropdownFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="d-flex justify-content-center" style={{ marginBottom: '10px' }}>
        <Form>
          <Form.Control
            className="text-center"
            style={{ fontFamily: 'Ysabeau Office' }}
            type="text"
            placeholder="Search your records"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </Form>
      </div>
      <div id="userCollectionPage" className="userCollection-page">
        <div className="userCollection-desc-text">
          <div className="container text-center">
            <Button
              className="new-record-btn"
              style={{ fontFamily: 'Ysabeau Office' }}
              variant="dark"
              type="button"
              size="med"
              onClick={() => {
                router.push('/users/recordSearch');
              }}
            >
              Add a New Record
            </Button>
          </div>
          <div className="container d-flex align-items-center">
            <div className="text-center my-4 flex-row">
              <div id="collectionCards" className="d-flex flex-wrap collection-cards justify-content-center">
                {filteredRecords().map((record) => (
                  <RecordCard key={record.id} recordObj={record} onUpdate={getAllRecords} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
