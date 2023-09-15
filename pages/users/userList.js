/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
// import { useRouter } from 'next/router';
import { getUsers } from '../../api/userData';
import UserCard from '../../components/UserCard';
import { useAuth } from '../../utils/context/authContext';

export default function Users() {
//   const router = useRouter();
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  const getAllUsers = () => {
    getUsers(user.id).then(setUsers);
  };

  useEffect(() => {
    getAllUsers(user.id);
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <div className="users-desc-text">
        <div className="container d-flex align-items-center">
          <div className="text-center my-4 flex-row">
            <div id="userCards" className="d-flex flex-wrap user-cards justify-content-center">
              {users.map((userInfo) => (
                <UserCard key={userInfo.id} userObj={userInfo} onUpdate={getAllUsers} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
