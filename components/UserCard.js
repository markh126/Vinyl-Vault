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
    <Card className="product-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={userObj.profile_image_url} alt={userObj.username} onClick={itemClick} style={{ height: '250px' }} />
      <Card.Body className="product-content" onClick={itemClick} style={{ marginTop: '0px' }}>
        <Card.Title className="view-btn" style={{ fontFamily: 'Crimson Text Bold', fontSize: 22 }}>
          {userObj.username}
        </Card.Title>
        <Card.Subtitle style={{ fontFamily: 'Crimson Text Bold', fontSize: 18 }}>
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
