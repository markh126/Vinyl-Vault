/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { getUsers } from '../../api/userData';
import UserCard from '../../components/UserCard';

export default function Users() {
//   const router = useRouter();
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    getUsers().then(setUsers);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="text-center my-4">
        <div id="userCards" className="d-flex flex-wrap">
          {users.map((user) => (
            <UserCard key={user.id} userObj={user} onUpdate={getAllUsers} />
          ))}
        </div>
      </div>
    </>
  );
}
