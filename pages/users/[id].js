import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../api/userData';

export default function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const router = useRouter();
  const id = parseInt(router.query.id, 10);

  const getAUser = () => {
    getSingleUser(id).then((data) => setUserDetails(data));
  };

  useEffect(() => {
    getAUser(id);
  }, [id]);

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="user-profile-page">
        <Image
          className="user-image"
          src={userDetails.profile_image_url}
          alt={userDetails.name}
          style={{
            width: '300px', borderRadius: '0px', border: '3px solid #014415', boxShadow: '6px 6px rgb(216, 208, 208)',
          }}
        />
      </div>
      <div className="profile-font" style={{ marginTop: '35px' }}>
        <h1 className="post-details-title">{userDetails.first_name} {userDetails.last_name}</h1>
        <h4 className="post-details-text"><em>{userDetails.username}</em> </h4>
        <h4 className="post-details-title">{userDetails.email}</h4>
        <h5 className="post-details-text">Bio: {userDetails.bio} </h5>
      </div>
    </>
  );
}
