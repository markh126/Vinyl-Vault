/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { useRouter } from 'next/router';
// import { useAuth } from '../utils/context/authContext';

function UserCard({ userObj }) {
//   const { user } = useAuth();
  const router = useRouter();
  const itemClick = () => {
    if (userObj.id) {
      router.push(`/users/${userObj.id}`);
    }
  };

  return (
    <Card
      className="product-card"
      style={{
        width: '300px', height: '250px', marginBottom: '250px', fontFamily: 'Ysabeau Office',
      }}
    >
      <Card.Img
        className="card-img"
        style={{
          height: '397px', width: '298px', border: '3px solid #000000', boxShadow: '6px 6px rgb(216, 208, 208)',
        }}
        src={userObj.profile_image_url}
        alt={userObj.username}
        onClick={itemClick}
      />
      <Card.Body className="product-content" onClick={itemClick} style={{ marginTop: '0px' }}>
        <Card.Title className="view-btn" style={{ fontFamily: 'Ysabeau Office', fontSize: 22 }}>
          {userObj.username}
        </Card.Title>
        <Card.Subtitle style={{ fontFamily: 'Ysabeau Office', fontSize: 18 }}>
          {userObj.bio}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    id: PropTypes.number,
    username: PropTypes.string,
    profile_image_url: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
};

export default UserCard;
